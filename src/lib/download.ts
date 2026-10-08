// Descarga un archivo generado en el navegador con un clic del usuario (<a download>,
// investigacion-herramientas.md §3).
export function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
