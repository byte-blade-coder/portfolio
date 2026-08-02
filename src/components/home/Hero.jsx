import React, { useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Sparkles, Send } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import heroImg from "../../assets/hero.png";
import { useAppReady } from '../../context/AppReadyContext';

// Optimized image component
const OptimizedHeroImage = forwardRef(({ className }, ref) => {
  return (
    <img
      ref={ref}
      src={heroImg}
      alt="Ahmed Raza"
      className={className}
      loading="eager"
      decoding="async"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    />
  );
});

const HeroSection = () => {
  const container = useRef(null);
  const heroRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const shapeRef = useRef(null);
  const imageRef = useRef(null);
  const mobileDockRef = useRef(null);

  const appReady = useAppReady();

  useGSAP(() => {
    // Only run entrance animations once the loader has exited
    if (!appReady) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Entrance Animation
    tl.fromTo(container.current, { opacity: 0 }, { opacity: 1, duration: 1 })
      .from(".gsap-item", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 1,
      }, "-=0.5")
      .from(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
      }, "-=1")
      .from(mobileDockRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
      }, "-=0.8");

    // Optimized animations with reduced CPU usage
    // Only run animations on larger screens
    if (window.innerWidth >= 768) {
      // Background Blobs - slower and more subtle
      gsap.to(blob1Ref.current, {
        scale: 1.1, x: 15, y: -10,
        duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
      gsap.to(blob2Ref.current, {
        scale: 1.05, x: -20, y: 20,
        duration: 18, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1
      });

      // Background Shape Rotation - much slower
      gsap.to(shapeRef.current, {
        rotate: 360, duration: 30, repeat: -1, ease: "none"
      });

      // Image Floating - reduced amplitude
      gsap.to(imageRef.current, {
        y: -8, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut"
      });

    }
  }, { scope: container, dependencies: [appReady] });

  // Optimized hover handlers with throttling
  const handleHover = (e, scale = 1.05, shadow = true) => {
    gsap.killTweensOf(e.currentTarget);
    gsap.to(e.currentTarget, {
      scale: scale,
      boxShadow: shadow ? "0 20px 40px -10px rgba(37, 99, 235, 0.3)" : "none",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleHoverExit = (e) => {
    gsap.killTweensOf(e.currentTarget);
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "none",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleTap = (e) => {
    gsap.killTweensOf(e.currentTarget);
    gsap.to(e.currentTarget, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  };

  return (
    <div
      ref={container}
      id="hero"
      className="relative w-full min-h-[100svh] bg-slate-50 dark:bg-[#030712] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 md:pt-24 lg:pt-20 pb-20 lg:pb-0"
    >
      {/* --- PREMIUM BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')` }}
        ></div>

        <div
          ref={blob1Ref}
          className="absolute top-[10%] right-[10%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-blue-400/20 dark:bg-blue-600/10 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full"
        />
        <div
          ref={blob2Ref}
          className="absolute bottom-[10%] left-[20%] w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-purple-400/10 dark:bg-indigo-600/10 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full"
        />
      </div>

      <div className="relative z-10 w-[90%] sm:w-[85%] md:w-[80%] max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-14 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4 sm:gap-8 lg:gap-16">

          {/* TEXT CONTENT */}
          <div className="flex-1 text-center lg:text-left z-20 order-1 flex flex-col items-center lg:items-start relative pt-0 lg:pt-12">

            <div className="gsap-item relative inline-flex items-center px-4 py-2 sm:py-2.5 rounded-full bg-slate-100 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-white/10 mb-6 sm:mb-16 shadow-sm">
              <span className="relative flex items-center justify-center h-2.5 w-2.5 ml-2 mr-12">
                {/* Spinning Text Ring Centered on Dot */}
                <div className="absolute animate-[spin_15s_linear_infinite] hidden lg:block w-[110px] h-[110px] opacity-50 pointer-events-none">
                  <svg viewBox="0 0 100 100" width="110" height="110" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <path id="circlePath" fill="none" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                    <text className="text-[9px] font-black uppercase tracking-[0.2em] fill-slate-900 dark:fill-white">
                      <textPath href="#circlePath">
                        AHMED RAZA • BYTE BLADE FOUNDER •
                      </textPath>
                    </text>
                  </svg>
                </div>

                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 z-10"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 z-10"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 z-10 relative">
                Available for New Projects
              </span>
            </div>

            <h1 className="gsap-item text-[2.75rem] leading-[0.9] sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-slate-900 dark:text-white relative z-20">
              Ahmed <br className="hidden sm:block" />
              <span className="text-[var(--primary-600)]">
                Raza
              </span>
            </h1>
            
            <p className="gsap-item text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-slate-700 dark:text-slate-300 mt-3 font-manrope uppercase">
              Founder of <span className="text-blue-600 dark:text-blue-400">Byte Blade</span>
            </p>

            <p className="gsap-item mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-[280px] sm:max-w-lg font-medium leading-relaxed mx-auto lg:mx-0">
              Crafting high-performance digital experiences.
              Bridging the gap between <span className="text-slate-900 dark:text-white font-bold">Design</span> & <span className="text-slate-900 dark:text-white font-bold">Engineering</span>.
            </p>

            {/* CTA BUTTONS (Desktop) */}
            <div className="gsap-item hidden lg:flex items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-8 sm:mt-10">
              <button
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverExit}
                onClick={() => {
                  handleTap({ currentTarget: container.current }); // dummy call for effect or just manual
                  document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseDown={handleTap}
                style={{ backgroundColor: 'var(--primary-600)' }}
                className="px-6 sm:px-8 py-3 sm:py-4 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-blue-600/20 hover:shadow-2xl"
              >
                Hire Me <Send size={16} sm:size={18} />
              </button>
              <button
                onMouseEnter={(e) => handleHover(e, 1.05, false)}
                onMouseLeave={handleHoverExit}
                onMouseDown={handleTap}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-2xl font-bold flex items-center gap-2 transition-all hover:border-[var(--primary-600)]"
              >
                Portfolio <ArrowUpRight size={16} sm:size={18} />
              </button>
            </div>

            {/* SOCIAL LINKS */}
            <div className="gsap-item mt-8 sm:mt-12 flex items-center justify-center lg:justify-start gap-4 sm:gap-6 opacity-80 hover:opacity-100 transition-all duration-500">
              <a href="#" className="text-slate-700 dark:text-slate-300 hover:text-[var(--primary-600)] transition-colors"><FiGithub size={24} sm:size={28} /></a>
              <a href="#" className="text-slate-700 dark:text-slate-300 hover:text-[var(--primary-600)] transition-colors"><FiLinkedin size={24} sm:size={28} /></a>
              <div className="h-px w-8 sm:w-12 bg-slate-300 dark:bg-slate-700"></div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">IT Technician</span>
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div className="relative flex-1 flex flex-col items-center justify-center order-2 mt-4 sm:mt-0 w-full">
            <div className="relative w-[240px] h-[240px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]">
              <div
                ref={shapeRef}
                style={{
                  background: 'linear-gradient(to top right, var(--primary-600), transparent)',
                  borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'
                }}
                className="absolute inset-0 opacity-20 dark:opacity-40 backdrop-blur-3xl border border-white/20 dark:border-white/10"
              />

              <OptimizedHeroImage
                ref={imageRef}
                className="absolute inset-0 w-full h-[35vh] sm:h-[40vh] md:h-full lg:h-[500px] xl:h-[650px] object-contain z-10 drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)] origin-bottom scale-125 sm:scale-110 md:scale-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE ONLY BUTTONS (Fixed at Bottom of Hero) */}
      <div
        ref={mobileDockRef}
        className="absolute bottom-4 left-0 right-0 z-[40] flex lg:hidden px-4"
      >
        <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-[1.5rem] sm:rounded-[2rem] p-2 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col gap-2">
          <button
            onMouseDown={handleTap}
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ backgroundColor: 'var(--primary-600)' }}
            className="w-full py-3 sm:py-4 text-white font-black rounded-[1rem] sm:rounded-[1.5rem] flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 text-sm sm:text-base"
          >
            Hire Me Now <Send size={16} sm:size={18} />
          </button>
          <button
            onMouseDown={handleTap}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full py-2.5 sm:py-3 bg-transparent text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            View Portfolio <ArrowUpRight size={16} sm:size={18} className="opacity-50" />
          </button>
        </div>
      </div>

      {/* SCROLL DOWN INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 [writing-mode:vertical-lr] rotate-180 mb-2">Scroll</span>
        <div className="w-px h-12 bg-slate-300 dark:bg-slate-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-600 animate-[bounce_2s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
