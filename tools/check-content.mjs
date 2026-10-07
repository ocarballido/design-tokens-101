// Comprueba el HTML prerenderizado por `next build` (paso 4 de docs/estado.md):
//   1. Cada enlace "#ancla" de una lección apunta a un id que existe en la página.
//      El fragmento se compara descodificado, como hace el navegador
//      (https://html.spec.whatwg.org/multipage/browsing-the-web.html#find-a-potential-indicated-element).
//   2. El sidebar sigue el orden de los prefijos NN- de content/es y no muestra los prefijos.
//   3. Los enlaces internos de las lecciones llevan a una página generada.
//   4. Grupos del sidebar (C17): uno por separador "---Texto---" de content/{locale}/meta.json,
//      con role="group" y aria-labelledby a su etiqueta.
//   5. Números de sección (C19, V40): cada cabecera muestra el prefijo de su carpeta (01- → 1),
//      salvo las de referencia (prefijo de 90 o más), que van sin número.
//   6. CSS generado (V46): ninguna clase con valor arbitrario entre corchetes fuera de las
//      excepciones de V43 (tools/arbitrary-allowed.mjs). check:tokens lo mira en src/; aquí se mira
//      lo que se publica, venga de donde venga (V44).
// Solo español y sin prefijo de idioma en la URL (P24, V45): las páginas son /{seccion}/{leccion}.
// Uso: npm run build && npm run check:content

import fs from 'node:fs';
import path from 'node:path';
import { ARBITRARY_ALLOWED } from './arbitrary-allowed.mjs';

const ROOT = process.cwd();
const HTML_DIR = path.join(ROOT, '.next/server/app');
const CONTENT_DIR = path.join(ROOT, 'content/es');
const LOCALE = 'es';
const STATIC_DIR = path.join(ROOT, '.next/static');

if (!fs.existsSync(HTML_DIR)) {
  console.error('No hay build. Ejecuta antes `npm run build`.');
  process.exit(1);
}

const errors = [];
const decodeEntities = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

// Orden esperado: carpetas y archivos ordenados por su prefijo de dos cifras, sin el prefijo.
const byPrefix = (names) =>
  names.filter((n) => /^\d{2}-/.test(n)).sort((a, b) => Number(a.slice(0, 2)) - Number(b.slice(0, 2)));
const expected = byPrefix(fs.readdirSync(CONTENT_DIR)).flatMap((section) =>
  byPrefix(fs.readdirSync(path.join(CONTENT_DIR, section)).filter((f) => f.endsWith('.mdx'))).map(
    (file) => `/${section.slice(3)}/${file.slice(3, -'.mdx'.length)}`,
  ),
);

// Separadores de meta.json raíz.
const groupLabels = () => {
  const file = path.join(ROOT, 'content', LOCALE, 'meta.json');
  return JSON.parse(fs.readFileSync(file, 'utf8')).pages.map((p) => /^---(.+)---$/.exec(p)?.[1].trim()).filter(Boolean);
};

// C19, V40: número de cada sección en el orden de meta.json, sacado del prefijo de su carpeta
// ("-" = sin número: prefijo de 90 o más, secciones de referencia).
const sectionNumbers = () => {
  const file = path.join(ROOT, 'content', LOCALE, 'meta.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'))
    .pages.filter((p) => !/^---(.+)---$/.test(p))
    .map((p) => (Number(p.slice(0, 2)) >= 90 ? '-' : String(Number(p.slice(0, 2)))));
};

let anchorCount = 0;
let accentedCount = 0;

