import fs from 'node:fs';
import path from 'node:path';
import { ExportNormalizerForm } from '@/components/ExportNormalizerForm';

// Herramienta "Normalizar la exportación" (/tools/normalize-export; T21, T22, T24).
// Componente de servidor: lee tools/figma-to-dtcg.mjs al compilar, para que la descarga del script
// sea el mismo archivo del repositorio con las decisiones del usuario escritas en SCOPE_TYPES
// (withScopeTypes). La parte interactiva es ExportNormalizerForm.
export function ExportNormalizer() {
  const source = fs.readFileSync(path.join(process.cwd(), 'tools/figma-to-dtcg.mjs'), 'utf8');
  return <ExportNormalizerForm source={source} />;
}
