import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/vocabulary');

export interface VocabularyMeta {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface VocabularyPost {
  meta: VocabularyMeta;
  content: string;
}

export function getAllVocabularySlugs() {
  const fileNames = fs.readdirSync(contentDirectory);
  // Get unique slugs by removing extensions and language suffixes
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

export function getAllVocabularyMeta(locale: string = 'en'): VocabularyMeta[] {
  const slugs = getAllVocabularySlugs().map(item => item.params.slug);
  
  const allVocabularyData = slugs.map((slug) => {
    let fullPath = path.join(contentDirectory, `${slug}.${locale}.mdx`);
    
    // Fallback to default .mdx if specific locale file doesn't exist
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(contentDirectory, `${slug}.mdx`);
    }

    // If still not found (e.g. requested 'zh' but only 'en.mdx' exists and no default 'mdx'), try 'en' explicitly
    if (!fs.existsSync(fullPath)) {
         fullPath = path.join(contentDirectory, `${slug}.en.mdx`);
    }

    if (!fs.existsSync(fullPath)) {
        // Should not happen if getAllVocabularySlugs works correctly based on existing files
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
    } as VocabularyMeta;
  }).filter(Boolean) as VocabularyMeta[];

  // Sort posts by date
  return allVocabularyData.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getVocabularyBySlug(slug: string, locale: string = 'en'): Promise<VocabularyPost> {
  let fullPath = path.join(contentDirectory, `${slug}.${locale}.mdx`);
  
  // Fallback to default .mdx
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(contentDirectory, `${slug}.mdx`);
  }
  
  // Fallback to .en.mdx
  if (!fs.existsSync(fullPath)) {
      fullPath = path.join(contentDirectory, `${slug}.en.mdx`);
  }

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Vocabulary not found: ${slug} (locale: ${locale})`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug,
      ...data,
    } as VocabularyMeta,
    content,
  };
}
