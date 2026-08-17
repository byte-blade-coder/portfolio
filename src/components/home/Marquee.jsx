"use client";

import React from "react";

const Marquee = () => {
  const row2 = [
    "BUILD", "SCALE", "DESIGN", "OPTIMIZE", "FAST", "SECURE",
    "BUILD", "SCALE", "DESIGN", "OPTIMIZE", "FAST", "SECURE"
  ];

  return (
    <section className="relative py-6 md:py-8 overflow-hidden bg-white dark:bg-[#030712] border-y border-slate-200 dark:border-slate-800">
      {/* Mask effect on edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-[#030712] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-[#030712] to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-6 md:gap-10">

        {/* Row 2: Left to Right */}
        <div className="flex overflow-hidden group select-none">
          <div className="flex items-center gap-12 whitespace-nowrap animate-marquee-reverse group-hover:pause">
            {row2.map((action, i) => (
              <div key={i} className="flex items-center gap-12">
                <span className="text-[clamp(2rem,6vw,4rem)] font-black tracking-tighter text-blue-600/50 dark:text-blue-400/40 hover:text-blue-600 dark:hover:text-blue-400 cursor-default italic">
                  {action}
                </span>
                <span className="text-slate-900/30 dark:text-white/30 text-2xl md:text-4xl">✦</span>
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center gap-12 whitespace-nowrap animate-marquee-reverse group-hover:pause" aria-hidden="true">
            {row2.map((action, i) => (
              <div key={i} className="flex items-center gap-12">
                <span className="text-[clamp(2rem,6vw,4rem)] font-black tracking-tighter text-blue-600/50 dark:text-blue-400/40 hover:text-blue-600 dark:hover:text-blue-400 cursor-default italic">
                  {action}
                </span>
                <span className="text-slate-900/30 dark:text-white/30 text-2xl md:text-4xl">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
