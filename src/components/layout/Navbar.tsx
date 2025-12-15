'use client';

import { Link, usePathname } from '@/i18n/routing';
import { Search, Github, Terminal } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

const navItems = [
  { key: 'home', path: '/' },
  { key: 'concepts', path: '/vocabulary' },
  { key: 'styles', path: '/styles' },
  { key: 'about', path: '/about' },
];

export function Navbar() {
  const pathname = usePathname();
  const t = useTranslations('Navbar');

  return (
    <nav className="sticky top-0 z-50 w-full bg-bg-primary/95 backdrop-blur-sm border-b border-border-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <Terminal className="w-5 h-5 text-mint-500 group-hover:text-mint-400 transition-colors" />
              <span className="font-bold text-lg text-mint-500 group-hover:text-mint-400 transition-colors tracking-tight">
                Design<span className="text-text-primary">_Vocab</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={clsx(
                      'px-3 py-2 text-sm font-medium transition-colors duration-200 relative group',
                      isActive
                        ? 'text-mint-500'
                        : 'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    <span className="relative z-10">
                      {isActive && <span className="mr-1 opacity-100 transition-opacity duration-200">{`>`}</span>}
                      {!isActive && <span className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-mint-500">{`>`}</span>}
                      {t(item.key)}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-mint-500/50" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Section: Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Box - Terminal Style */}
            <div className="hidden sm:flex items-center relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-mint-500 transition-colors">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-48 bg-bg-secondary border border-border-medium text-sm text-text-primary py-1.5 pl-9 pr-3 focus:outline-none focus:border-mint-500 focus:ring-1 focus:ring-mint-500/50 transition-all placeholder:text-text-muted/50"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-text-muted border border-border-medium px-1.5 py-0.5 bg-bg-primary">
                ⌘K
              </div>
            </div>

            <LanguageSwitcher />

            {/* GitHub Link */}
            <a
              href="https://github.com/gankudadiz/ai_design_prompts"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-secondary hover:text-text-primary transition-colors hover:bg-bg-secondary border border-transparent hover:border-border-medium"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
