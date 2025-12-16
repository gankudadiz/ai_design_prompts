'use client';

import { TerminalCard } from '@/components/ui/TerminalCard';
import { useTranslations } from 'next-intl';

type LayoutType = 
  | 'holy-grail' 
  | 'sidebar' 
  | 'sticky-footer' 
  | 'split-screen' 
  | 'card-grid'
  | 'bento-grid'
  | 'parallax'
  | 'hero'
  | 'fullscreen-slider'
  | 'zigzag'
  | 'sticky-sidebar'
  | 'centered-content'
  | 'media-object'
  | 'feature-list'
  | 'off-canvas';

interface LayoutPatternDemoProps {
  type: LayoutType;
}

export function LayoutPatternDemo({ type }: LayoutPatternDemoProps) {
  const t = useTranslations('Playground');

  const renderContent = () => {
    switch (type) {
      case 'holy-grail':
        return (
          <div className="flex flex-col h-64 w-full bg-bg-primary text-xs font-bold text-text-primary">
            <header className="h-10 bg-accent-pink/80 flex items-center justify-center border-b border-bg-primary">Header</header>
            <div className="flex flex-1 min-h-0">
              <nav className="w-16 bg-mint-500/80 flex items-center justify-center border-r border-bg-primary">Nav</nav>
              <main className="flex-1 bg-bg-secondary flex items-center justify-center">Main Content</main>
              <aside className="w-16 bg-accent-purple/80 flex items-center justify-center border-l border-bg-primary">Aside</aside>
            </div>
            <footer className="h-10 bg-text-muted/50 flex items-center justify-center border-t border-bg-primary">Footer</footer>
          </div>
        );
      case 'sidebar':
        return (
          <div className="flex h-64 w-full bg-bg-primary text-xs font-bold text-text-primary">
            <aside className="w-24 bg-mint-500/80 flex flex-col p-2 gap-2 border-r border-bg-primary">
              <div className="h-8 bg-bg-primary/20 rounded"></div>
              <div className="flex-1"></div>
              <div className="h-8 bg-bg-primary/20 rounded"></div>
            </aside>
            <div className="flex-1 flex flex-col">
              <header className="h-12 bg-bg-secondary border-b border-border-light flex items-center px-4">Header</header>
              <main className="flex-1 bg-bg-primary p-4 flex items-center justify-center text-text-muted">Main Content Area</main>
            </div>
          </div>
        );
      case 'sticky-footer':
        return (
          <div className="h-64 w-full bg-bg-primary overflow-y-auto flex flex-col relative border border-dashed border-border-light">
             <div className="absolute top-2 right-2 text-[10px] text-text-muted pointer-events-none">Scroll me!</div>
            <div className="flex flex-col min-h-[300px] w-full text-xs font-bold text-text-primary">
              <header className="h-10 bg-accent-pink/80 flex items-center justify-center shrink-0">Header</header>
              <main className="flex-1 bg-bg-secondary p-4 flex flex-col gap-4">
                 <div className="h-20 bg-bg-primary/50 rounded flex items-center justify-center">Short Content</div>
                 <div className="text-[10px] font-normal text-text-muted text-center">
                   (Even if content is short, footer stays at bottom if using min-height: 100vh technique. <br/>
                   Here we simulate scrolling to show structure.)
                 </div>
              </main>
              <footer className="h-12 bg-text-muted/50 flex items-center justify-center shrink-0 mt-auto">Sticky Footer</footer>
            </div>
          </div>
        );
      case 'split-screen':
        return (
          <div className="flex h-64 w-full bg-bg-primary text-xs font-bold">
            <div className="flex-1 bg-mint-500/20 flex flex-col items-center justify-center p-4 border-r border-border-light">
              <div className="w-12 h-12 bg-mint-500 rounded-full mb-2"></div>
              <div className="text-mint-500">Image / Visual</div>
            </div>
            <div className="flex-1 bg-bg-secondary flex flex-col items-center justify-center p-4">
              <div className="w-3/4 h-4 bg-text-primary/20 rounded mb-2"></div>
              <div className="w-1/2 h-3 bg-text-primary/10 rounded mb-4"></div>
              <div className="w-20 h-6 bg-accent-purple rounded text-white flex items-center justify-center text-[10px]">Action</div>
            </div>
          </div>
        );
      case 'card-grid':
        return (
          <div className="h-64 w-full bg-bg-primary p-4 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 text-xs font-bold text-text-primary">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-bg-secondary border border-border-light rounded flex flex-col p-2">
                  <div className="h-1/2 bg-accent-pink/20 rounded mb-2"></div>
                  <div className="h-3 w-3/4 bg-text-primary/20 rounded mb-1"></div>
                  <div className="h-2 w-1/2 bg-text-primary/10 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'bento-grid':
        return (
          <div className="h-64 w-full bg-bg-primary p-4 overflow-hidden flex items-center justify-center">
            <div className="grid grid-cols-4 grid-rows-3 gap-2 w-full h-full max-w-sm">
              <div className="col-span-2 row-span-2 bg-accent-purple/30 rounded-lg flex items-center justify-center text-xs font-bold text-accent-purple border border-accent-purple/20">Main Feature</div>
              <div className="col-span-1 row-span-1 bg-mint-500/30 rounded-lg border border-mint-500/20"></div>
              <div className="col-span-1 row-span-2 bg-accent-pink/30 rounded-lg border border-accent-pink/20"></div>
              <div className="col-span-1 row-span-1 bg-bg-secondary rounded-lg border border-border-light"></div>
              <div className="col-span-2 row-span-1 bg-bg-secondary rounded-lg border border-border-light flex items-center justify-center text-[10px] text-text-muted">Stats</div>
              <div className="col-span-2 row-span-1 bg-blue-500/20 rounded-lg border border-blue-500/20"></div>
            </div>
          </div>
        );
      case 'parallax':
        return (
          <div className="h-64 w-full bg-bg-primary overflow-y-auto relative perspective-1px overflow-x-hidden">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-20 text-6xl font-bold" style={{ transform: 'translateZ(-1px) scale(2)' }}>
              BACKGROUND
            </div>
            <div className="relative z-10 p-8 space-y-32">
              <div className="bg-bg-secondary/90 p-4 rounded shadow-lg border border-border-light backdrop-blur-sm">
                <h3 className="font-bold text-mint-500 mb-2">Foreground Layer</h3>
                <p className="text-xs text-text-muted">Scroll to see the parallax effect. The background text moves slower than this card.</p>
              </div>
              <div className="bg-bg-secondary/90 p-4 rounded shadow-lg border border-border-light backdrop-blur-sm">
                <h3 className="font-bold text-accent-pink mb-2">Another Card</h3>
                <p className="text-xs text-text-muted">Depth creates immersion.</p>
              </div>
            </div>
          </div>
        );
      case 'hero':
        return (
          <div className="h-64 w-full bg-bg-primary flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-mint-500/10 to-accent-purple/10"></div>
            <div className="relative z-10">
              <h1 className="text-2xl font-bold text-text-primary mb-2">Big Bold Hero</h1>
              <p className="text-xs text-text-secondary mb-4 max-w-[200px] mx-auto">This is the first thing users see. Make it count.</p>
              <div className="flex gap-2 justify-center">
                <button className="px-3 py-1 bg-mint-500 text-bg-primary text-xs font-bold rounded">Primary</button>
                <button className="px-3 py-1 border border-text-muted text-text-muted text-xs font-bold rounded">Secondary</button>
              </div>
            </div>
          </div>
        );
      case 'fullscreen-slider':
        return (
          <div className="h-64 w-full bg-bg-primary relative overflow-hidden flex">
            <div className="flex-1 bg-accent-purple/20 flex items-center justify-center border-r border-bg-primary">
              <span className="text-accent-purple font-bold">Slide 1</span>
            </div>
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
               <div className="w-2 h-2 rounded-full bg-text-primary"></div>
               <div className="w-2 h-2 rounded-full bg-text-muted/30"></div>
               <div className="w-2 h-2 rounded-full bg-text-muted/30"></div>
             </div>
             <div className="absolute top-1/2 left-2 -translate-y-1/2 w-6 h-6 rounded-full bg-bg-secondary/50 flex items-center justify-center text-xs">←</div>
             <div className="absolute top-1/2 right-2 -translate-y-1/2 w-6 h-6 rounded-full bg-bg-secondary/50 flex items-center justify-center text-xs">→</div>
          </div>
        );
      case 'zigzag':
        return (
          <div className="h-64 w-full bg-bg-primary p-4 overflow-y-auto space-y-4">
            <div className="flex gap-2 items-center">
              <div className="w-16 h-16 bg-mint-500/20 rounded flex-shrink-0"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 w-1/2 bg-text-primary/20 rounded"></div>
                <div className="h-2 w-full bg-text-muted/10 rounded"></div>
                <div className="h-2 w-3/4 bg-text-muted/10 rounded"></div>
              </div>
            </div>
             <div className="flex gap-2 items-center flex-row-reverse">
              <div className="w-16 h-16 bg-accent-pink/20 rounded flex-shrink-0"></div>
              <div className="flex-1 space-y-1 text-right">
                <div className="h-3 w-1/2 bg-text-primary/20 rounded ml-auto"></div>
                <div className="h-2 w-full bg-text-muted/10 rounded"></div>
                <div className="h-2 w-3/4 bg-text-muted/10 rounded ml-auto"></div>
              </div>
            </div>
             <div className="flex gap-2 items-center">
              <div className="w-16 h-16 bg-accent-purple/20 rounded flex-shrink-0"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 w-1/2 bg-text-primary/20 rounded"></div>
                <div className="h-2 w-full bg-text-muted/10 rounded"></div>
              </div>
            </div>
          </div>
        );
      case 'sticky-sidebar':
        return (
          <div className="h-64 w-full bg-bg-primary overflow-y-auto p-4 flex gap-4">
            <div className="w-2/3 space-y-4 pt-8">
              <div className="h-32 bg-bg-secondary rounded border border-border-light flex items-center justify-center text-xs text-text-muted">Long Content...</div>
              <div className="h-32 bg-bg-secondary rounded border border-border-light flex items-center justify-center text-xs text-text-muted">Keep Scrolling...</div>
              <div className="h-32 bg-bg-secondary rounded border border-border-light flex items-center justify-center text-xs text-text-muted">End</div>
            </div>
            <div className="w-1/3 relative">
               <div className="sticky top-0 p-2 bg-mint-500/10 border border-mint-500/30 rounded text-[10px] text-mint-500 font-bold">
                 I'm Sticky!
               </div>
            </div>
          </div>
        );
      case 'centered-content':
        return (
           <div className="h-64 w-full bg-bg-secondary flex items-center justify-center p-4">
             <div className="w-full max-w-[200px] bg-bg-primary p-4 rounded shadow-sm border border-border-light text-center">
               <h3 className="text-xs font-bold mb-2">Centered</h3>
               <p className="text-[10px] text-text-muted mb-2">Max-width + Margin Auto is the classic way to center content blocks.</p>
               <div className="h-1 bg-mint-500 w-8 mx-auto rounded"></div>
             </div>
           </div>
        );
      case 'media-object':
        return (
          <div className="h-64 w-full bg-bg-primary p-4 flex flex-col gap-4 justify-center">
             <div className="flex gap-3 items-start p-2 border border-border-light rounded bg-bg-secondary/50">
               <div className="w-8 h-8 rounded-full bg-accent-pink flex-shrink-0"></div>
               <div>
                 <h4 className="text-xs font-bold">User Name</h4>
                 <p className="text-[10px] text-text-muted">This is a classic media object pattern. Image on left, content on right.</p>
               </div>
             </div>
              <div className="flex gap-3 items-center p-2 border border-border-light rounded bg-bg-secondary/50">
               <div className="w-8 h-8 rounded bg-mint-500 flex-shrink-0"></div>
               <div>
                 <h4 className="text-xs font-bold">Product Item</h4>
                 <p className="text-[10px] text-text-muted">Vertically centered variation.</p>
               </div>
             </div>
          </div>
        );
      case 'feature-list':
        return (
          <div className="h-64 w-full bg-bg-primary p-4 flex items-center">
            <div className="grid grid-cols-3 gap-2 w-full">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col items-center text-center p-2">
                  <div className="w-8 h-8 rounded-full bg-bg-secondary border border-border-medium mb-2 flex items-center justify-center text-xs">✨</div>
                  <div className="text-[10px] font-bold mb-1">Feature {i}</div>
                  <div className="text-[8px] text-text-muted">Short description text.</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'off-canvas':
        return (
          <div className="h-64 w-full bg-bg-secondary relative overflow-hidden border border-border-light flex">
            {/* Main Content */}
            <div className="flex-1 p-4 transition-transform duration-300 translate-x-12 opacity-50">
               <header className="flex justify-between items-center mb-4">
                 <div className="w-4 h-4 bg-text-primary/20 rounded"></div>
                 <div className="w-20 h-4 bg-text-primary/10 rounded"></div>
               </header>
               <div className="space-y-2">
                 <div className="h-2 w-full bg-text-muted/10 rounded"></div>
                 <div className="h-2 w-full bg-text-muted/10 rounded"></div>
               </div>
            </div>
            
            {/* Off Canvas Menu */}
            <div className="absolute top-0 left-0 w-32 h-full bg-bg-primary border-r border-border-medium shadow-xl transform transition-transform duration-300 z-10 p-4">
              <div className="text-xs font-bold mb-4 text-mint-500">Menu</div>
              <div className="space-y-2">
                <div className="text-[10px] text-text-primary">Home</div>
                <div className="text-[10px] text-text-muted">About</div>
                <div className="text-[10px] text-text-muted">Contact</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <TerminalCard title={`${t('layoutPatternTitle')} - ${type}`} command={`${t('layoutPatternCommand')} ${type}`} className="my-8">
      <div className="border border-border-medium rounded-sm overflow-hidden">
        {renderContent()}
      </div>
    </TerminalCard>
  );
}
