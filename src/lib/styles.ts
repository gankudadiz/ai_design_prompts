import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const stylesDirectory = path.join(process.cwd(), 'content/styles');

export interface StyleMeta {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  preview: {
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    accentColor?: string;
    secondaryColor?: string;
    borderColor?: string;
    borderRadius?: string;
  };
  prompt: string;
}

export function getAllStyleSlugs() {
  if (!fs.existsSync(stylesDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(stylesDirectory);
  const slugs = new Set(fileNames
    .filter(name => name.endsWith('.mdx'))
    .map(name => name.replace(/(\.zh|\.en)?\.mdx$/, ''))
  );
  
  return Array.from(slugs).map((slug) => {
    return {
      params: {
        slug,
      },
    };
  });
}

export function getAllStyles(locale: string = 'en'): StyleMeta[] {
  // Ensure directory exists
  if (!fs.existsSync(stylesDirectory)) {
    return [];
  }

  const slugs = getAllStyleSlugs().map(item => item.params.slug);

  const allStyles = slugs.map((slug) => {
    let fullPath = path.join(stylesDirectory, `${slug}.${locale}.mdx`);
    
    // Fallback logic
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(stylesDirectory, `${slug}.en.mdx`);
    }
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(stylesDirectory, `${slug}.mdx`);
    }

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
    } as StyleMeta;
  }).filter(Boolean) as StyleMeta[];

  return allStyles;
}

export function getStyleBySlug(slug: string, locale: string = 'en'): { meta: StyleMeta, content: string } {
  let fullPath = path.join(stylesDirectory, `${slug}.${locale}.mdx`);
  
  // Fallback logic
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(stylesDirectory, `${slug}.en.mdx`);
  }
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(stylesDirectory, `${slug}.mdx`);
  }
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Style not found: ${slug} (locale: ${locale})`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug,
      ...data,
    } as StyleMeta,
    content,
  };
}
