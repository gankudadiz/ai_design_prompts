import { getVocabularyBySlug, getAllVocabularySlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { FlexPlayground } from '@/components/mdx/FlexPlayground';
import { GridPlayground } from '@/components/mdx/GridPlayground';
import { BoxModelPlayground } from '@/components/mdx/BoxModelPlayground';
import { PositionPlayground } from '@/components/mdx/PositionPlayground';
import { ZIndexPlayground } from '@/components/mdx/ZIndexPlayground';
import { MasonryPlayground } from '@/components/mdx/MasonryPlayground';
import { LayoutPatternDemo } from '@/components/mdx/LayoutPatternDemo';
import { ColorPalettePlayground } from '@/components/mdx/ColorPalettePlayground';
import { DisplayPlayground } from '@/components/mdx/DisplayPlayground';
import { FloatPlayground } from '@/components/mdx/FloatPlayground';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { MdxComponents } from '@/components/mdx/MdxStyles';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getTranslations } from 'next-intl/server';

const components = {
  ...MdxComponents,
  FlexPlayground,
  GridPlayground,
  BoxModelPlayground,
  PositionPlayground,
  ZIndexPlayground,
  MasonryPlayground,
  LayoutPatternDemo,
  ColorPalettePlayground,
  DisplayPlayground,
  FloatPlayground,
  TerminalCard,
};

export async function generateStaticParams() {
  const slugs = getAllVocabularySlugs();
  const locales = ['en', 'zh'];
  
  return slugs.flatMap((item) => 
    locales.map((locale) => ({
      slug: item.params.slug,
      locale: locale
    }))
  );
}

export default async function VocabularyPost({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  const { meta, content } = await getVocabularyBySlug(slug, locale);
  const t = await getTranslations({locale, namespace: 'Vocabulary'});

  const options: any = {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
    },
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Link */}
      <Link
        href={`/vocabulary?category=${meta.category}`}
        className="inline-flex items-center text-xs md:text-sm text-text-muted hover:text-mint-500 mb-6 transition-colors group"
      >
        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        cd ..
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Article Header */}
          <div className="border-b border-border-medium pb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-0.5 text-[10px] md:text-xs font-bold bg-mint-500/10 text-mint-500 border border-mint-500/20">
                {meta.category}
              </span>
              <span className="px-2 py-0.5 text-[10px] md:text-xs border border-border-medium text-text-muted">
                {meta.difficulty}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
              {meta.title}
            </h1>
            {meta.subtitle && (
              <p className="text-lg text-text-secondary font-mono">{meta.subtitle}</p>
            )}
          </div>

          {/* MDX Content */}
          <article className="max-w-none">
            <MDXRemote source={content} components={components} options={options} />
          </article>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Meta Info Card */}
          <div className="bg-bg-card border border-border-medium p-4">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
              {t('metadata')}
            </h3>
            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex items-center text-text-secondary">
                <Calendar className="w-4 h-4 mr-3 text-text-muted" />
                <span>{t('updated')}: {new Date(meta.updatedAt).toLocaleDateString(locale)}</span>
              </div>
              <div className="flex items-start text-text-secondary">
                <Tag className="w-4 h-4 mr-3 mt-1 text-text-muted" />
                <div className="flex flex-wrap gap-2">
                  {meta.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-bg-tertiary px-1.5 py-0.5 rounded-sm text-text-muted">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TOC Placeholder - Hidden for now until dynamic TOC is implemented */}
          {/* 
          <div className="bg-bg-card border border-border-medium p-4 sticky top-24">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
              {t('onThisPage')}
            </h3>
            <ul className="space-y-1.5 text-xs md:text-sm text-text-secondary">
              <li className="pl-2 border-l-2 border-mint-500 text-mint-500">
                <a href="#什么是-flexbox" className="hover:underline">什么是 Flexbox?</a>
              </li>
            </ul>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}
