import { getPageBySlug } from '@/lib/pages';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MdxComponents } from '@/components/mdx/MdxStyles';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getTranslations } from 'next-intl/server';
import { Calendar } from 'lucide-react';

const components = {
  ...MdxComponents,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Navbar'});
  return {
    title: `${t('about')} - AI Design Prompts`,
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { meta, content } = await getPageBySlug('about', locale);
  const t = await getTranslations({locale, namespace: 'Vocabulary'}); // Reusing Vocabulary namespace for common terms if needed, or Home

  const options: any = {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ],
    },
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Header */}
      <div className="border-b border-border-medium pb-8 mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 text-glow">
          {meta.title}
        </h1>
        <div className="flex items-center text-text-secondary text-sm">
          <Calendar className="w-4 h-4 mr-2 text-mint-500" />
          <span>{t('updated')}: {new Date(meta.updatedAt).toLocaleDateString(locale)}</span>
        </div>
      </div>

      {/* Content */}
      <article className="prose prose-invert prose-mint max-w-none">
        <MDXRemote source={content} components={components} options={options} />
      </article>
      
      {/* Footer Signature */}
      <div className="mt-16 pt-8 border-t border-border-medium text-center text-text-muted text-sm">
        <p>© {new Date().getFullYear()} AI Design Prompts. All rights reserved.</p>
      </div>
    </div>
  );
}
