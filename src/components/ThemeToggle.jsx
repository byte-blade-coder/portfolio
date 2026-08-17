"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { gsap } from 'gsap';

const sizes = {
  sm: {
    track: "w-[52px] h-7",
    thumb: 22,
    translate: 22
  },
  md: {
    track: "w-[68px] h-9",
    thumb: 28,
    translate: 30
  },
  lg: {
    track: "w-[84px] h-11",
    thumb: 34,
    translate: 38
  }
};

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentSize, setCurrentSize] = useState('md');
  
  const thumbRef = useRef(null);
  const trackRef = useRef(null);
  const isFirstRun = useRef(true);

  // 1. Logic to handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCurrentSize('sm'); // Mobile
      } else if (width < 1024) {
        setCurrentSize('md'); // Tablet
      } else {
        setCurrentSize('lg'); // Desktop
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const config = useMemo(() => sizes[currentSize], [currentSize]);

  // 2. Initialize Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const dark = savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    document.documentElement.classList.toggle('dark', dark);
    setIsDark(dark);
    setMounted(true);
  }, []);

  // 3. Animation Logic
  useEffect(() => {
    if (!mounted || !thumbRef.current) return;

    const moveX = isDark ? config.translate : 0;

    if (isFirstRun.current) {
      gsap.set(thumbRef.current, { x: moveX });
      isFirstRun.current = false;
      return;
    }

    // Animate thumb position
    gsap.to(thumbRef.current, {
      x: moveX,
      duration: 0.4,
      ease: 'back.out(1.5)',
    });

    // Subtle track "squish" effect
    gsap.fromTo(trackRef.current,
      { scale: 0.97 },
      { scale: 1, duration: 0.3, ease: 'power2.out' }
    );

  }, [isDark, mounted, config]); // Re-runs when isDark OR screen size changes

  const toggleTheme = (e) => {
    e.stopPropagation();
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  if (!mounted) return <div className="w-[52px] h-7" />;

  return (
    <button
      ref={trackRef}
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      className={`relative ${config.track} rounded-full flex items-center px-1 cursor-pointer overflow-hidden transition-colors duration-500 shadow-inner`}
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 60%, #fbbf24 100%)',
      }}
    >
      {/* Dynamic Background Elements (Stars/Clouds) */}
      <div className="absolute inset-0 pointer-events-none">
        {isDark ? (
          <div className="relative w-full h-full">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  width: i % 2 === 0 ? 2 : 1,
                  height: i % 2 === 0 ? 2 : 1,
                  top: `${20 + (i * 15)}%`,
                  left: `${15 + (i * 20)}%`,
                  opacity: 0.6,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        ) : (
          <div className="relative w-full h-full opacity-40">
             <div className="absolute right-2 top-2 w-4 h-2 bg-white rounded-full blur-[1px]" />
             <div className="absolute right-6 bottom-2 w-3 h-1.5 bg-white rounded-full blur-[1px]" />
          </div>
        )}
      </div>

      {/* Thumb */}
      <div
        ref={thumbRef}
        style={{
          width: config.thumb,
          height: config.thumb,
        }}
        className="rounded-full flex items-center justify-center relative z-10 shadow-md bg-white/10 backdrop-blur-sm"
      >
        {isDark ? (
          <svg 
            width="65%" height="65%" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-yellow-200 fill-yellow-200"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
          </svg>
        ) : (
          <svg 
            width="65%" height="65%" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-orange-500 fill-orange-400"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;