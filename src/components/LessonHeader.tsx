// Provisional, sin estilo (paso 4). Anatomía: docs/componentes-v1.md §4.1.
// title es el único h1 de la página.

type LessonHeaderProps = {
  title: string;
  description?: string;
  lastReviewed?: string;
  section?: string;
};

export function LessonHeader({ title, description, lastReviewed, section }: LessonHeaderProps) {
  return (
    <header data-component="LessonHeader">
      {section ? <p>{section}</p> : null}
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
      {lastReviewed ? (
        <p>
          <time dateTime={lastReviewed}>{lastReviewed}</time>
        </p>
      ) : null}
    </header>
  );
}
