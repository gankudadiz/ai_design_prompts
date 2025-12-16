'use client';

import { TerminalCard } from '@/components/ui/TerminalCard';
import { useTranslations } from 'next-intl';

export function MasonryPlayground() {
  const t = useTranslations('Playground');

  // Mock items with different heights
  const items = [
    { id: 1, height: 100, color: 'bg-accent-pink' },
    { id: 2, height: 150, color: 'bg-mint-500' },
    { id: 3, height: 80, color: 'bg-accent-purple' },
    { id: 4, height: 120, color: 'bg-blue-400' },
    { id: 5, height: 90, color: 'bg-yellow-400' },
    { id: 6, height: 140, color: 'bg-orange-400' },
  ];

  return (
    <TerminalCard title={t('masonryTitle')} command={t('masonryCommand')} className="my-8">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Standard Grid */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-text-muted text-center uppercase">Standard Grid</h4>
            <div className="bg-bg-primary border border-dashed border-border-light rounded-sm p-4 h-64 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                 {items.map(item => (
                   <div key={item.id} className={`${item.color} w-full rounded-sm opacity-80 flex items-center justify-center text-bg-primary font-bold shadow-sm`} style={{ height: item.height }}>
                     {item.id}
                   </div>
                 ))}
              </div>
            </div>
            <p className="text-xs text-text-muted text-center">
              Rows have fixed height based on tallest item. <br/> Note the gaps!
            </p>
          </div>

          {/* Masonry (Simulated with columns) */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-mint-500 text-center uppercase">Masonry Layout</h4>
            <div className="bg-bg-primary border border-dashed border-border-light rounded-sm p-4 h-64 overflow-y-auto">
               {/* CSS Columns Implementation */}
              <div className="columns-2 gap-4 space-y-4">
                 {items.map(item => (
                   <div key={item.id} className={`${item.color} w-full rounded-sm break-inside-avoid flex items-center justify-center text-bg-primary font-bold shadow-sm`} style={{ height: item.height }}>
                     {item.id}
                   </div>
                 ))}
              </div>
            </div>
            <p className="text-xs text-text-muted text-center">
              Items stack compactly. <br/> No wasted vertical space.
            </p>
          </div>

        </div>
      </div>
    </TerminalCard>
  );
}
