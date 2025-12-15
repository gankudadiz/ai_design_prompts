'use client';

import { useState } from 'react';
import { Menu, Search, Bell, User, ShoppingCart, ArrowRight } from 'lucide-react';

interface StylePreviewProps {
  preview: {
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    accentColor?: string;
    secondaryColor?: string;
    borderColor?: string;
    borderRadius?: string;
    css?: string; // New: Allow custom CSS injection
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

  // Generate a unique class name for scoping custom CSS if needed, 
  // but for now we'll just use a specific wrapper class.
  const wrapperClass = "style-preview-wrapper";

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
          <p className="text-lg opacity-70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Create stunning interfaces with our comprehensive design system. 
            Optimized for speed, consistency, and scalability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-3 font-bold transition-transform hover:scale-105 active:scale-95"
              style={buttonStyle}
            >
              Get Started
            </button>
            <button 
              className="px-8 py-3 font-bold transition-opacity hover:opacity-80"
              style={outlineButtonStyle}
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
                className="p-6 transition-transform hover:-translate-y-1"
                style={cardStyle}
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
            <div className="p-6" style={cardStyle}>
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
            
            <div className="p-6" style={cardStyle}>
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
                      backgroundImage: 'none' // remove default arrow for custom look if needed, but simple is fine
                    }}
                  >
                    <option>Design Systems</option>
                    <option>Development</option>
                  </select>
                </div>
                <button 
                  className="w-full p-3 font-bold mt-2"
                  style={buttonStyle}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
