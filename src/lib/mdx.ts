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
  priority?: number;
}

const CATEGORY_PRIORITY: Record<string, number> = {
  'Layout': 1,
  'Components': 2,
  'Typography': 3,
  'Color': 4,
  'Animation': 5,
  'Responsive': 6
};

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

    const meta = {
      slug,
      ...data,
    } as VocabularyMeta;

    // Ensure dates are strings to avoid serialization issues
    if (meta.createdAt instanceof Date) {
      meta.createdAt = (meta.createdAt as Date).toISOString();
    }
    if (meta.updatedAt instanceof Date) {
      meta.updatedAt = (meta.updatedAt as Date).toISOString();
    }

    return meta;
  }).filter(Boolean) as VocabularyMeta[];

  // Sort posts by priority first, then by date
  return allVocabularyData.sort((a, b) => {
    // 1. Sort by explicit priority if available
    if (a.priority !== undefined && b.priority !== undefined) {
      return a.priority - b.priority;
    }
    
    // 2. Sort by Category Priority
    const priorityA = CATEGORY_PRIORITY[a.category] || 99;
    const priorityB = CATEGORY_PRIORITY[b.category] || 99;
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // 3. Fallback to date (newest first)
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

  const meta = {
    slug,
    ...data,
  } as VocabularyMeta;

  // Ensure dates are strings
  if (meta.createdAt instanceof Date) {
    meta.createdAt = (meta.createdAt as Date).toISOString();
  }
  if (meta.updatedAt instanceof Date) {
    meta.updatedAt = (meta.updatedAt as Date).toISOString();
  }

  return {
    meta,
    content,
  };
}
