'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { useTranslations } from 'next-intl';

export function ZIndexPlayground() {
  const t = useTranslations('Playground');
  const [zIndex1, setZIndex1] = useState(1);
  const [zIndex2, setZIndex2] = useState(2);
  const [zIndex3, setZIndex3] = useState(3);

  return (
    <TerminalCard title={t('zIndexTitle')} command={t('zIndexCommand')} className="my-8">
      <div className="flex flex-col gap-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-bg-secondary border border-border-medium rounded-sm">
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase text-accent-pink">Pink Box Z-Index</label>
            <input 
              type="number" 
              value={zIndex1}
              onChange={(e) => setZIndex1(Number(e.target.value))}
              className="w-full bg-bg-primary border border-border-medium text-sm text-text-primary p-2 focus:border-mint-500 focus:outline-none rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase text-mint-500">Mint Box Z-Index</label>
            <input 
              type="number" 
              value={zIndex2}
              onChange={(e) => setZIndex2(Number(e.target.value))}
              className="w-full bg-bg-primary border border-border-medium text-sm text-text-primary p-2 focus:border-mint-500 focus:outline-none rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase text-accent-purple">Purple Box Z-Index</label>
            <input 
              type="number" 
              value={zIndex3}
              onChange={(e) => setZIndex3(Number(e.target.value))}
              className="w-full bg-bg-primary border border-border-medium text-sm text-text-primary p-2 focus:border-mint-500 focus:outline-none rounded-sm"
            />
          </div>
        </div>

        {/* Preview Area */}
        <div className="h-64 bg-bg-primary border border-dashed border-border-light rounded-sm relative flex items-center justify-center">
          
          <motion.div
            layout
            className="absolute w-32 h-32 bg-accent-pink shadow-lg flex items-start justify-start p-2 text-bg-primary font-bold border-2 border-white/20"
            style={{ 
              zIndex: zIndex1,
              x: -40,
              y: -40
            }}
          >
            Pink: {zIndex1}
          </motion.div>

          <motion.div
            layout
            className="absolute w-32 h-32 bg-mint-500 shadow-lg flex items-start justify-start p-2 text-bg-primary font-bold border-2 border-white/20"
            style={{ 
              zIndex: zIndex2,
              x: 0,
              y: 0
            }}
          >
            Mint: {zIndex2}
          </motion.div>

          <motion.div
            layout
            className="absolute w-32 h-32 bg-accent-purple shadow-lg flex items-start justify-start p-2 text-bg-primary font-bold border-2 border-white/20"
            style={{ 
              zIndex: zIndex3,
              x: 40,
              y: 40
            }}
          >
            Purple: {zIndex3}
          </motion.div>

        </div>
      </div>
    </TerminalCard>
  );
}
