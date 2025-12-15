import { getAllVocabularyMeta } from '@/lib/mdx';
import VocabularyList from '@/components/vocabulary/VocabularyList';
import { Suspense } from 'react';

export default async function VocabularyIndex({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const posts = getAllVocabularyMeta(locale);

  return (
    <Suspense fallback={<div className="text-text-primary">Loading...</div>}>
      <VocabularyList posts={posts} />
    </Suspense>
  );
}
