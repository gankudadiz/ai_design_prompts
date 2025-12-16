'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { TerminalCard } from '@/components/ui/TerminalCard';

type Harmony = 'monochromatic' | 'analogous' | 'complementary' | 'triadic';

export function ColorPalettePlayground() {
  const t = useTranslations('Playground');
  const [hue, setHue] = useState(200);
  const [saturation, setSaturation] = useState(80);
  const [lightness, setLightness] = useState(50);
  const [harmony, setHarmony] = useState<Harmony>('complementary');

  // Helper to normalize hue to 0-360
  const normalizeHue = (h: number) => (h % 360 + 360) % 360;

  // Generate colors based on harmony
  const getColors = () => {
    const baseColor = { h: hue, s: saturation, l: lightness };
    
    switch (harmony) {
      case 'monochromatic':
        return [
          { ...baseColor, l: Math.max(10, lightness - 30) },
          { ...baseColor, l: Math.max(10, lightness - 15) },
          baseColor,
          { ...baseColor, l: Math.min(95, lightness + 15) },
          { ...baseColor, l: Math.min(95, lightness + 30) },
        ];
      case 'analogous':
        return [
          { ...baseColor, h: normalizeHue(hue - 30) },
          { ...baseColor, h: normalizeHue(hue - 15) },
          baseColor,
          { ...baseColor, h: normalizeHue(hue + 15) },
          { ...baseColor, h: normalizeHue(hue + 30) },
        ];
      case 'complementary':
        return [
          baseColor,
          { ...baseColor, h: normalizeHue(hue + 180) },
        ];
      case 'triadic':
        return [
          baseColor,
          { ...baseColor, h: normalizeHue(hue + 120) },
          { ...baseColor, h: normalizeHue(hue + 240) },
        ];
      default:
        return [baseColor];
    }
  };

  const colors = getColors();

  const hslString = (c: { h: number, s: number, l: number }) => `hsl(${Math.round(c.h)}, ${c.s}%, ${c.l}%)`;

  return (
    <TerminalCard title={t('colorPaletteTitle')} command={t('colorPaletteCommand')} className="my-8">
      <div className="flex flex-col gap-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-bg-secondary border border-border-medium rounded-sm">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-text-muted font-bold uppercase flex justify-between">
                <span>Hue</span>
                <span>{hue}°</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={hue}
                onChange={(e) => setHue(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)'
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-text-muted font-bold uppercase flex justify-between">
                <span>Saturation</span>
                <span>{saturation}%</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="w-full accent-mint-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-text-muted font-bold uppercase flex justify-between">
                <span>Lightness</span>
                <span>{lightness}%</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={lightness}
                onChange={(e) => setLightness(Number(e.target.value))}
                className="w-full accent-mint-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">Harmony Rule</label>
            <div className="grid grid-cols-2 gap-2">
              {(['monochromatic', 'analogous', 'complementary', 'triadic'] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setHarmony(h)}
                  className={`px-3 py-2 text-xs rounded-sm border transition-colors capitalize ${
                    harmony === h 
                      ? 'bg-mint-500/20 border-mint-500 text-mint-500' 
                      : 'bg-bg-primary border-border-medium text-text-muted hover:border-text-muted'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="space-y-4">
          {/* Color Swatches */}
          <div className="h-32 flex rounded-sm overflow-hidden border border-border-light">
            {colors.map((c, i) => (
              <motion.div
                key={i}
                layout
                className="flex-1 flex flex-col items-center justify-center relative group"
                style={{ backgroundColor: hslString(c) }}
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                  {hslString(c)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* UI Preview */}
          <div className="bg-bg-primary p-4 border border-border-medium rounded-sm">
            <div className="text-xs text-text-muted mb-3 uppercase font-bold">UI Application Preview</div>
            
            <div className="flex gap-4 items-start">
              {/* Card mimicking the palette */}
              <div 
                className="flex-1 p-4 rounded-lg shadow-lg"
                style={{ 
                  backgroundColor: hslString(colors[0]), // Base color as background
                  color: lightness > 60 ? '#000' : '#fff' // Contrast text
                }}
              >
                <div className="font-bold text-lg mb-2">Card Title</div>
                <div className="text-sm opacity-80 mb-4">
                  This is how your primary color looks as a card background.
                </div>
                <button 
                  className="px-4 py-2 rounded text-sm font-bold shadow-sm"
                  style={{
                    backgroundColor: colors[1] ? hslString(colors[1]) : '#fff', // Secondary color for button
                    color: colors[1] && colors[1].l > 60 ? '#000' : '#fff'
                  }}
                >
                  Action Button
                </button>
              </div>

              {/* Another element */}
               <div 
                className="flex-1 p-4 rounded-lg border-2"
                style={{ 
                  borderColor: hslString(colors[0]),
                  backgroundColor: 'transparent'
                }}
              >
                <div className="font-bold text-lg mb-2" style={{ color: hslString(colors[0]) }}>Outlined Card</div>
                 <div className="text-sm text-text-muted mb-4">
                  Using the color for borders and text accents.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Output */}
        <div className="bg-bg-primary p-4 border border-border-medium font-mono text-sm overflow-x-auto">
          <div className="text-text-muted mb-2">{t('cssOutput')}</div>
          <div className="text-accent-purple">:root <span className="text-text-primary">{`{`}</span></div>
          {colors.map((c, i) => (
             <div key={i} className="pl-4 text-text-primary">
               <span className="text-accent-pink">--color-{i + 1}</span>: <span className="text-mint-500">{hslString(c)}</span>;
             </div>
          ))}
          <div className="text-text-primary">{'}'}</div>
        </div>
      </div>
    </TerminalCard>
  );
}
