'use client';

import { useState } from 'react';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { useTranslations } from 'next-intl';

export function SpacingPlayground() {
  const t = useTranslations('Playground');
  
  const [padding, setPadding] = useState(24);
  const [margin, setMargin] = useState(24);
  const [gap, setGap] = useState(16);

  return (
    <TerminalCard title={t('spacingTitle')} command={t('spacingCommand')} className="my-8">
      <div className="flex flex-col gap-6">
        
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-bg-secondary border border-border-medium rounded-sm">
          
          {/* Padding */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-muted font-bold uppercase">
              <label>Padding (Green)</label>
              <span>{padding}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="64" 
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
          </div>

          {/* Margin */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-muted font-bold uppercase">
              <label>Margin (Orange)</label>
              <span>{margin}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="64" 
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
          </div>

          {/* Gap */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-muted font-bold uppercase">
              <label>Gap (Purple)</label>
              <span>{gap}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="64" 
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
          </div>

        </div>

        {/* Preview Area */}
        <div className="p-6 bg-bg-primary border border-dashed border-border-light rounded-sm min-h-[300px] flex items-center justify-center overflow-hidden">
          
          <div className="flex flex-col bg-bg-secondary/30 p-4 border border-border-light rounded">
            <div className="text-xs text-text-muted mb-2 text-center">Container</div>
            
            <div 
              className="flex bg-accent-purple/20 border border-accent-purple border-dashed transition-all duration-300"
              style={{ gap: `${gap}px` }}
            >
              {/* Item 1 */}
              <div 
                className="bg-accent-orange/20 border border-accent-orange relative transition-all duration-300"
                style={{ margin: `${margin}px` }}
              >
                <div 
                  className="bg-mint-500/20 border border-mint-500 p-4 transition-all duration-300"
                  style={{ padding: `${padding}px` }}
                >
                  <div className="bg-bg-card px-4 py-2 text-text-primary text-sm whitespace-nowrap">
                    Item 1
                  </div>
                </div>
                {/* Margin Label */}
                <div className="absolute top-0 left-0 text-[10px] text-accent-orange p-0.5">M</div>
                {/* Padding Label */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] text-mint-500 z-10 pointer-events-none">P</div>
              </div>

              {/* Item 2 */}
              <div 
                className="bg-accent-orange/20 border border-accent-orange relative transition-all duration-300"
                style={{ margin: `${margin}px` }}
              >
                <div 
                  className="bg-mint-500/20 border border-mint-500 p-4 transition-all duration-300"
                  style={{ padding: `${padding}px` }}
                >
                   <div className="bg-bg-card px-4 py-2 text-text-primary text-sm whitespace-nowrap">
                    Item 2
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* CSS Output */}
        <div className="p-4 bg-bg-secondary border border-border-medium rounded-sm font-mono text-xs">
          <div className="text-text-muted mb-2">{t('cssOutput')}</div>
          
          <div className="mb-2">
            <div className="text-accent-purple">.container <span className="text-text-primary">{`{`}</span></div>
            <div className="pl-4 text-text-primary">
              display: <span className="text-mint-500">flex</span>;
            </div>
            <div className="pl-4 text-text-primary">
              gap: <span className="text-mint-500">{gap}px</span>;
            </div>
            <div className="text-accent-purple"><span className="text-text-primary">{`}`}</span></div>
          </div>

          <div>
            <div className="text-accent-orange">.item <span className="text-text-primary">{`{`}</span></div>
            <div className="pl-4 text-text-primary">
              margin: <span className="text-mint-500">{margin}px</span>;
            </div>
            <div className="pl-4 text-text-primary">
              padding: <span className="text-mint-500">{padding}px</span>;
            </div>
            <div className="text-accent-orange"><span className="text-text-primary">{`}`}</span></div>
          </div>

        </div>

      </div>
    </TerminalCard>
  );
}
