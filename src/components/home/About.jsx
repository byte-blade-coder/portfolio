"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import heroImg from "../../assets/hero.png";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const container = useRef(null);
  const imageContainerRef = useRef(null);
  const textContainerRef = useRef(null);
  const decoCircleRef = useRef(null);
  const expTagRef = useRef(null);
  const bgAccentRef = useRef(null);
  const storyTextRef = useRef(null);
  const bgTextRef = useRef(null);

  const storyText = "Byte Blade is a premium software engineering firm founded by Ahmed Raza. We specialize in building software that matters, bridging the gap between complex backend architectures and human-centric design to create digital products that are as robust as they are intuitive.";

  useGSAP(() => {
    // Scroll-scrubbed image reveal
    gsap.fromTo(imageContainerRef.current,
      { opacity: 0, x: -80, scale: 0.9 },
      {
        opacity: 1, x: 0, scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          toggleActions: "play none none none",
        }
      }
    );

    // Decorative circle rotation (keep as-is, it's not scroll-based)
    gsap.to(decoCircleRef.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Floating experience tag scroll reveal
    gsap.fromTo(expTagRef.current,
      { scale: 0, rotate: -20, opacity: 0 },
      {
        scale: 1, rotate: 0, opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );

    // Right side text staggered scrub reveal
    gsap.fromTo(".about-item",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          toggleActions: "play none none none",
        }
      }
    );

    // Background accent pulse (keep as-is)
    gsap.to(bgAccentRef.current, {
      scale: 1.2,
      opacity: 0.1,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Scrubbing Word Reveal
    gsap.to(".story-word", {
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: storyTextRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      }
    });

  }, { scope: container });

  const handleBtnHover = (e) => {
    const line = e.currentTarget.querySelector('.about-btn-line');
    gsap.to(e.currentTarget, { gap: "24px", duration: 0.3 });
    gsap.to(line, { width: "80px", duration: 0.3 });
  };

  const handleBtnLeave = (e) => {
    const line = e.currentTarget.querySelector('.about-btn-line');
    gsap.to(e.currentTarget, { gap: "16px", duration: 0.3 });
    gsap.to(line, { width: "48px", duration: 0.3 });
  };

  return (
    <div ref={container} className="relative w-full py-12 md:py-20 bg-white dark:bg-slate-950 overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          
          {/* LEFT SIDE: IMAGE CONTAINER */}
          <div 
            ref={imageContainerRef}
            className="relative w-full lg:w-5/12 flex justify-center lg:justify-start"
          >
            {/* Decorative Background Element */}
            <div 
              ref={decoCircleRef}
              className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-transparent blur-3xl rounded-full opacity-50"
            ></div>
            
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-none aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl group">
              <Image 
                src={heroImg} 
                alt="Ahmed Raza" 
                fill
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
              />
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Floating Experience Tag */}
            <div 
              ref={expTagRef}
              className="absolute -bottom-6 -right-2 md:-right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/5 hidden sm:block z-10"
            >
              <p className="text-blue-600 font-black text-xl md:text-2xl leading-none">2+</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Years Exp</p>
            </div>
          </div>

          {/* RIGHT SIDE: TEXT CONTENT */}
          <div 
            ref={textContainerRef}
            className="w-full lg:w-7/12 flex flex-col text-left items-start"
          >
            <div className="space-y-4 mb-4 text-left w-full">
              <h3 className="about-item text-xs md:text-sm font-black uppercase tracking-[0.4em] text-blue-600">
                Who is Byte Blade?
              </h3>
              <h2 className="about-item text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
                About <br /> 
                <span className="text-slate-400 dark:text-slate-600">Byte Blade</span>
              </h2>
            </div>

            <div 
              ref={storyTextRef}
              className="about-item flex flex-wrap gap-x-2 gap-y-1 mb-6 max-w-2xl text-left"
            >
              {storyText.split(" ").map((word, i) => (
                <span 
                  key={i} 
                  className="story-word text-slate-900 dark:text-white text-[1.25rem] md:text-2xl lg:text-3xl font-bold leading-snug md:leading-tight opacity-20"
                >
                  {word}
                </span>
              ))}
            </div>

            {/* STATS GRID */}
            <div className="about-item w-full grid grid-cols-3 gap-4 md:gap-8 py-8 border-y border-slate-200 dark:border-white/10 mb-6">
              <div className="space-y-1">
                <h4 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white italic">4+</h4>
                <p className="text-[10px] md:text-xs font-black uppercase text-slate-400 tracking-widest">Projects</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl md:text-4xl font-black text-blue-600 italic">2+</h4>
                <p className="text-[10px] md:text-xs font-black uppercase text-slate-400 tracking-widest">Exp</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white italic">100%</h4>
                <p className="text-[10px] md:text-xs font-black uppercase text-slate-400 tracking-widest">Client Joy</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Background Decorative Accent */}
      <div 
        ref={bgAccentRef}
        className="absolute top-1/2 -right-20 w-64 h-64 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" 
        style={{ opacity: 0.05 }}
      />
    </div>
  );
}


export default About;
