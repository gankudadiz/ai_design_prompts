import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const pagesDirectory = path.join(process.cwd(), 'content/pages');

export interface PageMeta {
  title: string;
  description: string;
  updatedAt: string;
}

export interface PagePost {
  meta: PageMeta;
  content: string;
}

export async function getPageBySlug(slug: string, locale: string = 'en'): Promise<PagePost> {
  let fullPath = path.join(pagesDirectory, `${slug}.${locale}.mdx`);
  
  // Fallback to default .mdx
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(pagesDirectory, `${slug}.mdx`);
  }
  
  // Fallback to .en.mdx if locale is not en
  if (!fs.existsSync(fullPath)) {
      fullPath = path.join(pagesDirectory, `${slug}.en.mdx`);
  }

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Page not found: ${slug} (locale: ${locale})`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);

  const meta = {
    ...data,
  } as PageMeta;

  return {
    meta,
    content,
  };
}
