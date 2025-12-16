'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { useTranslations } from 'next-intl';

export function PositionPlayground() {
  const t = useTranslations('Playground');
  const [position, setPosition] = useState<'static' | 'relative' | 'absolute' | 'fixed'>('static');
  const [top, setTop] = useState(20);
  const [left, setLeft] = useState(20);

  return (
    <TerminalCard title={t('positionTitle')} command={t('positionCommand')} className="my-8">
      <div className="flex flex-col gap-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-bg-secondary border border-border-medium rounded-sm">
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">position</label>
            <select 
              value={position}
              onChange={(e) => setPosition(e.target.value as any)}
              className="w-full bg-bg-primary border border-border-medium text-sm text-text-primary p-2 focus:border-mint-500 focus:outline-none rounded-sm"
            >
              <option value="static">static</option>
              <option value="relative">relative</option>
              <option value="absolute">absolute</option>
              <option value="fixed">fixed</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">top (px)</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={top}
              disabled={position === 'static'}
              onChange={(e) => setTop(Number(e.target.value))}
              className="w-full accent-mint-500 disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">left (px)</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={left}
              disabled={position === 'static'}
              onChange={(e) => setLeft(Number(e.target.value))}
              className="w-full accent-mint-500 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Preview Area */}
        <div className="h-64 bg-bg-primary border border-dashed border-border-light rounded-sm relative overflow-hidden p-4">
          <div className="text-xs text-text-muted absolute top-2 left-2">Container (relative)</div>
          
          {/* Reference Boxes to show flow */}
          <div className="grid grid-cols-3 gap-4 opacity-30">
            <div className="h-16 bg-text-muted rounded-sm flex items-center justify-center">1</div>
            <div className="h-16 bg-text-muted rounded-sm flex items-center justify-center">2 (Target)</div>
            <div className="h-16 bg-text-muted rounded-sm flex items-center justify-center">3</div>
            <div className="h-16 bg-text-muted rounded-sm flex items-center justify-center">4</div>
          </div>

          {/* The Target Box */}
          <motion.div
            layout
            className="w-16 h-16 bg-mint-500 flex items-center justify-center text-bg-primary font-bold shadow-lg z-10"
            style={{
              position: position,
              top: position === 'static' ? 'auto' : top,
              left: position === 'static' ? 'auto' : left,
              // If static, we force it to align with the "2" placeholder conceptually for demo
              // But strictly speaking, static means it flows. 
              // To make the demo clear, we put it "over" the placeholder 2 initially if we could, 
              // but for simplicity let's just use absolute positioning logic for the demo visual 
              // unless it is static, where we might just let it sit.
              // Actually, simplified:
              ...(position === 'static' ? { 
                 position: 'absolute', top: '16px', left: 'calc(33.33% + 16px)' // Fake static position matching the grid above
              } : {}) 
            }}
          >
            Me
          </motion.div>
          
          {position === 'fixed' && (
             <div className="absolute bottom-2 right-2 text-xs text-accent-pink animate-pulse">
               Note: Fixed is relative to viewport, not this container!
             </div>
          )}
        </div>

        {/* CSS Output */}
        <div className="bg-bg-primary p-4 border border-border-medium font-mono text-sm">
          <div className="text-text-muted mb-2">{t('cssOutput')}</div>
          <div className="text-accent-purple">.box <span className="text-text-primary">{`{`}</span></div>
          <div className="pl-4 text-text-primary">
            <span className="text-accent-pink">position</span>: <span className="text-mint-500">{position}</span>;
          </div>
          {position !== 'static' && (
            <>
              <div className="pl-4 text-text-primary">
                <span className="text-accent-pink">top</span>: <span className="text-mint-500">{top}px</span>;
              </div>
              <div className="pl-4 text-text-primary">
                <span className="text-accent-pink">left</span>: <span className="text-mint-500">{left}px</span>;
              </div>
            </>
          )}
          <div className="text-text-primary">{'}'}</div>
        </div>
      </div>
    </TerminalCard>
  );
}
