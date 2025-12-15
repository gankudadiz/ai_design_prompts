import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowRight, Palette, Terminal, Sparkles } from 'lucide-react';
import { getAllStyles } from '@/lib/styles';
import StyleCard from '@/components/styles/StyleCard';

export default async function StylesIndex({ params }: { params: Promise<{ locale: string }> }) {
  // Await params for Next.js 15+
  const { locale } = await params;
  const t = await getTranslations('Styles');
  const styles = getAllStyles(locale);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-border-medium pb-8">
        <h1 className="text-4xl font-bold text-text-primary mb-4 flex items-center gap-3">
          <Palette className="w-8 h-8 text-mint-500" />
          {t('title')}
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      {/* Styles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {styles.map((style) => (
          <StyleCard key={style.slug} style={style} />
        ))}
      </div>
    </div>
  );
}
