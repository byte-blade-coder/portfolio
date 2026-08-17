"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import ThemeCustomizer from "./ThemeCustomizer";
import WhatsAppWidget from "./WhatsAppWidget";

/**
 * AppShell — client component that wraps the entire app.
 * Handles: AppReadyContext, Lenis smooth scroll, fade-in transition.
 * Separated from layout.jsx (server component) so we can use hooks here.
 */
export default function AppShell({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Initialize Lenis smooth scroll
    let lenis;
    (async () => {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    })();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div 
      className="relative w-full bg-slate-50 dark:bg-[#030712]"
      style={{
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.25s ease-in-out"
      }}
    >
      <Navbar />
      {children}
      <ThemeCustomizer />
      <WhatsAppWidget />
    </div>
  );
}
