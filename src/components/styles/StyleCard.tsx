'use client';

import { StyleMeta } from '@/lib/styles';
import { Link } from '@/i18n/routing';
import { ArrowRight, Sparkles } from 'lucide-react';

interface StyleCardProps {
  style: StyleMeta;
}

export default function StyleCard({ style }: StyleCardProps) {
  const {
    backgroundColor,
    textColor,
    fontFamily,
    accentColor = textColor,
    secondaryColor = backgroundColor,
    borderColor = textColor,
    borderRadius = '4px',
  } = style.preview;

  // Derived styles for mini-components
  const containerStyle = {
    backgroundColor,
    color: textColor,
    fontFamily,
  };

  const accentStyle = {
    backgroundColor: accentColor,
  };

  const secondaryStyle = {
    backgroundColor: secondaryColor,
    borderColor: borderColor,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: borderRadius,
  };
  
  const borderStyle = {
    borderColor: borderColor,
    borderRadius: borderRadius,
  };

  return (
    <Link 
      href={`/styles/${style.slug}`}
      className="group block bg-bg-card border border-border-medium rounded-lg overflow-hidden hover:border-mint-500 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {/* Visual Preview Area */}
      <div className="h-48 w-full relative overflow-hidden border-b border-border-light group-hover:opacity-100 transition-opacity">
        {/* The Mini Interface Mockup */}
        <div 
          className="w-full h-full p-4 flex flex-col gap-3 scale-[1] origin-top-left"
          style={containerStyle}
        >
          {/* Mini Header */}
          <div className="flex items-center justify-between opacity-80">
            <div className="w-8 h-2 rounded-full opacity-80" style={{ backgroundColor: accentColor }}></div>
            <div className="flex gap-1">
              <div className="w-4 h-1 bg-current opacity-40 rounded-full"></div>
              <div className="w-4 h-1 bg-current opacity-40 rounded-full"></div>
            </div>
          </div>

          {/* Mini Hero */}
          <div className="mt-2 space-y-2">
            <div className="w-2/3 h-4 bg-current opacity-90 rounded-sm"></div>
            <div className="w-1/2 h-2 bg-current opacity-60 rounded-sm"></div>
            
            {/* Mini Button */}
            <div 
              className="inline-block mt-2 px-3 py-1 text-[10px] font-bold"
              style={{ 
                backgroundColor: accentColor, 
                color: backgroundColor,
                borderRadius: borderRadius 
              }}
            >
              Action
            </div>
          </div>

          {/* Mini Grid */}
          <div className="grid grid-cols-2 gap-2 mt-auto">
            <div className="h-10 p-2 flex flex-col justify-center" style={secondaryStyle}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: accentColor + '30' }}>
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }}></div>
              </div>
            </div>
            <div className="h-10 p-2 flex flex-col justify-center" style={secondaryStyle}>
               <div className="w-8 h-1 bg-current opacity-50 rounded-sm mb-1"></div>
               <div className="w-12 h-1 bg-current opacity-30 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Overlay Gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
      </div>

      {/* Info Area */}
      <div className="p-5 flex flex-col flex-1 bg-bg-card">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-text-primary group-hover:text-mint-500 transition-colors">
            {style.title}
          </h3>
          <div className="flex gap-1">
             <div className="w-3 h-3 rounded-full border border-border-medium" style={{ backgroundColor: backgroundColor }} title="Background"></div>
             <div className="w-3 h-3 rounded-full border border-border-medium" style={{ backgroundColor: accentColor }} title="Accent"></div>
             <div className="w-3 h-3 rounded-full border border-border-medium" style={{ backgroundColor: secondaryColor }} title="Secondary"></div>
          </div>
        </div>
        
        <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
          {style.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {style.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] bg-bg-tertiary px-2 py-1 rounded-full text-text-muted font-mono uppercase tracking-tight">
                {tag}
              </span>
            ))}
          </div>
          <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-mint-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