{
  const pages = new Set(expected);

  for (const href of expected) {
    const file = path.join(HTML_DIR, `${href.slice(1)}.html`);
    const page = href;
    if (!fs.existsSync(file)) {
      errors.push(`${page}: no se generó la página`);
      continue;
    }
    const html = fs.readFileSync(file, 'utf8');

    // 1. Anclas
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => decodeEntities(m[1])));
    for (const [, raw] of html.matchAll(/href="#([^"]+)"/g)) {
      const fragment = decodeURIComponent(decodeEntities(raw));
      anchorCount++;
      if (/[^\x00-\x7F]/.test(fragment)) accentedCount++;
      if (!ids.has(fragment)) errors.push(`${page}: el enlace #${fragment} no tiene destino`);
    }

    // 2. Sidebar
    const nav = /<nav[^>]*data-component="Sidebar"[^>]*>([\s\S]*?)<\/nav>/.exec(html);
    if (!nav) {
      errors.push(`${page}: no hay sidebar`);
    } else {
      const order = [...nav[1].matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
      if (order.join() !== expected.join()) {
        errors.push(`${page}: orden del sidebar inesperado:\n    ${order.join('\n    ')}`);
      }
      if (order.some((h) => /\/\d{2}-/.test(h))) errors.push(`${page}: el sidebar muestra prefijos numéricos`);
      const current = [...nav[1].matchAll(/<a[^>]*aria-current="page"[^>]*href="([^"]+)"|<a[^>]*href="([^"]+)"[^>]*aria-current="page"/g)];
      if (current.length !== 1 || (current[0][1] ?? current[0][2]) !== page) {
        errors.push(`${page}: aria-current="page" no marca solo la lección actual`);
      }
      // 4. Grupos
      const groups = [...nav[1].matchAll(/<div role="group" aria-labelledby="([^"]+)"[^>]*>\s*<p id="([^"]+)"[^>]*>([^<]*)<\/p>/g)];
      const labels = groups.map((m) => decodeEntities(m[3]));
      if (labels.join() !== groupLabels().join()) {
        errors.push(`${page}: grupos del sidebar inesperados: ${labels.join(', ') || 'ninguno'}`);
      }
      if (groups.some((m) => m[1] !== m[2])) errors.push(`${page}: un grupo del sidebar no apunta a su etiqueta`);
      // 5. Números de sección (C19, V40)
      const numbers = [...nav[1].matchAll(/<button[^>]*aria-expanded[^>]*>([\s\S]*?)<\/button>/g)].map(
        (m) => /<span[^>]*data-section-number[^>]*>([^<]*)<\/span>/.exec(m[1])?.[1] ?? '-',
      );
      if (numbers.join() !== sectionNumbers().join()) {
        errors.push(`${page}: números de sección inesperados: ${numbers.join(', ')} (se esperaba ${sectionNumbers().join(', ')})`);
      }
    }

    // 3. Enlaces internos del contenido
    const article = /<article[\s\S]*<\/article>/.exec(html)?.[0] ?? '';
    for (const [, target] of article.matchAll(/href="(\/[^"#]*)(?:#[^"]*)?"/g)) {
      if (!pages.has(target)) errors.push(`${page}: enlace interno roto ${target}`);
    }
  }
}

// 6. Valores arbitrarios en el CSS generado (V46). Cada selector de clase se desescapa
//    (.p-\[13px\] → p-[13px]) y se busca con las mismas expresiones que la comprobación 8 de
//    check-tokens.mjs: clase con valor arbitrario y propiedad arbitraria, sin las variantes (…]:).
const cssFiles = fs
  .readdirSync(STATIC_DIR, { recursive: true })
  .filter((file) => file.endsWith('.css'))
  .map((file) => path.join(STATIC_DIR, file));
const cssArbitrary = new Set();
for (const file of cssFiles) {
  for (const [, escaped] of fs.readFileSync(file, 'utf8').matchAll(/\.((?:\\.|[\w-])+)/g)) {
    const cls = escaped.replace(/\\(.)/g, '$1');
    for (const [match] of [
      ...cls.matchAll(/[a-z0-9-]+-\[[^\]]+\](?!:)/g),
      ...cls.matchAll(/(?<![\w-])\[[a-z-]+:[^\]]+\](?!:)/g),
    ]) {
      cssArbitrary.add(match);
    }
  }
}
if (!cssFiles.length) errors.push('No hay CSS en .next/static');
for (const cls of cssArbitrary) {
  if (!(cls in ARBITRARY_ALLOWED)) errors.push(`CSS generado: valor arbitrario ${cls} (no sale de src/ o falta su excepción, V43–V46)`);
}

console.log(`Páginas: ${expected.length} (${LOCALE}, sin prefijo de idioma)`);
console.log(`CSS generado: ${cssFiles.length} archivo(s) · ${cssArbitrary.size} clases con corchetes (${[...cssArbitrary].filter((c) => c in ARBITRARY_ALLOWED).length} excepciones)`);
console.log(`Anclas comprobadas: ${anchorCount} (${accentedCount} con tildes u otros caracteres no ASCII)`);
console.log(`Grupos del sidebar (es): ${groupLabels().join(', ')}`);
console.log(`Números de sección (es, "-" sin número): ${sectionNumbers().join(', ')}`);
console.log(`Orden esperado del sidebar:\n  ${expected.join('\n  ')}`);

if (errors.length) {
  console.error(`\n${errors.length} error(es):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('\nSin errores.');
