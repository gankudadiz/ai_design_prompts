'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { useTranslations } from 'next-intl';

const gridTemplateColumnsOptions = [
  'repeat(3, 1fr)',
  'repeat(2, 1fr)',
  '1fr 2fr 1fr',
  '100px 1fr 100px',
  'repeat(auto-fit, minmax(100px, 1fr))'
];

const gapOptions = ['0', '10px', '20px', '1rem', '2rem'];
const alignItemsOptions = ['start', 'end', 'center', 'stretch'];
const justifyItemsOptions = ['start', 'end', 'center', 'stretch'];

export function GridPlayground() {
  const t = useTranslations('Playground');
  const [gridTemplateColumns, setGridTemplateColumns] = useState('repeat(3, 1fr)');
  const [gap, setGap] = useState('10px');
  const [alignItems, setAlignItems] = useState('stretch');
  const [justifyItems, setJustifyItems] = useState('stretch');

  return (
    <TerminalCard title={t('gridTitle')} command={t('gridCommand')} className="my-8">
      <div className="flex flex-col gap-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-bg-secondary border border-border-medium rounded-sm">
          {/* Grid Template Columns */}
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">grid-template-columns</label>
            <select 
              value={gridTemplateColumns}
              onChange={(e) => setGridTemplateColumns(e.target.value)}
              className="w-full bg-bg-primary border border-border-medium text-sm text-text-primary p-2 focus:border-mint-500 focus:outline-none rounded-sm"
            >
              {gridTemplateColumnsOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Gap */}
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">gap</label>
            <select 
              value={gap}
              onChange={(e) => setGap(e.target.value)}
              className="w-full bg-bg-primary border border-border-medium text-sm text-text-primary p-2 focus:border-mint-500 focus:outline-none rounded-sm"
            >
              {gapOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Align Items */}
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">align-items</label>
            <select 
              value={alignItems}
              onChange={(e) => setAlignItems(e.target.value)}
              className="w-full bg-bg-primary border border-border-medium text-sm text-text-primary p-2 focus:border-mint-500 focus:outline-none rounded-sm"
            >
              {alignItemsOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Justify Items */}
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">justify-items</label>
            <select 
              value={justifyItems}
              onChange={(e) => setJustifyItems(e.target.value)}
              className="w-full bg-bg-primary border border-border-medium text-sm text-text-primary p-2 focus:border-mint-500 focus:outline-none rounded-sm"
            >
              {justifyItemsOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Preview Area */}
        <div 
          className="min-h-64 bg-bg-primary border border-dashed border-border-light rounded-sm relative overflow-hidden transition-all duration-300 p-4"
          style={{
            display: 'grid',
            gridTemplateColumns: gridTemplateColumns,
            gap: gap,
            alignItems: alignItems,
            justifyItems: justifyItems,
          }}
        >
          {/* Items */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              layout
              className="min-h-[64px] min-w-[64px] bg-mint-500/20 border border-mint-500 flex items-center justify-center text-mint-500 font-bold text-xl shadow-[0_0_15px_rgba(0,255,204,0.1)]"
            >
              {item}
            </motion.div>
          ))}
        </div>

        {/* CSS Output */}
        <div className="bg-bg-primary p-4 border border-border-medium font-mono text-sm">
          <div className="text-text-muted mb-2">{t('cssOutput')}</div>
          <div className="text-accent-purple">.container <span className="text-text-primary">{`{`}</span></div>
          <div className="pl-4 text-text-primary">
            <span className="text-accent-pink">display</span>: <span className="text-mint-500">grid</span>;
          </div>
          <div className="pl-4 text-text-primary">
            <span className="text-accent-pink">grid-template-columns</span>: <span className="text-mint-500">{gridTemplateColumns}</span>;
          </div>
          <div className="pl-4 text-text-primary">
            <span className="text-accent-pink">gap</span>: <span className="text-mint-500">{gap}</span>;
          </div>
          <div className="pl-4 text-text-primary">
            <span className="text-accent-pink">align-items</span>: <span className="text-mint-500">{alignItems}</span>;
          </div>
          <div className="pl-4 text-text-primary">
            <span className="text-accent-pink">justify-items</span>: <span className="text-mint-500">{justifyItems}</span>;
          </div>
          <div className="text-text-primary">{'}'}</div>
        </div>
      </div>
    </TerminalCard>
  );
}
