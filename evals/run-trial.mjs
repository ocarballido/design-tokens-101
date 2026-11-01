// Lanza un intento de una tarea de evals/tasks.json con Claude Code y guarda lo necesario para
// puntuarlo (fase 7 de la guía de ds4agents, D79; protocolo en evals/evals.md).
//   1. Copia: `git archive` del commit base, sin evals/, en un repositorio nuevo con un solo commit, para
//      que el agente no vea las tareas, sus criterios ni el historial; node_modules clonado con `cp -c`
//      (Turbopack no acepta un enlace). Una carpeta nueva por intento, para no heredar memoria.
//   2. Intento: `claude -p` con la tarea y el sufijo común, con las herramientas de ALLOWED. Si una tarea
//      que no es trampa acaba sin cambios (el agente se ha parado a preguntar), se reanuda una vez con la
//      respuesta fija de tasks.json.
//   3. Puntuación: check:ui, check:tokens, build y check:content, y review-ui en una sesión aparte.
// Resultado: evals/results/<ID>-t<n>/ (resumen y diff, en git) y evals/runs/<ID>-t<n>/ (transcripciones,
// fuera de git). Uso: node evals/run-trial.mjs <ID> <n>  (EVALS_WORK: carpeta de las copias)

import { execFileSync, execSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'evals/tasks.json'), 'utf8'));
const [id, n] = process.argv.slice(2);
const task = config.tasks.find((t) => t.id === id);
if (!task || !/^\d+$/.test(n ?? '')) throw new Error('Uso: node evals/run-trial.mjs <ID> <n>');
if (task.pending) throw new Error(`${id} está pendiente: ${task.pending}`);

const name = `${id}-t${n}`;
const copy = path.join(process.env.EVALS_WORK ?? path.join(os.tmpdir(), 't101-evals'), `${name}-${Date.now()}`);
const runs = path.join(ROOT, 'evals/runs', name);
const results = path.join(ROOT, 'evals/results', name);
for (const dir of [runs, results]) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

const FIGMA = ['whoami', 'create_session', 'get_design_context', 'get_screenshot', 'get_metadata', 'get_variable_defs',
  'get_code_connect_map', 'get_context_for_code_connect', 'search_design_system', 'get_libraries', 'get_figma_skill'];
const ALLOWED = ['Read', 'Glob', 'Grep', 'Edit', 'Write', 'Skill', 'ToolSearch', 'TodoWrite', 'Agent',
  'Bash(npm run:*)', 'Bash(npm test:*)', 'Bash(ls:*)', 'Bash(mkdir:*)',
  'Bash(git status:*)', 'Bash(git diff:*)', 'Bash(git log:*)', 'Bash(git mv:*)', 'Bash(git rm:*)',
  'ListMcpResourcesTool', 'ReadMcpResourceTool', ...FIGMA.map((t) => `mcp__claude_ai_Figma__${t}`)];
const REVIEW_ALLOWED = ['Read', 'Glob', 'Grep', 'Skill', 'ToolSearch', 'Bash(npm run:*)', 'Bash(git status:*)', 'Bash(git diff:*)'];
const flags = (allowed, budget) => ['--output-format', 'stream-json', '--verbose', '--model', config.model,
  '--max-budget-usd', String(budget), '--permission-mode', 'acceptEdits',
  '--disallowedTools', 'WebFetch', 'WebSearch', '--allowedTools', ...allowed];

const sh = (cmd, args, opts = {}) => spawnSync(cmd, args, { cwd: copy, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, ...opts });
const claude = (args, file) => {
  const fd = fs.openSync(path.join(runs, file), 'w');
  const r = spawnSync('claude', args, { cwd: copy, stdio: ['ignore', fd, 'pipe'], encoding: 'utf8', timeout: 60 * 60 * 1000 });
  fs.closeSync(fd);
  return { status: r.status, events: readEvents(file) };
};
const readEvents = (file) =>
  fs.readFileSync(path.join(runs, file), 'utf8').split('\n').filter(Boolean).flatMap((l) => {
    try { return [JSON.parse(l)]; } catch { return []; }
  });

