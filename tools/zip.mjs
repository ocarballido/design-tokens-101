// Lectura y escritura de .zip sin dependencias, para "Normalizar la exportación" (T22, decisión 3).
// Usa DecompressionStream y CompressionStream con el formato "deflate-raw" (Chrome 103, Firefox 113,
// Safari 16.4; Node.js 18). Lee los métodos 0 (sin comprimir, el que usa Figma: prueba del 2026-10-08)
// y 8 (deflate); escribe con el 8. Detalle y pruebas: docs/investigacion-herramientas.md §2, §3 y §7.

const u16 = (view, offset) => view.getUint16(offset, true);
const u32 = (view, offset) => view.getUint32(offset, true);

async function pipe(bytes, stream) {
  return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer());
}

/**
 * @param {ArrayBuffer} buffer
 * @returns {Promise<{ path: string, text: string }[]>} los archivos del .zip (sin las carpetas)
 */
export async function readZip(buffer) {
  const view = new DataView(buffer);
  let end = buffer.byteLength - 22;
  while (end >= 0 && u32(view, end) !== 0x06054b50) end--;
  if (end < 0) throw new Error('No es un archivo .zip');
  const count = u16(view, end + 10);
  let p = u32(view, end + 16);
  const files = [];
  for (let i = 0; i < count; i++) {
    if (u32(view, p) !== 0x02014b50) throw new Error('El .zip está dañado');
    const method = u16(view, p + 10);
    const size = u32(view, p + 20);
    const nameLength = u16(view, p + 28);
    const extraLength = u16(view, p + 30);
    const commentLength = u16(view, p + 32);
    const local = u32(view, p + 42);
    const name = new TextDecoder().decode(new Uint8Array(buffer, p + 46, nameLength));
    const start = local + 30 + u16(view, local + 26) + u16(view, local + 28);
    const raw = new Uint8Array(buffer, start, size);
    if (!name.endsWith('/')) {
      if (method !== 0 && method !== 8) throw new Error(`${name}: método de compresión ${method} no admitido`);
      const data = method === 0 ? raw : await pipe(raw, new DecompressionStream('deflate-raw'));
      files.push({ path: name, text: new TextDecoder().decode(data) });
    }
    p += 46 + nameLength + extraLength + commentLength;
  }
  return files;
}

const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(bytes) {
  let c = ~0;
  for (const byte of bytes) c = CRC_TABLE[(c ^ byte) & 255] ^ (c >>> 8);
  return ~c >>> 0;
}

/**
 * @param {{ path: string, text: string }[]} files  rutas con "/" para las carpetas
 * @returns {Promise<Blob>} el .zip (application/zip)
 */
export async function writeZip(files) {
  const encoder = new TextEncoder();
  const parts = [];
  const central = [];
  let offset = 0;
  for (const file of files) {
    const name = encoder.encode(file.path);
    const data = encoder.encode(file.text);
    const compressed = await pipe(data, new CompressionStream('deflate-raw'));
    const crc = crc32(data);

    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true); // versión necesaria: 2.0
    local.setUint16(6, 0x0800, true); // nombres en UTF-8
    local.setUint16(8, 8, true); // deflate
    local.setUint32(14, crc, true);
    local.setUint32(18, compressed.length, true);
    local.setUint32(22, data.length, true);
    local.setUint16(26, name.length, true);
    parts.push(new Uint8Array(local.buffer), name, compressed);

    const entry = new DataView(new ArrayBuffer(46));
    entry.setUint32(0, 0x02014b50, true);
    entry.setUint16(4, 20, true);
    entry.setUint16(6, 20, true);
    entry.setUint16(8, 0x0800, true);
    entry.setUint16(10, 8, true);
    entry.setUint32(16, crc, true);
    entry.setUint32(20, compressed.length, true);
    entry.setUint32(24, data.length, true);
    entry.setUint16(28, name.length, true);
    entry.setUint32(42, offset, true);
    central.push(new Uint8Array(entry.buffer), name);
    offset += 30 + name.length + compressed.length;
  }
  const centralSize = central.reduce((sum, part) => sum + part.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, centralSize, true);
  end.setUint32(16, offset, true);
  return new Blob([...parts, ...central, new Uint8Array(end.buffer)], { type: 'application/zip' });
}
