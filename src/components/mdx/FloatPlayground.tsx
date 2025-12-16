'use client';

import { useState } from 'react';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { useTranslations } from 'next-intl';

export function FloatPlayground() {
  const t = useTranslations('Playground');
  const [floatValue, setFloatValue] = useState<'none' | 'left' | 'right'>('none');
  const [isClearfix, setIsClearfix] = useState(false);

  return (
    <TerminalCard title={t('floatTitle')} command={t('floatCommand')} className="my-8">
      <div className="flex flex-col gap-6">
        {/* Controls */}
        <div className="p-4 bg-bg-secondary border border-border-medium rounded-sm grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">float (Image)</label>
            <div className="flex flex-wrap gap-2">
              {['none', 'left', 'right'].map((val) => (
                <button
                  key={val}
                  onClick={() => setFloatValue(val as any)}
                  className={`px-3 py-1.5 text-xs font-mono border rounded-sm transition-colors ${
                    floatValue === val
                      ? 'bg-mint-500/20 text-mint-500 border-mint-500'
                      : 'bg-bg-primary text-text-secondary border-border-medium hover:border-text-muted'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-text-muted font-bold uppercase">Parent Fix</label>
            <div className="flex items-center gap-2">
               <input 
                  type="checkbox" 
                  id="clearfix"
                  checked={isClearfix}
                  onChange={(e) => setIsClearfix(e.target.checked)}
                  className="accent-mint-500 w-4 h-4"
                />
               <label htmlFor="clearfix" className="text-sm text-text-primary cursor-pointer select-none">
                 Apply .clearfix
               </label>
            </div>
            <p className="text-[10px] text-text-muted">
              Fixes parent height collapse when children float.
            </p>
          </div>
        </div>

        {/* Preview Area */}
        <div className="bg-bg-primary border border-dashed border-border-light rounded-sm relative overflow-hidden p-6">
          
          <div className="text-sm text-text-muted mb-2">
             {/* Container context */}
             &lt;div class="container{isClearfix ? ' clearfix' : ''}"&gt;
          </div>

          {/* The Container */}
          <div 
            className={`border-2 border-accent-purple/50 bg-accent-purple/5 p-4 transition-all duration-300 ${
              // We simulate clearfix behavior manually for the React demo if needed, 
              // or rely on the actual CSS technique if we were using real CSS classes.
              // Here we'll use 'flow-root' or similar to mimic 'clearfix' for the demo container itself
              // BUT to demonstrate the bug, we need to let it collapse when isClearfix is false.
              ''
            }`}
            style={{
              // If clearfix is true, we force the container to contain floats (BFC)
              // If false, normal block behavior (ignores floats)
              display: isClearfix ? 'flow-root' : 'block',
              minHeight: isClearfix ? 'auto' : '0', // Allow collapse
            }}
          >
             {/* The Floated Element */}
             <div 
                className="w-24 h-24 bg-mint-500 text-bg-primary flex items-center justify-center font-bold text-xs shadow-lg transition-all duration-300 mb-2"
                style={{
                  float: floatValue,
                  margin: floatValue === 'left' ? '0 16px 16px 0' : floatValue === 'right' ? '0 0 16px 16px' : '0 0 16px 0'
                }}
             >
               IMG
             </div>

             {/* The Text Content */}
             <p className="text-sm text-text-secondary leading-relaxed text-justify">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
               Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
             </p>
             
             {/* Visualizing the "End of Container" to show collapse */}
             <div className="w-full h-px bg-accent-purple mt-2 relative">
                <span className="absolute right-0 -top-2 text-[10px] text-accent-purple bg-bg-primary px-1">Container Bottom</span>
             </div>
          </div>

          <div className="text-sm text-text-muted mt-2">
             &lt;/div&gt;
          </div>
          
          {/* Collapse Warning */}
          {!isClearfix && floatValue !== 'none' && (
            <div className="mt-4 p-3 bg-accent-red/10 border border-accent-red/30 rounded text-xs text-accent-red flex items-center gap-2">
              ⚠️ <strong>Warning:</strong> Parent height collapsed! The purple border doesn't wrap the green box.
            </div>
          )}
          
          {isClearfix && floatValue !== 'none' && (
            <div className="mt-4 p-3 bg-mint-500/10 border border-mint-500/30 rounded text-xs text-mint-500 flex items-center gap-2">
              ✅ <strong>Fixed:</strong> Clearfix forced the parent to expand and contain the floated element.
            </div>
          )}

        </div>

        {/* CSS Code Snippet */}
        <div className="p-4 bg-bg-secondary border border-border-medium rounded-sm font-mono text-xs">
          <div className="text-text-muted mb-2">{t('cssOutput')}</div>
          
          <div className="mb-2">
            <span className="text-accent-pink">.img</span> <span className="text-text-primary">{`{`}</span>
          </div>
          <div className="pl-4 text-text-primary">
            float: <span className="text-accent-yellow">{floatValue}</span>;
          </div>
          <div className="text-accent-pink">
            <span className="text-text-primary">{`}`}</span>
          </div>

          {isClearfix && (
            <>
              <div className="mt-4 mb-2">
                <span className="text-accent-pink">.clearfix::after</span> <span className="text-text-primary">{`{`}</span>
              </div>
              <div className="pl-4 text-text-primary">
                content: <span className="text-accent-yellow">""</span>;
              </div>
              <div className="pl-4 text-text-primary">
                display: <span className="text-accent-yellow">table</span>;
              </div>
              <div className="pl-4 text-text-primary">
                clear: <span className="text-accent-yellow">both</span>;
              </div>
              <div className="text-accent-pink">
                <span className="text-text-primary">{`}`}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </TerminalCard>
  );
}
