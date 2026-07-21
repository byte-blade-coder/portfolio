import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiClock, FiArrowUpRight } from "react-icons/fi";

import project2 from "../../assets/projects/dental-clinic.png";
import projectSalon from "../../assets/projects/salon.png";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const container = useRef(null);
  const headerRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Elara Dental Studio",
      category: "React • Tailwind • Vite",
      image: project2,
      isComingSoon: false,
      liveLink: "https://dental-clinic-theme.vercel.app/",
      desc: "A premium dental clinic website featuring modern UI, appointment booking, doctor profiles, and a stunning gallery — built with React and Tailwind CSS."
    },
    {
      id: 2,
      title: "Salon Website",
      category: "WordPress • Custom Theme • CSS",
      image: projectSalon,
      isComingSoon: false,
      liveLink: "https://salon21.42web.io/",
      desc: "A premium WordPress website featuring custom theme development, online booking, service catalogs, and an elegant luxury design tailored for modern salons."
    },
    { 
      id: 3, 
      title: "Next-Gen SaaS", 
      category: "React • Node.js", 
      isComingSoon: true,
      desc: "Currently crafting a highly scalable SaaS platform with smart integrations and real-time data processing capabilities."
    },
    { 
      id: 4, 
      title: "Premium E-Commerce", 
      category: "Next.js • Tailwind", 
      isComingSoon: true,
      desc: "A completely custom headless e-commerce solution focusing on premium micro-interactions and blazing fast load times."
    }
  ];

  useGSAP(() => {
    // Scroll-scrubbed header reveal
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        }
      }
    );

    // Individual Background Text Parallax
    const bgTexts = gsap.utils.toArray(".project-bg-text");
    bgTexts.forEach((text, index) => {
      const direction = index % 2 === 0 ? 20 : -20;
      gsap.to(text, {
        xPercent: direction,
        ease: "none",
        scrollTrigger: {
          trigger: text.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    // Scroll-scrubbed project card reveal
    const projectRows = gsap.utils.toArray(".project-row");
    projectRows.forEach((row, i) => {
      const isEven = i % 2 === 0;
      const imgSide = row.querySelector(".project-img-side");
      const textSide = row.querySelector(".project-text-side");

      gsap.fromTo(imgSide,
        { opacity: 0, x: isEven ? -60 : 60 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );

      gsap.fromTo(textSide,
        { opacity: 0, x: isEven ? 60 : -60 },
        {
          opacity: 1, x: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
    });

  }, { scope: container });

  return (
    <div ref={container} className="w-full py-12 md:py-24 bg-white dark:bg-slate-950 relative z-10 overflow-hidden">
      
      <div className="mx-auto w-[90%] md:w-[85%] max-w-7xl relative z-10">

        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col gap-4 mb-16 lg:mb-20 items-start text-left w-full"
        >
          <span className="text-sm font-black uppercase tracking-[0.4em] text-blue-600">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] text-left">
            Featured
            <span className="text-blue-600 dark:text-blue-400"> Projects.</span>
          </h2>
        </div>

        {/* Alternating Layout */}
        <div className="flex flex-col gap-24 md:gap-32 mt-8">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={project.id} className="relative w-full">
                
                {/* Individual Background Text for each card */}
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[150vw] pointer-events-none opacity-[0.03] dark:opacity-[0.08] z-0 flex items-center justify-center overflow-hidden">
                  <h2 className={`project-bg-text text-[15vw] md:text-[12vw] lg:text-[10vw] font-black text-slate-900 dark:text-white whitespace-nowrap tracking-tighter leading-none ${isEven ? '-translate-x-[10%]' : 'translate-x-[10%]'}`}>
                    {project.title.toUpperCase()} • {project.title.toUpperCase()} • {project.title.toUpperCase()} • {project.title.toUpperCase()}
                  </h2>
                </div>

                <div className={`project-row relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-4 lg:gap-20 items-center group z-10`}>
                  
                  {/* Image Container (60%) */}
                  <div className="project-img-side w-full lg:w-3/5">
                  <div className={`relative w-full aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-900 ${project.isComingSoon ? 'border border-slate-200 dark:border-slate-800' : ''}`}>
                    {!project.isComingSoon ? (
                      <div className="absolute inset-0 w-full h-full">
                        {/* Project Image */}
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="absolute top-0 left-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" 
                        />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50">
                        <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 animate-[pulse_2s_ease-in-out_infinite] mb-6 flex items-center justify-center">
                          <FiClock className="text-slate-400 dark:text-slate-500 text-2xl" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">In Development</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Container (40%) */}
                <div className="project-text-side w-full lg:w-2/5 flex flex-col items-start text-left">
                  <div className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-2">
                    0{index + 1} — {project.category}
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-base md:text-xl font-medium leading-relaxed mb-4 max-w-md">
                    {project.desc}
                  </p>

                  {!project.isComingSoon ? (
                    <a href={project.liveLink || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform duration-300 no-underline">
                      View Project <FiArrowUpRight size={20} />
                    </a>
                  ) : (
                    <button disabled className="flex items-center gap-3 px-8 py-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-bold text-sm uppercase tracking-widest cursor-not-allowed">
                      Coming Soon
                    </button>
                  )}
                </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Projects;
