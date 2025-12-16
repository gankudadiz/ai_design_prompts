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
  // Helper to get all files recursively
  const getFiles = (dir: string): string[] => {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
      const res = path.join(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : [res];
    });
    return Array.prototype.concat(...files);
  };

  const allFiles = getFiles(contentDirectory);
  
  // Get unique slugs by removing extensions and language suffixes
  // Note: We use the filename as the slug, ignoring the directory structure for the URL
  const slugs = new Set(allFiles
    .filter(filePath => filePath.endsWith('.mdx'))
    .map(filePath => path.basename(filePath).replace(/(\.zh|\.en)?\.mdx$/, ''))
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
  // Helper to get all files recursively (same as in getAllVocabularySlugs, but we can't easily share without exporting)
  const getFiles = (dir: string): string[] => {
    if (!fs.existsSync(dir)) return [];
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
      const res = path.join(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : [res];
    });
    return Array.prototype.concat(...files);
  };

  const allFiles = getFiles(contentDirectory);
  const slugs = getAllVocabularySlugs().map(item => item.params.slug);
  
  const allVocabularyData = slugs.map((slug) => {
    // Try exact locale match first
    let fullPath = allFiles.find(file => path.basename(file) === `${slug}.${locale}.mdx`);
    
    // Try default .mdx
    if (!fullPath) {
      fullPath = allFiles.find(file => path.basename(file) === `${slug}.mdx`);
    }
    
    // Fallback to .en.mdx
    if (!fullPath) {
      fullPath = allFiles.find(file => path.basename(file) === `${slug}.en.mdx`);
    }

    if (!fullPath) {
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

  // Sort posts by Category Priority first, then by priority, then by date
  return allVocabularyData.sort((a, b) => {
    // 1. Sort by Category Priority
    const catPriorityA = CATEGORY_PRIORITY[a.category] || 99;
    const catPriorityB = CATEGORY_PRIORITY[b.category] || 99;
    
    if (catPriorityA !== catPriorityB) {
      return catPriorityA - catPriorityB;
    }

    // 2. Sort by explicit priority if available (inside the same category)
    if (a.priority !== undefined && b.priority !== undefined) {
      return a.priority - b.priority;
    }
    
    // If one has priority and the other doesn't, prioritize the one with priority
    if (a.priority !== undefined && b.priority === undefined) {
      return -1;
    }
    if (a.priority === undefined && b.priority !== undefined) {
      return 1;
    }
    
    // 3. Sort by date (newest first)
    if (a.createdAt < b.createdAt) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getVocabularyBySlug(slug: string, locale: string = 'en'): Promise<VocabularyPost> {
  // Helper to get all files recursively (we need this again here)
  const getFiles = (dir: string): string[] => {
    if (!fs.existsSync(dir)) return [];
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
      const res = path.join(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : [res];
    });
    return Array.prototype.concat(...files);
  };

  const allFiles = getFiles(contentDirectory);
  
  // Try exact locale match first
  let fullPath = allFiles.find(file => path.basename(file) === `${slug}.${locale}.mdx`);
  
  // Try default .mdx
  if (!fullPath) {
    fullPath = allFiles.find(file => path.basename(file) === `${slug}.mdx`);
  }
  
  // Fallback to .en.mdx
  if (!fullPath) {
    fullPath = allFiles.find(file => path.basename(file) === `${slug}.en.mdx`);
  }

  if (!fullPath || !fs.existsSync(fullPath)) {
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
