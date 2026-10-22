# Tokens

- Color: usa solo los semánticos (color.background.*, color.text.*, color.border.*). Nunca la paleta (color.emerald.*, color.neutral.*…): está oculta en Figma y no existe como clase de Tailwind.
- Texto: usa los estilos de texto (heading/*, body/*, label/default, caption/default, code/default). Nunca font-size, font-weight ni font-family sueltos.
- Radio: radius.control en controles, radius.container en contenedores y radius.group en el carril que agrupa varios controles.
- Espaciado y grosor de borde: usa la escala space.* y border-width.*. No tienen capa semántica.
- Nunca escribas un valor literal ni un valor arbitrario entre corchetes.
- Si ningún token encaja, no uses el valor más parecido: dilo y propón el token que falta.
- Los tokens con $deprecated no se usan; su descripción dice cuál usar.