// 1. Copia limpia.
fs.mkdirSync(copy, { recursive: true });
execSync(`git -C "${ROOT}" archive ${config.base} | tar -x -C "${copy}"`);
fs.rmSync(path.join(copy, 'evals'), { recursive: true, force: true });
const [setup, target] = (task.setup ?? '').split(':');
if (setup === 'empty-lesson') {
  const file = path.join(copy, target);
  fs.writeFileSync(file, /^---\n[\s\S]*?\n---\n/.exec(fs.readFileSync(file, 'utf8'))[0]);
}
execFileSync('git', ['init', '-q'], { cwd: copy });
execFileSync('git', ['add', '-A'], { cwd: copy });
execFileSync('git', ['-c', 'user.name=evals', '-c', 'user.email=evals@localhost', 'commit', '-q', '-m', 'base'], { cwd: copy });
execFileSync('cp', ['-c', '-R', path.join(ROOT, 'node_modules'), path.join(copy, 'node_modules')]);

// 2. Intento y, si se para sin cambios, una reanudación.
const parts = [claude(['-p', task.prompt + config.suffix, ...flags(ALLOWED, config.budget)], 'trial-1.jsonl')];
const sessionId = parts[0].events.find((e) => e.type === 'system')?.session_id;
const changed = () => sh('git', ['status', '--porcelain']).stdout.trim() !== '';
const stopped = !changed();
if (stopped && task.type !== 'trampa' && sessionId) {
  parts.push(claude(['-p', config.resume, '--resume', sessionId, ...flags(ALLOWED, config.budget)], 'trial-2.jsonl'));
}

// 3. Puntuación.
sh('git', ['add', '-A']);
fs.writeFileSync(path.join(results, 'diff.patch'), sh('git', ['diff', '--cached']).stdout);
const stat = sh('git', ['diff', '--cached', '--stat']).stdout.trim() || 'Sin cambios';
const checkUi = sh('node', [path.join(ROOT, 'tools/check-ui.mjs'), copy, 'HEAD']).stdout.trim();
const npm = (script) => {
  const r = sh('npm', ['run', script], { timeout: 15 * 60 * 1000 });
  const out = (r.stdout + r.stderr).trim().split('\n');
  return { ok: r.status === 0, tail: out.slice(-12).join('\n') };
};
// Sin cambios (una trampa bien resuelta, o un intento que no hizo nada) no hay nada que compilar ni revisar.
const hasChanges = stat !== 'Sin cambios';
const skipped = { ok: true, tail: '', skipped: true };
const tokens = hasChanges ? npm('check:tokens') : skipped;
const build = hasChanges ? npm('build') : skipped;
const content = !hasChanges ? skipped : build.ok ? npm('check:content') : { ok: false, tail: 'Sin comprobar: el build falla' };
const review = hasChanges
  ? claude(['-p', 'Usa la skill review-ui para revisar los cambios sin confirmar de este repositorio (`git diff --cached`, con los archivos nuevos). Devuelve solo su resultado.',
    ...flags(REVIEW_ALLOWED, config.reviewBudget)], 'review-ui.jsonl')
  : { events: [{ type: 'result', result: 'Sin cambios: no se ejecuta.' }] };

// Resumen: lo que leyó y usó el agente, comprobaciones y último mensaje.
const relative = (p) => String(p).replaceAll(copy + '/', '').replaceAll(copy, '.');
const calls = parts.flatMap((p, i) =>
  p.events.filter((e) => e.type === 'assistant').flatMap((e) =>
    e.message.content.filter((c) => c.type === 'tool_use').map((c) => {
      const input = c.input ?? {};
      const where = input.path ? ` en ${input.path}` : '';
      const detail = input.file_path ?? (input.pattern ? input.pattern + where : null) ?? input.command ?? input.skill ?? input.query
        ?? input.nodeId ?? input.prompt ?? input.description ?? '';
      return { part: i + 1, sub: Boolean(e.parent_tool_use_id), name: c.name, detail: relative(detail).split('\n')[0].slice(0, 160) };
    })));
