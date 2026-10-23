import { Button, icons } from 'designtoken101';

// Ejemplos de docs/components/button.md: un solo primary por vista; el resto, secondary.
export function Primary() {
  return <Button icon={icons.ChevronRight}>Empezar el curso</Button>;
}

export function Secondary() {
  return <Button variant="secondary">Archivos de Figma</Button>;
}

export function PrimaryAndSecondary() {
  return (
    <div className="flex flex-wrap items-center gap-300">
      <Button icon={icons.Download}>Descargar el .zip</Button>
      <Button variant="secondary">Generar escalas</Button>
    </div>
  );
}
