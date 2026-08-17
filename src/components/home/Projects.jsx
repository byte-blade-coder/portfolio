"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiClock, FiArrowUpRight, FiLayers } from "react-icons/fi";

import Image from "next/image";
import project2 from "../../assets/projects/dental-clinic.png";
import projectSalon from "../../assets/projects/Zahra-Zakir.png";
import projectElena from "../../assets/projects/Elena-Salon.png";


gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const container = useRef(null);
  const headerRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Zahra Zakir Salon",
      category: "WordPress • Custom Theme • Custom Plugin",
      image: projectSalon,
      isComingSoon: false,
      liveLink: "https://zahrazakirsalon.com/",
      desc: "A premium WordPress website featuring custom theme development and custom plugins built from scratch to manage services and online appointments, delivering a luxury salon experience."
    },
    {
      id: 2,
      title: "Elena Salon",
      category: "WordPress • Custom Theme • CSS",
      image: projectElena,
      isComingSoon: false,
      liveLink: "https://elena.ifree.page/",
      desc: "A premium WordPress salon website featuring custom theme architecture, responsive layout, appointment booking pipelines, and luxury branding."
    },
    {
      id: 3,
      title: "Elara Dental Studio",
      category: "React • Tailwind • Vite",
      image: project2,
      isComingSoon: false,
      liveLink: "https://dental-clinic-theme.vercel.app/",
      desc: "A premium dental clinic website featuring modern UI, appointment booking, doctor profiles, and a stunning gallery — built with React and Tailwind CSS."
    },
    { 
      id: 4, 
      title: "Next-Gen SaaS Platform", 
      category: "React • Node.js • Cloud", 
      isComingSoon: true,
      desc: "Currently crafting a highly scalable SaaS platform with smart integrations, real-time data processing capabilities, and interactive dashboard analytics."
    },
    { 
      id: 5, 
      title: "Premium E-Commerce", 
      category: "Next.js • Tailwind • Headless", 
      isComingSoon: true,
      desc: "A completely custom headless e-commerce solution focusing on premium micro-interactions, headless checkout flow, and blazing fast performance."
    }
  ];

  useGSAP(() => {
    // Scroll-scrubbed header reveal
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 50 },
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

    // Grid cards reveal animation
    const cards = gsap.utils.toArray(".project-card");
    gsap.fromTo(cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className="w-full py-20 md:py-32 bg-slate-50 dark:bg-slate-950 relative z-10 overflow-hidden">
      
      {/* Decorative Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="mx-auto w-[90%] md:w-[85%] max-w-7xl relative z-10">

        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col gap-3 mb-16 lg:mb-24 items-center text-center w-full"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
            <FiLayers className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm animate-[pulse_2s_infinite]" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Featured Work</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300">Showcase.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base sm:text-lg font-medium leading-relaxed">
            A curated selection of applications highlighting custom architecture, premium user experience design, and robust performance.
          </p>
        </div>

        {/* Modern Interactive Grid */}
        <div className="projects-grid grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {projects.slice(0, 4).map((project, index) => {
            const techStack = project.category.split("•").map((tech) => tech.trim());

            return (
              <div 
                key={project.id} 
                className="project-card group relative flex flex-col justify-between bg-white/60 dark:bg-[#0d1527]/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/60 dark:border-white/5 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_60px_-15px_rgba(13,148,136,0.12)] dark:hover:shadow-[0_25px_60px_-15px_rgba(13,148,136,0.15)] hover:border-blue-500/30 dark:hover:border-blue-400/20 hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
              >
                
                {/* Image & Interactive Hover Effect */}
                <div className="p-4 w-full">
                  <div className={`relative w-full aspect-[16/10] overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-900/80 ${project.isComingSoon ? 'border border-dashed border-slate-200 dark:border-slate-800' : ''}`}>
                    {!project.isComingSoon ? (
                      <div className="absolute inset-0 w-full h-full">
                        {/* Project Image */}
                        <Image 
                          src={project.image} 
                          alt={project.title} 
                          fill
                          className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" 
                        />
                        {/* Elegant overlay screen tint */}
                        <div className="absolute inset-0 bg-slate-950/5 group-hover:bg-slate-950/0 transition-colors duration-500" />
                        
                        {/* Quick View Interactive overlay */}
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                          <a 
                            href={project.liveLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-lg no-underline"
                          >
                            Live Demo <FiArrowUpRight size={16} />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/40 p-6">
                        <div className="w-14 h-14 rounded-full bg-slate-200/60 dark:bg-slate-800/80 mb-4 flex items-center justify-center shadow-inner">
                          <FiClock className="text-slate-400 dark:text-slate-500 text-xl animate-[pulse_2s_infinite]" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 bg-slate-200/40 dark:bg-slate-800/60 px-3 py-1 rounded-full">
                          In Development
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Content Block */}
                <div className="px-8 pb-8 pt-4 flex flex-col justify-between flex-grow">
                  
                  <div>
                    {/* Dynamic Tech Chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {techStack.map((tech, i) => (
                        <span 
                          key={i} 
                          className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium leading-relaxed mb-6">
                      {project.desc}
                    </p>
                  </div>

                  {/* Actions / Status */}
                  <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                    {!project.isComingSoon ? (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group/link"
                      >
                        Explore Project 
                        <FiArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest cursor-not-allowed">
                        Coming Soon...
                      </span>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-16 md:mt-24">
          <Link 
            href="/projects" 
            className="group/btn relative flex items-center gap-3 px-10 py-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm uppercase tracking-widest hover:scale-105 transition-all duration-300 no-underline shadow-[0_10px_35px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/5"
          >
            <span>View All Projects</span>
            <FiArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/10 to-teal-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Projects;
