'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { useTranslations } from 'next-intl';

const flexDirectionOptions = ['row', 'row-reverse', 'column', 'column-reverse'];
const justifyContentOptions = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'];
const alignItemsOptions = ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'];

export function FlexPlayground() {
  const t = useTranslations('Playground');
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('center');
  const [alignItems, setAlignItems] = useState('center');

  return (
    <TerminalCard title={t('flexboxTitle')} command={t('flexboxCommand')} className="my-8">
      <div className="flex flex-col gap-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-bg-secondary border border-border-medium rounded-sm">
          {/* Flex Direction */}
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">flex-direction</label>
            <select 
              value={flexDirection}
              onChange={(e) => setFlexDirection(e.target.value)}
              className="w-full bg-bg-primary border border-border-medium text-sm text-text-primary p-2 focus:border-mint-500 focus:outline-none rounded-sm"
            >
              {flexDirectionOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Justify Content */}
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">justify-content</label>
            <select 
              value={justifyContent}
              onChange={(e) => setJustifyContent(e.target.value)}
              className="w-full bg-bg-primary border border-border-medium text-sm text-text-primary p-2 focus:border-mint-500 focus:outline-none rounded-sm"
            >
              {justifyContentOptions.map(opt => (
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
        </div>

        {/* Preview Area */}
        <div 
          className="h-64 bg-bg-primary border border-dashed border-border-light rounded-sm relative overflow-hidden transition-all duration-300"
          style={{
            display: 'flex',
            flexDirection: flexDirection as any,
            justifyContent: justifyContent,
            alignItems: alignItems,
          }}
        >
          {/* Items */}
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              layout
              className="w-16 h-16 bg-mint-500/20 border border-mint-500 flex items-center justify-center text-mint-500 font-bold text-xl shadow-[0_0_15px_rgba(0,255,204,0.1)]"
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
            <span className="text-accent-pink">display</span>: <span className="text-mint-500">flex</span>;
          </div>
          <div className="pl-4 text-text-primary">
            <span className="text-accent-pink">flex-direction</span>: <span className="text-mint-500">{flexDirection}</span>;
          </div>
          <div className="pl-4 text-text-primary">
            <span className="text-accent-pink">justify-content</span>: <span className="text-mint-500">{justifyContent}</span>;
          </div>
          <div className="pl-4 text-text-primary">
            <span className="text-accent-pink">align-items</span>: <span className="text-mint-500">{alignItems}</span>;
          </div>
          <div className="text-text-primary">{'}'}</div>
        </div>
      </div>
    </TerminalCard>
  );
}
