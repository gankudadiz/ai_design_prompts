'use client';

import { Menu, Search, User, Plus } from 'lucide-react';

interface StylePreviewProps {
  preview: {
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    accentColor?: string;
    secondaryColor?: string;
    borderColor?: string;
    borderRadius?: string;
    css?: string;
  };
}

export default function StylePreview({ preview }: StylePreviewProps) {
  const {
    backgroundColor,
    textColor,
    fontFamily,
    accentColor = textColor,
    secondaryColor = backgroundColor,
    borderColor = textColor,
    borderRadius = '4px',
    css,
  } = preview;

  const wrapperClass = "style-preview-wrapper";

  // 检测 CSS 中的风格前缀（如 cyber-、acid-、vapor- 等）
  const stylePrefix = css?.match(/\.style-preview-wrapper\.([a-z]+)-/)?.[1] || '';

  const buttonStyle = {
    backgroundColor: accentColor,
    color: backgroundColor,
    borderRadius: borderRadius,
    border: `1px solid ${accentColor}`,
  };

  const outlineButtonStyle = {
    backgroundColor: 'transparent',
    color: accentColor,
    borderRadius: borderRadius,
    border: `1px solid ${accentColor}`,
  };

  const cardStyle = {
    backgroundColor: secondaryColor,
    border: `1px solid ${borderColor}`,
    borderRadius: borderRadius,
  };

  // 动态生成类名列表
  const buttonPrimaryClass = stylePrefix ? `${wrapperClass} ${stylePrefix}-button-primary` : '';
  const buttonSecondaryClass = stylePrefix ? `${wrapperClass} ${stylePrefix}-button-secondary` : '';
  const cardClass = stylePrefix ? `${wrapperClass} ${stylePrefix}-card` : '';
  const statCardClass = css?.includes('stat-card') ? 'stat-card' : '';
  const fabClass = css?.includes('fab') ? 'fab' : '';

  const hasCustomButtonStyles = !!stylePrefix;

  return (
    <div
      className={`w-full rounded-md border border-border-medium relative overflow-hidden shadow-2xl transition-all duration-500 flex flex-col ${wrapperClass}`}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        fontFamily: fontFamily,
        minHeight: '600px', // Force taller height for full page feel
      }}
    >
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      <style>{`
        .block-hero-text {
          margin-left: auto !important;
          margin-right: auto !important;
          text-align: center !important;
        }
      `}</style>
      {/* 1. Navbar Mock */}
      <div
        className="h-14 border-b flex items-center justify-between px-6 sticky top-0 z-10"
        style={{ borderColor: borderColor, backgroundColor: backgroundColor }}
      >
        <div className="flex items-center gap-4">
          <Menu className="w-5 h-5 opacity-70 cursor-pointer" />
          <span className="font-bold text-lg tracking-tight">BRAND</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium opacity-80">
          <span className="cursor-pointer hover:opacity-100">Products</span>
          <span className="cursor-pointer hover:opacity-100">Solutions</span>
          <span className="cursor-pointer hover:opacity-100">Pricing</span>
        </div>
        <div className="flex items-center gap-4">
          <Search className="w-4 h-4 opacity-70 cursor-pointer" />
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: secondaryColor }}
          >
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">

        {/* 2. Hero Section */}
        <div className="px-8 py-16 md:py-24 text-center border-b" style={{ borderColor: borderColor }}>
          <div
            className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider mb-6"
            style={{
              backgroundColor: secondaryColor,
              color: accentColor,
              borderRadius: borderRadius,
              border: `1px solid ${borderColor}`
            }}
          >
            New Release v2.0
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Build Faster with <span style={{ color: accentColor }}>Style.</span>
          </h1>
          <p
            className="text-lg opacity-70 max-w-2xl mx-auto mb-12 leading-relaxed text-center px-4 text-justify"
            style={{ marginBottom: '3rem' }}
          >
            Create stunning interfaces with our comprehensive design system.
            Optimized for speed, consistency, and scalability.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ marginTop: '-1.5rem' }}
          >
            <button
              className={`px-8 py-3 font-bold transition-transform hover:scale-105 active:scale-95 ${buttonPrimaryClass}`}
              style={hasCustomButtonStyles ? {} : buttonStyle}
            >
              Get Started
            </button>
            <button
              className={`px-8 py-3 font-bold transition-opacity hover:opacity-80 ${buttonSecondaryClass}`}
              style={hasCustomButtonStyles ? {} : outlineButtonStyle}
            >
              Documentation
            </button>
          </div>
        </div>

        {/* 3. Stats / Features Grid */}
        <div className="px-8 py-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Performance', val: '99%', icon: '⚡' },
              { title: 'Components', val: '50+', icon: '🧩' },
              { title: 'Users', val: '10k+', icon: '👥' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 transition-transform hover:-translate-y-1 ${statCardClass || cardClass}`}
                style={statCardClass || cardClass ? cardStyle : {}}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold mb-1">{stat.val}</div>
                <div className="text-sm opacity-60 uppercase tracking-wide">{stat.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Content / Form Section */}
        <div className="px-8 py-16 border-t" style={{ borderColor: borderColor }}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className={`p-6 ${cardClass}`} style={cardClass ? cardStyle : {}}>
              <h2 className="text-3xl font-bold mb-4">Subscribe to updates</h2>
              <p className="opacity-70 mb-6">Stay up to date with the latest releases and design tips.</p>
              <ul className="space-y-3 opacity-80 mb-8">
                {['Weekly newsletters', 'Free resources', 'No spam, ever'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span style={{ color: accentColor }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-6 ${cardClass}`} style={cardClass ? cardStyle : {}}>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase opacity-60 mb-1">Email Address</label>
                  <input
                    type="text"
                    placeholder="user@example.com"
                    className="w-full p-3 bg-transparent outline-none transition-all"
                    style={{
                      border: `1px solid ${borderColor}`,
                      borderRadius: borderRadius,
                      color: textColor
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase opacity-60 mb-1">Interest</label>
                  <select
                    className="w-full p-3 bg-transparent outline-none appearance-none"
                    style={{
                      border: `1px solid ${borderColor}`,
                      borderRadius: borderRadius,
                      color: textColor,
                      backgroundImage: 'none'
                    }}
                  >
                    <option>Design Systems</option>
                    <option>Development</option>
                  </select>
                </div>
                <button
                  className={`w-full p-3 font-bold mt-2 ${buttonPrimaryClass}`}
                  style={hasCustomButtonStyles ? {} : buttonStyle}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FAB - Floating Action Button */}
      <div className="absolute bottom-6 right-6">
        <button
          className={`w-14 h-14 flex items-center justify-center shadow-lg transition-shadow hover:shadow-xl ${fabClass}`}
          style={fabClass ? {} : {
            backgroundColor: accentColor,
            color: backgroundColor,
            borderRadius: '50%',
            border: 'none'
          }}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
