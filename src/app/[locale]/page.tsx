import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-24">
      <div className="w-full max-w-4xl">
        {/* Terminal Window Hero */}
        <div className="border border-border-medium bg-bg-card shadow-2xl relative overflow-hidden">
          {/* Title Bar */}
          <div className="bg-bg-primary border-b border-border-medium p-3 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50 hover:bg-yellow-500 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50 hover:bg-green-500 transition-colors"></div>
            </div>
            <div className="text-xs text-text-muted select-none">user@dev: ~/vocabulary</div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
          
          {/* Content Area */}
          <div className="p-8 sm:p-12 space-y-8">
            {/* Command Line */}
            <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold">
              <span className="text-mint-500">$</span>
              <span className="text-text-primary">./start-learning.sh</span>
              <span className="w-3 h-6 bg-mint-500 animate-pulse inline-block align-middle ml-1"></span>
            </div>
            
            {/* Output */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl font-bold text-mint-500 text-glow tracking-tight">
                {t('title')}<br/>
              </h1>
              
              <div className="space-y-2 text-lg text-text-secondary border-l-2 border-border-medium pl-4 py-1">
                <p className="flex items-center gap-2">
                  <span className="text-accent-pink">{`>`}</span>
                  <span>{t('subtitle1')}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-accent-pink">{`>`}</span>
                  <span>{t('subtitle2')}</span>
                </p>
              </div>
            </div>
            
            {/* Actions */}
            <div className="pt-8 flex flex-wrap gap-4">
              <Link 
                href="/vocabulary"
                className="group relative px-8 py-3 bg-mint-500/10 border border-mint-500 text-mint-500 hover:bg-mint-500 hover:text-bg-primary transition-all duration-200 font-bold"
              >
                <span className="mr-2">[</span>
                {t('start')}
                <span className="ml-2">]</span>
                <div className="absolute inset-0 bg-mint-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
              <Link 
                href="/about"
                className="px-8 py-3 border border-border-medium text-text-secondary hover:border-text-primary hover:text-text-primary transition-colors duration-200"
              >
                [ {t('about')} ]
              </Link>
            </div>
            
            {/* Stats / Footer of Terminal */}
            <div className="pt-12 border-t border-border-medium/30 flex flex-wrap gap-6 text-sm text-text-muted">
              <div>
                <span className="text-accent-purple">✔</span> {t('version')}
              </div>
              <div>
                <span className="text-accent-purple">⚡</span> Next.js 14
              </div>
              <div>
                <span className="text-accent-purple">🎨</span> Tailwind CSS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
