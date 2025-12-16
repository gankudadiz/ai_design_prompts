'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { useTranslations } from 'next-intl';

export function BoxModelPlayground() {
  const t = useTranslations('Playground');
  const [boxSizing, setBoxSizing] = useState<'content-box' | 'border-box'>('content-box');
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(5);

  const width = 200; // Fixed width for demo
  
  // Calculate total width
  const totalWidth = boxSizing === 'content-box' 
    ? width + (padding * 2) + (border * 2)
    : width;

  const contentWidth = boxSizing === 'border-box'
    ? width - (padding * 2) - (border * 2)
    : width;

  return (
    <TerminalCard title={t('boxModelTitle')} command={t('boxModelCommand')} className="my-8">
      <div className="flex flex-col gap-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-bg-secondary border border-border-medium rounded-sm">
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">box-sizing</label>
            <select 
              value={boxSizing}
              onChange={(e) => setBoxSizing(e.target.value as any)}
              className="w-full bg-bg-primary border border-border-medium text-sm text-text-primary p-2 focus:border-mint-500 focus:outline-none rounded-sm"
            >
              <option value="content-box">content-box (Standard)</option>
              <option value="border-box">border-box (Modern)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">padding (px)</label>
            <input 
              type="range" 
              min="0" 
              max="40" 
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
            <div className="text-right text-xs text-text-muted">{padding}px</div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">border (px)</label>
            <input 
              type="range" 
              min="0" 
              max="20" 
              value={border}
              onChange={(e) => setBorder(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
            <div className="text-right text-xs text-text-muted">{border}px</div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="h-80 bg-bg-primary border border-dashed border-border-light rounded-sm relative flex items-center justify-center overflow-hidden">
          
          {/* The Box */}
          <motion.div
            layout
            className="relative bg-accent-pink/20"
            style={{
              width: width,
              height: width, // Square for simplicity
              padding: padding,
              borderWidth: border,
              borderStyle: 'solid',
              borderColor: '#00ffcc', // Mint
              boxSizing: boxSizing,
            }}
          >
            {/* Content Area visualization */}
            <div className="w-full h-full bg-accent-purple/30 flex items-center justify-center text-xs text-text-primary relative">
              <div className="text-center">
                <div className="font-bold">Content</div>
                <div>{contentWidth} x {contentWidth}</div>
              </div>
              
              {/* Labels */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                 {/* Padding Label */}
                 {padding > 0 && (
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-accent-pink text-xs whitespace-nowrap">
                     Padding: {padding}px
                   </div>
                 )}
                 {/* Border Label */}
                 {border > 0 && (
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-mint-500 text-xs whitespace-nowrap">
                     Border: {border}px
                   </div>
                 )}
              </div>
            </div>
          </motion.div>

          {/* Dimension Lines */}
          <div className="absolute bottom-4 text-text-muted text-xs">
            Total Width: <span className="text-white font-bold">{totalWidth}px</span>
          </div>
        </div>

        {/* CSS Output */}
        <div className="bg-bg-primary p-4 border border-border-medium font-mono text-sm">
          <div className="text-text-muted mb-2">{t('cssOutput')}</div>
          <div className="text-accent-purple">.box <span className="text-text-primary">{`{`}</span></div>
          <div className="pl-4 text-text-primary">
            <span className="text-accent-pink">box-sizing</span>: <span className="text-mint-500">{boxSizing}</span>;
          </div>
          <div className="pl-4 text-text-primary">
            <span className="text-accent-pink">width</span>: <span className="text-mint-500">{width}px</span>;
          </div>
          <div className="pl-4 text-text-primary">
            <span className="text-accent-pink">padding</span>: <span className="text-mint-500">{padding}px</span>;
          </div>
          <div className="pl-4 text-text-primary">
            <span className="text-accent-pink">border</span>: <span className="text-mint-500">{border}px solid #00ffcc</span>;
          </div>
          <div className="text-text-primary">{'}'}</div>
        </div>
      </div>
    </TerminalCard>
  );
}
