import { useFormatter, useLocale, useTranslations } from 'next-intl';

// Anatomía: docs/componentes-v1.md §4.1 (con contenedor, §4.10). title es el único h1 de la página.

type LessonHeaderProps = {
  title: string;
  description?: string;
  lastReviewed?: string;
  section?: string;
};

export function LessonHeader({ title, description, lastReviewed, section }: LessonHeaderProps) {
  const t = useTranslations('LessonHeader');
  const format = useFormatter();
  const locale = useLocale();

  return (
    <header
      data-component="LessonHeader"
      className="flex flex-col gap-100 rounded-container border-(length:--t101-border-width-100) border-neutral-default p-400"
    >
      {section ? <p className="type-caption-default text-neutral-subtle">{section}</p> : null}
      {/* V38: una palabra más ancha que la columna ("DesignToken101" a 320 px con el espaciado de
          1.4.12) se parte en vez de salirse del recuadro y dar scroll horizontal (1.4.10, 1.4.12). */}
      <h1 className="type-heading-1 text-neutral-default wrap-break-word">{title}</h1>
      {description ? <p className="type-body-default text-neutral-subtle">{description}</p> : null}
      {lastReviewed ? (
        // La fecha va en el idioma de la interfaz, aunque la lección se muestre sin traducir (3.1.2).
        <p lang={locale} className="type-caption-default text-neutral-subtle">
          {t.rich('lastReviewed', {
            date: () => (
              <time dateTime={lastReviewed}>
                {/* La fecha del frontmatter es un día (AAAA-MM-DD), sin hora: se formatea en UTC. */}
                {format.dateTime(new Date(lastReviewed), {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  timeZone: 'UTC',
                })}
              </time>
            ),
          })}
        </p>
      ) : null}
    </header>
  );
}
