'use client';

import { Link } from '@/i18n/routing';
import { clsx } from 'clsx';
import { useSearchParams } from 'next/navigation';
import type { VocabularyMeta } from '@/lib/mdx';
import { useTranslations } from 'next-intl';

export default function VocabularyList({ posts }: { posts: VocabularyMeta[] }) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const t = useTranslations('Vocabulary');
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

  // Filter posts
  const filteredPosts = currentCategory && currentCategory !== 'All'
    ? posts.filter(post => post.category === currentCategory)
    : posts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar Filter */}
      <div className="md:col-span-1 space-y-6">
        <div className="bg-bg-card border border-border-medium p-4 sticky top-24">
          <h3 className="text-sm font-bold text-mint-500 mb-4 flex items-center gap-2 border-b border-border-medium pb-2">
            <span className="text-accent-pink">{`>_`}</span> {t('filter')}
          </h3>
          <ul className="space-y-1">
            {categories.map((category) => {
              const isActive = (currentCategory === category) || (!currentCategory && category === 'All');
              return (
                <li key={category}>
                  <Link
                    href={category === 'All' ? '/vocabulary' : `/vocabulary?category=${category}`}
                    className={clsx(
                      "block px-3 py-2 text-sm transition-all rounded-sm font-mono",
                      isActive 
                        ? "bg-mint-500/10 text-mint-500 border-l-2 border-mint-500" 
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary border-l-2 border-transparent"
                    )}
                  >
                    {category}
                    {category === 'All' && <span className="float-right text-xs opacity-50">{posts.length}</span>}
                    {category !== 'All' && <span className="float-right text-xs opacity-50">{posts.filter(p => p.category === category).length}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:col-span-3 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-medium pb-4 mb-6">
          <h1 className="text-2xl font-bold text-text-primary">
            {currentCategory && currentCategory !== 'All' ? currentCategory : t('search').replace('ls ./', '')}
          </h1>
          <span className="text-xs text-text-muted font-mono">
            {filteredPosts.length} {t('itemsFound')}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/vocabulary/${post.slug}`}
              className="group block h-full"
            >
              <div className="h-full bg-bg-card border border-border-medium p-5 transition-all duration-200 hover:border-mint-500 hover:shadow-[0_0_15px_rgba(0,255,204,0.1)] relative overflow-hidden flex flex-col">
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-3 border-b border-border-medium/30 pb-2">
                  <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider">{post.category}</span>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-border-light group-hover:bg-red-500/50 transition-colors"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-border-light group-hover:bg-yellow-500/50 transition-colors"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-border-light group-hover:bg-green-500/50 transition-colors"></div>
                  </div>
                </div>

                {/* Content */}
                <h2 className="text-lg font-bold text-text-primary mb-1 group-hover:text-mint-500 transition-colors flex items-center gap-2">
                  <span className="text-mint-500 opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-300 text-sm">➜</span>
                  {post.title}
                </h2>
                {post.subtitle && (
                  <p className="text-xs text-text-muted mb-3 font-mono">{post.subtitle}</p>
                )}
                <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 mb-4 flex-grow">
                  {post.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border-medium/30">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-bg-tertiary text-text-muted rounded-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className={clsx(
                    "text-[10px] px-1.5 py-0.5 border rounded-sm",
                    post.difficulty === 'Easy' ? "border-green-500/20 text-green-400 bg-green-500/5" :
                    post.difficulty === 'Medium' ? "border-yellow-500/20 text-yellow-400 bg-yellow-500/5" :
                    "border-red-500/20 text-red-400 bg-red-500/5"
                  )}>
                    {post.difficulty}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          
          {filteredPosts.length === 0 && (
            <div className="col-span-full py-12 text-center text-text-muted border border-dashed border-border-medium rounded-lg">
              <p>{t('noItems')}</p>
              <Link href="/vocabulary" className="text-mint-500 hover:underline mt-2 inline-block text-sm">
                {t('viewAll')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
