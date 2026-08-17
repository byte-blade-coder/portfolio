"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiSettings, FiCheck } from 'react-icons/fi';

const colors = [
  { name: 'Blue', 600: '#155DFC', 400: '#60a5fa', 50: '#eff6ff', 900: '#1e3a8a' },
  { name: 'Pink', 600: '#db2777', 400: '#f472b6', 50: '#fdf2f8', 900: '#831843' },
  { name: 'Teal', 600: '#0d9488', 400: '#2dd4bf', 50: '#f0fdfa', 900: '#134e4a' },
  { name: 'Emerald', 600: '#059669', 400: '#34d399', 50: '#ecfdf5', 900: '#064e3b' },
  { name: 'Amber', 600: '#d97706', 400: '#fbbf24', 50: '#fffbeb', 900: '#78350f' },
  { name: 'Purple', 600: '#7c3aed', 400: '#a78bfa', 50: '#f5f3ff', 900: '#4c1d95' },
  { name: 'Rose', 600: '#e11d48', 400: '#fb7185', 50: '#fff1f2', 900: '#881337' },
  { name: 'Cyan', 600: '#0891b2', 400: '#22d3ee', 50: '#ecfeff', 900: '#164e63' },
];

const ThemeCustomizer = () => {
  const [selectedColor, setSelectedColor] = useState(colors[2]); // Default to Teal
  const panelRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const savedColor = localStorage.getItem('theme-primary-color');
    if (savedColor) {
      const found = colors.find(c => c.name === savedColor);
      if (found) {
        changeColor(found);
      }
    }
  }, []);

  const changeColor = (color) => {
    setSelectedColor(color);
    document.documentElement.style.setProperty('--primary-600', color[600]);
    document.documentElement.style.setProperty('--primary-400', color[400]);
    document.documentElement.style.setProperty('--primary-50', color[50]);
    document.documentElement.style.setProperty('--primary-900', color[900]);
    localStorage.setItem('theme-primary-color', color.name);
  };

  const handleColorHover = (e) => {
    gsap.to(e.currentTarget, { scale: 1.2, duration: 0.3 });
  };

  const handleColorLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
  };

  return (
    <div ref={containerRef} className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] hidden md:flex flex-col items-center">
      {/* Color Palette Panel - Always Visible */}
      <div
        ref={panelRef}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-3"
      >
        <p className="text-[10px] font-black uppercase tracking-tighter text-center opacity-40 dark:text-white mb-1">Theme</p>
        {colors.map((color) => (
          <button
            key={color.name}
            onMouseEnter={handleColorHover}
            onMouseLeave={handleColorLeave}
            onMouseDown={(e) => gsap.to(e.currentTarget, { scale: 0.9, duration: 0.1 })}
            onMouseUp={(e) => gsap.to(e.currentTarget, { scale: 1.2, duration: 0.1 })}
            onClick={() => changeColor(color)}
            aria-label={`Select ${color.name} theme`}
            className="w-8 h-8 rounded-full shadow-lg relative flex items-center justify-center transition-all border-2 border-transparent hover:border-white dark:hover:border-slate-400"
            style={{ backgroundColor: color[600] }}
            title={color.name}
          >
            {selectedColor.name === color.name && (
              <FiCheck className="text-white text-xs" />
            )}
            {selectedColor.name === color.name && (
              <div
                className="absolute -inset-1.5 border-2 border-blue-600 rounded-full"
                style={{ borderColor: color[600] }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeCustomizer;

