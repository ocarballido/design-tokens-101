import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { parse as parseYaml } from 'yaml';

// Lee content/{locale}/NN-seccion/NN-pagina.mdx (C6). El prefijo NN- ordena y no
// aparece en la URL (C7). La estructura sale del idioma de trabajo (español, C5);
// si falta la traducción de una lección o de una sección, se usa la española (V02).

const CONTENT_DIR = path.join(process.cwd(), 'content');
export const SOURCE_LOCALE = 'es';

const PREFIX = /^(\d{2})-(.+?)(\.mdx)?$/;

export type Frontmatter = {
  title: string;
  /** C20: <title> para buscadores; si falta, se usa title. No cambia el h1 ni el sidebar. */
  meta_title?: string;
  description?: string;
  nav_title?: string;
  lastReviewed?: string;
};

export type Lesson = {
  slug: string;
  section: string;
  /** Ruta relativa a content/{contentLocale}/, sin extensión. */
  file: string;
  /** Idioma del archivo que se muestra: distinto del de la página si no hay traducción. */
  contentLocale: string;
  frontmatter: Frontmatter;
};

export type Section = {
  slug: string;
  title: string;
  /** C19: número del módulo, del prefijo de la carpeta (01- → 1); null en las de referencia (prefijo ≥ 90, V40). */
  number: number | null;
  /** Grupo del sidebar (C17): texto del separador "---Texto---" anterior; null antes del primero. */
  group: string | null;
  lessons: Lesson[];
};

function numbered(dir: string, wantFiles: boolean) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => (wantFiles ? entry.isFile() && entry.name.endsWith('.mdx') : entry.isDirectory()))
    .map((entry) => ({ name: entry.name, match: PREFIX.exec(entry.name) }))
    .filter((item): item is { name: string; match: RegExpExecArray } => item.match !== null)
    .sort((a, b) => Number(a.match[1]) - Number(b.match[1]))
    .map(({ name, match }) => ({ name: name.replace(/\.mdx$/, ''), slug: match[2] }));
}

function readFrontmatter(file: string): Frontmatter {
  const source = fs.readFileSync(file, 'utf8');
  const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  if (!block) throw new Error(`Falta el frontmatter en ${file}`);
  const data = parseYaml(block[1]) as Frontmatter;
  if (!data?.title) throw new Error(`Falta "title" en el frontmatter de ${file}`);
  return data;
}

function readSectionTitle(locale: string, dir: string): string {
  for (const candidate of [locale, SOURCE_LOCALE]) {
    const file = path.join(CONTENT_DIR, candidate, dir, 'meta.json');
    if (fs.existsSync(file)) {
      const meta = JSON.parse(fs.readFileSync(file, 'utf8')) as { title?: string };
      if (meta.title) return meta.title;
    }
  }
  throw new Error(`Falta content/${SOURCE_LOCALE}/${dir}/meta.json con "title"`);
}

// C19, V40: el número del módulo es el prefijo de la carpeta (00- → 0, 07- → 7). Las secciones de
// referencia (Recursos, Herramientas, T8) llevan un prefijo de 90 o más y van sin número.
const REFERENCE_PREFIX = 90;

function sectionNumber(dir: string): number | null {
  const prefix = Number(PREFIX.exec(dir)![1]);
  return prefix >= REFERENCE_PREFIX ? null : prefix;
}

const SEPARATOR = /^---(.+)---$/;

// C17: content/{locale}/meta.json (o el del español) lista las carpetas de sección en orden, con
// separadores "---Texto---" (convención de Fumadocs, https://fumadocs.dev/docs/page-conventions).
// Toda carpeta de content/es tiene que estar una vez, para que ninguna sección desaparezca.
function readSectionOrder(locale: string, dirs: string[]): { dir: string; group: string | null }[] {
  const candidate = [locale, SOURCE_LOCALE].find((item) => fs.existsSync(path.join(CONTENT_DIR, item, 'meta.json')));
  if (!candidate) throw new Error(`Falta content/${SOURCE_LOCALE}/meta.json con "pages"`);
  const file = `content/${candidate}/meta.json`;
  const { pages } = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, candidate, 'meta.json'), 'utf8')) as { pages?: unknown };
  if (!Array.isArray(pages) || pages.some((page) => typeof page !== 'string')) {
    throw new Error(`${file}: "pages" tiene que ser una lista de textos`);
  }

  const order: { dir: string; group: string | null }[] = [];
  let group: string | null = null;
  for (const page of pages as string[]) {
    const separator = SEPARATOR.exec(page);
    if (separator) group = separator[1].trim();
    else if (!dirs.includes(page)) throw new Error(`${file}: "${page}" no es una carpeta de content/${SOURCE_LOCALE}`);
    else if (order.some((item) => item.dir === page)) throw new Error(`${file}: "${page}" está repetida`);
    else order.push({ dir: page, group });
  }
  const missing = dirs.filter((dir) => !order.some((item) => item.dir === dir));
  if (missing.length) throw new Error(`${file}: faltan en "pages" ${missing.join(', ')}`);
  return order;
}

export const getSections = cache((locale: string): Section[] => {
  const sourceRoot = path.join(CONTENT_DIR, SOURCE_LOCALE);
  const dirs = new Map(numbered(sourceRoot, false).map((dir) => [dir.name, dir.slug]));

  return readSectionOrder(locale, [...dirs.keys()]).map(({ dir, group }) => ({
    slug: dirs.get(dir)!,
    title: readSectionTitle(locale, dir),
    number: sectionNumber(dir),
    group,
    lessons: numbered(path.join(sourceRoot, dir), true).map((lessonFile) => {
      const file = `${dir}/${lessonFile.name}`;
      const translated = fs.existsSync(path.join(CONTENT_DIR, locale, `${file}.mdx`));
      const contentLocale = translated ? locale : SOURCE_LOCALE;
      return {
        slug: lessonFile.slug,
        section: dirs.get(dir)!,
        file,
        contentLocale,
        frontmatter: readFrontmatter(path.join(CONTENT_DIR, contentLocale, `${file}.mdx`)),
      };
    }),
  }));
});

export function getLessons(locale: string): Lesson[] {
  return getSections(locale).flatMap((section) => section.lessons);
}

export function getLesson(locale: string, section: string, slug: string): Lesson | undefined {
  return getLessons(locale).find((lesson) => lesson.section === section && lesson.slug === slug);
}

export function lessonHref(lesson: Pick<Lesson, 'section' | 'slug'>): string {
  return `/${lesson.section}/${lesson.slug}`;
}
