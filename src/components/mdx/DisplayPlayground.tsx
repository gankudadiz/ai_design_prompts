'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { useTranslations } from 'next-intl';

export function DisplayPlayground() {
  const t = useTranslations('Playground');
  const [displayValue, setDisplayValue] = useState<'block' | 'inline' | 'inline-block' | 'none'>('block');

  return (
    <TerminalCard title={t('displayTitle')} command={t('displayCommand')} className="my-8">
      <div className="flex flex-col gap-6">
        {/* Controls */}
        <div className="p-4 bg-bg-secondary border border-border-medium rounded-sm">
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">display</label>
            <div className="flex flex-wrap gap-2">
              {['block', 'inline', 'inline-block', 'none'].map((val) => (
                <button
                  key={val}
                  onClick={() => setDisplayValue(val as any)}
                  className={`px-3 py-1.5 text-xs font-mono border rounded-sm transition-colors ${
                    displayValue === val
                      ? 'bg-mint-500/20 text-mint-500 border-mint-500'
                      : 'bg-bg-primary text-text-secondary border-border-medium hover:border-text-muted'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="p-6 bg-bg-primary border border-dashed border-border-light rounded-sm relative min-h-[200px] overflow-hidden">
          
          <div className="text-sm text-text-muted mb-4">
             {/* Container context */}
             &lt;div class="container"&gt;
          </div>

          <div className="bg-bg-secondary/50 p-4 rounded border border-border-light">
            {/* Box 1 */}
            <motion.div
              layout
              className={`bg-accent-blue/20 border border-accent-blue text-accent-blue p-2 mb-2 ${
                displayValue === 'inline' || displayValue === 'inline-block' ? 'mr-2' : ''
              }`}
              style={{
                display: displayValue === 'none' ? 'block' : displayValue, // Keep first box visible unless specific logic needed, but let's make them all follow the rule
                width: displayValue === 'block' ? '100%' : 'auto',
                // Inline elements ignore width/height usually, but for demo clarity we rely on natural content size or padding
              }}
            >
              <span className="font-bold">Box 1</span>
            </motion.div>

            {/* Box 2 (The one that changes) */}
            <motion.div
              layout
              className="bg-accent-pink/20 border border-accent-pink text-accent-pink p-2 mb-2"
              style={{
                display: displayValue,
                width: displayValue === 'block' ? '100%' : 'auto',
                marginRight: (displayValue === 'inline' || displayValue === 'inline-block') ? '8px' : 0
              }}
            >
               <span className="font-bold">Box 2 (Target)</span>
               {displayValue === 'block' && <span className="text-xs ml-2 opacity-70">- Full Width</span>}
               {displayValue === 'inline' && <span className="text-xs ml-2 opacity-70">- Inline Flow</span>}
            </motion.div>

            {/* Box 3 */}
            <motion.div
              layout
              className={`bg-accent-purple/20 border border-accent-purple text-accent-purple p-2 mb-2 ${
                 displayValue === 'inline' || displayValue === 'inline-block' ? '' : ''
              }`}
              style={{
                display: displayValue === 'none' ? 'block' : displayValue,
                 width: displayValue === 'block' ? '100%' : 'auto',
              }}
            >
              <span className="font-bold">Box 3</span>
            </motion.div>
          </div>

          <div className="text-sm text-text-muted mt-4">
             &lt;/div&gt;
          </div>

          {/* Explanation Overlay */}
          <div className="mt-4 p-3 bg-bg-secondary border border-border-medium rounded text-xs text-text-secondary">
            {displayValue === 'block' && (
              <p><strong>Block:</strong> 元素独占一行，默认宽度填满父容器。</p>
            )}
            {displayValue === 'inline' && (
              <p><strong>Inline:</strong> 元素在同一行排列，宽高设置无效，由内容撑开。</p>
            )}
            {displayValue === 'inline-block' && (
              <p><strong>Inline-Block:</strong> 既像 Inline 一样并排，又像 Block 一样可以设置宽高。</p>
            )}
            {displayValue === 'none' && (
              <p><strong>None:</strong> 元素完全从文档流中移除，不占据任何空间（Box 2 消失了）。</p>
            )}
          </div>

        </div>

        {/* CSS Code Snippet */}
        <div className="p-4 bg-bg-secondary border border-border-medium rounded-sm font-mono text-xs">
          <div className="text-text-muted mb-2">{t('cssOutput')}</div>
          <div className="text-accent-pink">
            .box-2 <span className="text-text-primary">{`{`}</span>
          </div>
          <div className="pl-4 text-text-primary">
            display: <span className="text-accent-yellow">{displayValue}</span>;
          </div>
          <div className="text-accent-pink">
            <span className="text-text-primary">{`}`}</span>
          </div>
        </div>
      </div>
    </TerminalCard>
  );
}
