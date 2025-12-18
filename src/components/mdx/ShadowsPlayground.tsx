'use client';

import { useState } from 'react';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { useTranslations } from 'next-intl';

export function ShadowsPlayground() {
  const t = useTranslations('Playground');
  
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(4);
  const [blur, setBlur] = useState(10);
  const [spread, setSpread] = useState(0);
  const [opacity, setOpacity] = useState(0.2);

  const shadowString = `${offsetX}px ${offsetY}px ${blur}px ${spread}px rgba(0, 255, 204, ${opacity})`;

  return (
    <TerminalCard title={t('shadowsTitle')} command={t('shadowsCommand')} className="my-8">
      <div className="flex flex-col gap-6">
        
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-bg-secondary border border-border-medium rounded-sm">
          
          {/* Offset X */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-muted font-bold uppercase">
              <label>Offset X</label>
              <span>{offsetX}px</span>
            </div>
            <input 
              type="range" 
              min="-50" 
              max="50" 
              value={offsetX}
              onChange={(e) => setOffsetX(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
          </div>

          {/* Offset Y */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-muted font-bold uppercase">
              <label>Offset Y</label>
              <span>{offsetY}px</span>
            </div>
            <input 
              type="range" 
              min="-50" 
              max="50" 
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
          </div>

          {/* Blur Radius */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-muted font-bold uppercase">
              <label>Blur Radius</label>
              <span>{blur}px</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
          </div>

          {/* Spread Radius */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-muted font-bold uppercase">
              <label>Spread Radius</label>
              <span>{spread}px</span>
            </div>
            <input 
              type="range" 
              min="-50" 
              max="50" 
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
          </div>

           {/* Opacity */}
           <div className="space-y-2 col-span-1 md:col-span-2">
            <div className="flex justify-between text-xs text-text-muted font-bold uppercase">
              <label>Shadow Opacity</label>
              <span>{Math.round(opacity * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-mint-500"
            />
          </div>

        </div>

        {/* Preview Area */}
        <div className="p-12 bg-bg-primary border border-dashed border-border-light rounded-sm min-h-[300px] flex items-center justify-center">
          <div 
            className="w-32 h-32 bg-bg-card border border-border-medium rounded-xl flex items-center justify-center text-text-primary font-bold transition-all duration-300"
            style={{
              boxShadow: shadowString,
            }}
          >
            Card
          </div>
        </div>

        {/* CSS Output */}
        <div className="p-4 bg-bg-secondary border border-border-medium rounded-sm font-mono text-xs">
          <div className="text-text-muted mb-2">{t('cssOutput')}</div>
          <div className="text-accent-pink">.card <span className="text-text-primary">{`{`}</span></div>
          <div className="pl-4 text-text-primary">
            box-shadow: <span className="text-mint-500">{shadowString}</span>;
          </div>
          <div className="text-accent-pink"><span className="text-text-primary">{`}`}</span></div>
        </div>

      </div>
    </TerminalCard>
  );
}
