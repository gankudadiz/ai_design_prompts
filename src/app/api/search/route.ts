import { NextResponse } from 'next/server';
import { getAllVocabularyMeta } from '@/lib/mdx';
import { getAllStyles } from '@/lib/styles';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const vocabulary = getAllVocabularyMeta(locale);
    const styles = getAllStyles(locale);

    const results = [
      ...vocabulary.map(item => ({
        title: item.title,
        description: item.description,
        slug: item.slug,
        type: 'vocabulary' as const,
        category: item.category,
        tags: item.tags,
      })),
      ...styles.map(item => ({
        title: item.title,
        description: item.description,
        slug: item.slug,
        type: 'style' as const,
        tags: item.tags,
      })),
    ];

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch search data' }, { status: 500 });
  }
}