const read = new Set(calls.filter((c) => c.name === 'Read').map((c) => c.detail));
const skills = calls.filter((c) => c.name === 'Skill').map((c) => c.detail);
const figma = calls.filter((c) => c.name.startsWith('mcp__claude_ai_Figma__')).map((c) => c.name.replace('mcp__claude_ai_Figma__', ''));
const resultOf = (p) => p.events.findLast((e) => e.type === 'result') ?? {};
const cost = (list) => list.reduce((sum, p) => sum + (resultOf(p).total_cost_usd ?? 0), 0);
const yesNo = (v) => (v ? 'sí' : 'no');
const listOrNone = (items) => (items.length ? items.join(', ') : 'ninguno');

const summary = `# ${id}, intento ${n}

- Tarea: ${id} (${task.type}) · base ${config.base} · ${sh('claude', ['--version']).stdout.trim()} · ${config.model} · ${new Date().toISOString().slice(0, 10)}
- Coste: ${cost(parts).toFixed(2)} USD el intento y ${cost([review]).toFixed(2)} USD review-ui · turnos: ${parts.map((p) => resultOf(p).num_turns ?? '?').join(' + ')} · duración: ${parts.map((p) => Math.round((resultOf(p).duration_ms ?? 0) / 1000)).join(' + ')} s
- Se paró sin cambios: ${yesNo(stopped)}${parts.length > 1 ? ' (reanudado con la respuesta fija)' : ''}${parts.some((p) => resultOf(p).is_error) ? ' · terminó con error: ' + parts.map((p) => resultOf(p).subtype).join(', ') : ''}

## Lo que leyó y usó
- Skills: ${listOrNone(skills)}
- \`docs/inventory.md\`: ${yesNo(read.has('docs/inventory.md'))} · \`AGENTS.md\` y \`CLAUDE.md\`: en el contexto inicial
- Patrones: ${listOrNone([...read].filter((f) => f.startsWith('docs/patterns/')))}
- Componentes: ${listOrNone([...read].filter((f) => f.startsWith('docs/components/')))}
- Reglas y fundamentos: ${listOrNone([...read].filter((f) => /^docs\/(rules|foundations|content)\//.test(f)))}
- Figma: ${listOrNone(figma)}

## Archivos cambiados

\`\`\`
${stat}
\`\`\`

## Comprobaciones
${hasChanges ? '' : '- Sin cambios: no se ejecutan check:tokens, build, check:content ni review-ui.\n'}- check:tokens: ${tokens.skipped ? 'no se ejecuta' : tokens.ok ? 'sin errores' : 'con errores'}
- build: ${build.skipped ? 'no se ejecuta' : build.ok ? 'sin errores' : 'falla'}
- check:content: ${content.skipped ? 'no se ejecuta' : content.ok ? 'sin errores' : 'con errores'}
${[tokens, build, content].some((r) => !r.ok) ? '\n```\n' + [tokens, build, content].filter((r) => !r.ok).map((r) => r.tail).join('\n---\n') + '\n```\n' : ''}
\`\`\`
${checkUi.replace(copy, '<copia>')}
\`\`\`

## review-ui

${resultOf(review).result ?? 'Sin resultado'}

## Mensajes finales del agente
${parts.map((p, i) => `\n### Parte ${i + 1}\n\n${resultOf(p).result ?? 'Sin resultado'}`).join('\n')}

## Llamadas a herramientas

${calls.map((c, i) => `${i + 1}. ${c.part > 1 ? '[parte 2] ' : ''}${c.sub ? '[subagente] ' : ''}${c.name} ${c.detail}`).join('\n')}
`;
fs.writeFileSync(path.join(results, 'summary.md'), summary);
console.log(`${name}: ${cost(parts).toFixed(2)} USD · paró: ${yesNo(stopped)} · build: ${build.skipped ? 'no se ejecuta' : yesNo(build.ok)} · ${path.relative(ROOT, results)}/summary.md`);
