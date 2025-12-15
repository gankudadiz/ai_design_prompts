import { getStyleBySlug, getAllStyleSlugs } from '@/lib/styles';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MdxComponents } from '@/components/mdx/MdxStyles';
import remarkGfm from 'remark-gfm';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import StylePreview from '@/components/styles/StylePreview';
import CopyPromptButton from '@/components/styles/CopyPromptButton';

export function generateStaticParams() {
  const slugs = getAllStyleSlugs();
  const locales = ['en', 'zh'];
  
  return slugs.flatMap((item) => 
    locales.map((locale) => ({
      slug: item.params.slug,
      locale: locale
    }))
  );
}

export default async function StylePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  // Await params for Next.js 15+
  const { slug, locale } = await params;
  
  let styleData;
  try {
    styleData = getStyleBySlug(slug, locale);
  } catch (error) {
    notFound();
  }

  const { meta, content } = styleData;

  return (
    <article className="max-w-5xl mx-auto pb-16">
      {/* Back Link */}
      <Link 
        href="/styles" 
        className="inline-flex items-center gap-2 text-text-secondary hover:text-mint-500 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Styles</span>
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {meta.tags.map(tag => (
            <span key={tag} className="text-xs bg-bg-tertiary px-2 py-1 rounded-full text-text-muted font-mono">
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-text-primary mb-4">{meta.title}</h1>
        <p className="text-xl text-text-secondary">{meta.description}</p>
      </div>

      {/* Main Layout: Preview + Prompt */}
      <div className="flex flex-col gap-10 mb-12">
        {/* Top: Interactive Preview */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Preview
          </h2>
          <StylePreview preview={meta.preview} />
        </div>

        {/* Bottom: Magic Prompt */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Magic Prompt
          </h2>
          <div className="relative group">
            <div className="bg-bg-secondary border border-border-medium rounded-md p-6 font-mono text-sm text-text-secondary max-h-[500px] overflow-y-auto whitespace-pre-wrap">
              {meta.prompt}
            </div>
            <div className="absolute top-4 right-4">
              <CopyPromptButton prompt={meta.prompt} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none border-t border-border-medium pt-10">
        <MDXRemote 
          source={content} 
          components={MdxComponents} 
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>
    </article>
  );
}
