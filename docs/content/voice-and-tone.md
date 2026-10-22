---
title: Voz y tono
type: content
status: stable
---

# Voz y tono

Reglas de redacción de las páginas y de la interfaz de DesignToken101. Todo se escribe en español.

## Voz

- Segunda persona (tú) y voz activa.
- Frases cortas. Si una frase acumula comas, divídela o conviértela en lista.
- Repite el sujeto en lugar de usar un "esto" ambiguo.
- Cada afirmación sobre una herramienta o especificación lleva enlace a su fuente oficial.
- Separa lo que dice la fuente de la recomendación propia. La recomendación va en un `Callout` con `variant="recommendation"`.
- Los blogs y los foros se marcan como tales.
- Lo que no se puede comprobar no se afirma: si ni una fuente oficial ni una prueba propia lo respaldan, no se publica. Una prueba propia dice con qué se hizo y su fecha ("con la API de plugins de Figma, el 2026-10-21").
- Sin contenido de IA en el curso: ni hipótesis ni promesas sobre lo que hará un agente.

## Puntuación y formato

- Nunca uses guiones largos (—). Usa dos puntos, paréntesis o una frase nueva.
- En el título de un enlace, dos puntos entre la fuente y el título: `[Figma: Modes for variables](…)`.
- En una celda de tabla vacía, una palabra: "No tiene", "No aplica".
- Los títulos de apartado no llevan `¿?`, comillas ni dos puntos: cambian el ancla del enlace.
- Los nombres de token con llaves van entre comillas invertidas: `` `{color.blue.500}` ``.
- Los vídeos se enlazan, no se insertan, con su idioma, autor y duración.

## Errores

- Un error se dice siempre con texto, además del color o el icono.
- El error de un campo aparece al salir del campo y al pulsar la acción, no mientras se escribe por primera vez.
- Si al pulsar la acción hay uno o más errores, `ErrorSummary` aparece encima del botón, con un enlace a cada campo.

Textos que ya usa la web:

- "Escribe un color en hex, RGB o HSL, por ejemplo #33CC99."
- "Marca al menos un paso para exportar"
- "Ya hay una colección con el nombre {collection}. Quita una de las dos."

## Palabras

| No | Sí |
|---|---|
| fácil, rápido, sencillo, simplemente, solo (como valoración) | Quítalas: son subjetivas y pueden desanimar |
| modo claro, modo oscuro (para los modos del sistema) | Light, Dark |
| escritorio, móvil (para los modos de Layout) | Desktop, Mobile |
| Tokens101 | DesignToken101 |

## Glosario

- **DesignToken101:** el nombre del curso y del logotipo. Los identificadores técnicos no cambian: `--t101-`, `design-tokens-101`, TokensDS. El dominio es `designtokens101.com`.
- **Light, Dark, Desktop, Mobile:** los modos del sistema, con el nombre que tienen en Figma. El concepto general ("un modo oscuro") y el selector de tema de la web ("Modo claro", "Modo oscuro") se escriben en español.
- **Módulo y lección:** el curso se divide en módulos; cada módulo, en lecciones. Cada módulo termina con un ejercicio, salvo el 0 (Empezar aquí) y el 10 (Conclusiones).
- **"Lo que te llevas":** el resumen del final de cada lección, en `Takeaways`.
- **"En esta página":** la lista de apartados del principio de cada lección.
- **"Fuentes":** el último apartado de cada lección.
- **Etiquetas de `Callout`:** Nota, Aviso, Recomendación, Pendiente.
- **Herramientas:** "Generar escalas" y "Normalizar la exportación".

## Sin regla escrita

El repositorio no tiene reglas para el texto de los botones, los estados vacíos ni las confirmaciones. Si las necesitas, dilo y propón la regla; no la inventes.
