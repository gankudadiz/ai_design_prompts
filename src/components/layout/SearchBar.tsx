'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/routing';
import { Search, Loader2, FileText, Palette } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';

interface SearchResult {
  title: string;
  description: string;
  slug: string;
  type: 'vocabulary' | 'style';
  tags?: string[];
}

export function SearchBar() {
  const t = useTranslations('Navbar');
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allData, setAllData] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/search');
        if (response.ok) {
          const data = await response.json();
          setAllData(data);
        }
      } catch (error) {
        console.error('Failed to load search data:', error);
      }
    };
    
    // Delay loading slightly to prioritize initial render
    const timer = setTimeout(loadData, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter results when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
    const filtered = allData.filter(item => {
      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();
      const tags = item.tags?.join(' ').toLowerCase() || '';
      
      return searchTerms.every(term => 
        title.includes(term) || description.includes(term) || tags.includes(term)
      );
    }).slice(0, 8); // Limit to 8 results

    setResults(filtered);
    setIsOpen(true);
    setSelectedIndex(-1);
  }, [query, allData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      
      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
    }
  };

  const handleSelect = (item: SearchResult) => {
    const path = item.type === 'vocabulary' 
      ? `/vocabulary/${item.slug}`
      : `/styles/${item.slug}`;
    
    router.push(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className="hidden sm:block relative group z-50">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-mint-500 transition-colors">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder={t('searchPlaceholder')}
          className="w-48 sm:w-64 bg-bg-secondary border border-border-medium text-sm text-text-primary py-1.5 pl-9 pr-10 focus:outline-none focus:border-mint-500 focus:ring-1 focus:ring-mint-500/50 transition-all placeholder:text-text-muted/50"
          autoComplete="off"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-text-muted border border-border-medium px-1.5 py-0.5 bg-bg-primary pointer-events-none">
          ⌘K
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full sm:w-[400px] right-0 bg-bg-primary border border-border-medium shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          {results.length > 0 ? (
            <ul className="max-h-[60vh] overflow-y-auto py-1">
              {results.map((result, index) => (
                <li key={`${result.type}-${result.slug}`}>
                  <button
                    onClick={() => handleSelect(result)}
                    className={clsx(
                      'w-full text-left px-4 py-3 flex items-start gap-3 transition-colors',
                      index === selectedIndex ? 'bg-bg-secondary' : 'hover:bg-bg-secondary'
                    )}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className={clsx(
                      'mt-0.5 p-1.5 rounded-sm flex-shrink-0',
                      result.type === 'vocabulary' ? 'bg-mint-500/10 text-mint-500' : 'bg-purple-500/10 text-purple-500'
                    )}>
                      {result.type === 'vocabulary' ? <FileText className="w-4 h-4" /> : <Palette className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-text-primary truncate">
                        {result.title}
                      </div>
                      <div className="text-xs text-text-muted truncate mt-0.5">
                        {result.description}
                      </div>
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted/70 font-medium mt-1">
                      {result.type === 'vocabulary' ? 'Concept' : 'Style'}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center text-text-muted text-sm">
              No results found for "{query}"
            </div>
          )}
          <div className="px-3 py-2 bg-bg-secondary border-t border-border-medium text-[10px] text-text-muted flex items-center justify-between">
            <span className="flex items-center gap-2">
              <kbd className="px-1 py-0.5 bg-bg-primary border border-border-medium rounded">↑</kbd>
              <kbd className="px-1 py-0.5 bg-bg-primary border border-border-medium rounded">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-1 py-0.5 bg-bg-primary border border-border-medium rounded">↵</kbd>
              to select
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
