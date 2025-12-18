'use client';

import { useState } from 'react';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { useTranslations } from 'next-intl';

export function TypographyPlayground() {
  const t = useTranslations('Playground');
  
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontWeight, setFontWeight] = useState(400);
  const [letterSpacing, setLetterSpacing] = useState(0);

  return (
    <TerminalCard title={t('typographyTitle')} command={t('typographyCommand')} className="my-8">
      <div className="flex flex-col gap-6">
        
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-bg-secondary border border-border-medium rounded-sm">
          
          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-muted font-bold uppercase">
              <label>font-size</label>
              <span>{fontSize}px</span>
            </div>
            <input 
              type="range" 
              min="12" 
              max="32" 
              step="1"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
          </div>

          {/* Line Height */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-muted font-bold uppercase">
              <label>line-height</label>
              <span>{lineHeight}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="2.5" 
              step="0.1"
              value={lineHeight}
              onChange={(e) => setLineHeight(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
          </div>

          {/* Font Weight */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-muted font-bold uppercase">
              <label>font-weight</label>
              <span>{fontWeight}</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="900" 
              step="100"
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
          </div>

          {/* Letter Spacing */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-muted font-bold uppercase">
              <label>letter-spacing</label>
              <span>{letterSpacing}em</span>
            </div>
            <input 
              type="range" 
              min="-0.05" 
              max="0.5" 
              step="0.01"
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
          </div>

        </div>

        {/* Preview Area */}
        <div className="p-6 bg-bg-primary border border-dashed border-border-light rounded-sm min-h-[200px] flex items-center justify-center">
          <div 
            className="text-text-primary transition-all duration-300"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
              fontWeight: fontWeight,
              letterSpacing: `${letterSpacing}em`,
            }}
          >
            <h3 className="mb-2 font-bold text-mint-500">Quick Brown Fox</h3>
            <p>
              Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.
            </p>
          </div>
        </div>

        {/* CSS Output */}
        <div className="p-4 bg-bg-secondary border border-border-medium rounded-sm font-mono text-xs">
          <div className="text-text-muted mb-2">{t('cssOutput')}</div>
          <div className="text-accent-pink">.text-sample <span className="text-text-primary">{`{`}</span></div>
          <div className="pl-4 text-text-primary">
            font-size: <span className="text-mint-500">{fontSize}px</span>;
          </div>
          <div className="pl-4 text-text-primary">
            line-height: <span className="text-mint-500">{lineHeight}</span>;
          </div>
          <div className="pl-4 text-text-primary">
            font-weight: <span className="text-mint-500">{fontWeight}</span>;
          </div>
          <div className="pl-4 text-text-primary">
            letter-spacing: <span className="text-mint-500">{letterSpacing}em</span>;
          </div>
          <div className="text-accent-pink"><span className="text-text-primary">{`}`}</span></div>
        </div>

      </div>
    </TerminalCard>
  );
}
