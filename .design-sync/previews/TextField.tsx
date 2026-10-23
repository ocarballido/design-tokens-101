import { TextField } from 'designtoken101';

// Ejemplos de docs/components/text-field.md y de "Generar escalas".
export function WithHint() {
  return <TextField label="Nombre de la paleta" hint="En minúsculas, sin espacios." defaultValue="emerald" />;
}

export function Code() {
  return <TextField label="Color de marca" hint="En hex, con seis cifras." code defaultValue="#33CC99" autoComplete="off" spellCheck={false} />;
}

export function WithError() {
  return (
    <TextField
      label="Color de marca"
      hint="En hex, con seis cifras."
      code
      defaultValue="33CC9"
      autoComplete="off"
      spellCheck={false}
      error="Escribe el color con # y seis cifras."
    />
  );
}
