"use client";

import React from "react";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiGeeksforgeeks,
  SiGithub, 
  SiDocker, 
  SiPrisma,
  SiReact,
  SiNodedotjs,
  SiFirebase
} from "react-icons/si";

const logos = [
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiTailwindcss, name: "Tailwind CSS" },
  { icon: SiPrisma, name: "Prisma" },
  { icon: SiGithub, name: "GitHub" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiReact, name: "React" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiFirebase, name: "Firebase" },
];

const extendedLogos = [...logos, ...logos, ...logos, ...logos];

const LogoLoop = () => {
  return (
    <section className="relative py-6 overflow-hidden bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
      {/* Gradients to fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

      <div className="flex overflow-hidden group select-none">
        {/* Single animated container with double width */}
        <div className="flex w-max animate-marquee group-hover:pause [animation-duration:20s]">
          <div className="flex items-center gap-16 md:gap-24 whitespace-nowrap pr-16 md:pr-24">
            {extendedLogos.map((Logo, index) => (
              <div 
                key={`logo-1-${index}`} 
                className="flex items-center justify-center text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors duration-300"
                title={Logo.name}
              >
                <Logo.icon className="w-10 h-10" aria-label={Logo.name} />
              </div>
            ))}
          </div>
          {/* Duplicate array for seamless looping */}
          <div className="flex items-center gap-16 md:gap-24 whitespace-nowrap pr-16 md:pr-24" aria-hidden="true">
            {extendedLogos.map((Logo, index) => (
            <div 
              key={`logo-2-${index}`} 
              className="flex items-center justify-center text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors duration-300"
              title={Logo.name}
            >
              <Logo.icon className="w-10 h-10" aria-hidden="true" />
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoLoop;
