'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { clsx } from 'clsx';
import { Languages } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const switchLocale = (newLocale: 'en' | 'zh') => {
    const params = searchParams.toString();
    const query = params ? `?${params}` : '';
    router.replace(`${pathname}${query}`, { locale: newLocale });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={clsx(
          "flex items-center gap-1 p-2 text-sm font-medium transition-colors border border-transparent",
          isOpen ? "text-mint-500 bg-bg-secondary border-border-medium" : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary hover:border-border-medium"
        )}
        aria-label="Switch Language"
      >
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline uppercase">{locale}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-24 bg-bg-card border border-border-medium shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            <button
              onClick={() => switchLocale('en')}
              className={clsx(
                "w-full text-left px-4 py-2 text-sm transition-colors hover:bg-bg-tertiary",
                locale === 'en' ? "text-mint-500 font-bold" : "text-text-secondary"
              )}
            >
              English
            </button>
            <button
              onClick={() => switchLocale('zh')}
              className={clsx(
                "w-full text-left px-4 py-2 text-sm transition-colors hover:bg-bg-tertiary",
                locale === 'zh' ? "text-mint-500 font-bold" : "text-text-secondary"
              )}
            >
              中文
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
