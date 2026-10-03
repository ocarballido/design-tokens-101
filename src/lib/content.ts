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

export const getSections = cache((locale: string): Section[] => {
  const sourceRoot = path.join(CONTENT_DIR, SOURCE_LOCALE);

  return numbered(sourceRoot, false).map((sectionDir) => ({
    slug: sectionDir.slug,
    title: readSectionTitle(locale, sectionDir.name),
    lessons: numbered(path.join(sourceRoot, sectionDir.name), true).map((lessonFile) => {
      const file = `${sectionDir.name}/${lessonFile.name}`;
      const translated = fs.existsSync(path.join(CONTENT_DIR, locale, `${file}.mdx`));
      const contentLocale = translated ? locale : SOURCE_LOCALE;
      return {
        slug: lessonFile.slug,
        section: sectionDir.slug,
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
