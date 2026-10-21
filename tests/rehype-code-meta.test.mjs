// Pruebas de tools/rehype-code-meta.mjs: `preview` en el meta (CodePreview, V60).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import rehypeCodeMeta, { hasPreview } from '../tools/rehype-code-meta.mjs';

// Árbol como el que deja mdast-util-to-hast para ```{language} {meta}.
function codeProperties(language, meta) {
  const code = { type: 'element', tagName: 'code', properties: { className: [`language-${language}`] }, data: { meta }, children: [] };
  const tree = { type: 'root', children: [{ type: 'element', tagName: 'pre', properties: {}, children: [code] }] };
  rehypeCodeMeta()(tree);
  return code.properties;
}

test('preview en un bloque markdown o md añade data-preview', () => {
  assert.equal(codeProperties('markdown', 'filename="button.md" preview').dataPreview, '');
  assert.equal(codeProperties('md', 'preview').dataPreview, '');
  assert.equal(codeProperties('markdown', 'filename="button.md" preview').dataFilename, 'button.md');
});

test('preview en otro lenguaje no añade data-preview', () => {
  assert.equal(codeProperties('json', 'filename="tokens.json" preview').dataPreview, undefined);
  assert.equal(codeProperties('css', 'preview').dataPreview, undefined);
});

test('sin la palabra preview suelta no hay data-preview', () => {
  assert.equal(codeProperties('markdown', 'filename="button.md"').dataPreview, undefined);
  assert.equal(codeProperties('markdown', 'filename="preview.md"').dataPreview, undefined);
  assert.equal(codeProperties('markdown', 'previews').dataPreview, undefined);
  assert.equal(hasPreview('filename="a b preview" marks="1"'), false);
});
