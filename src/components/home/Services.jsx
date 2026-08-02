import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiCode, FiLayout, FiTrendingUp, FiSmartphone, FiDatabase, FiGlobe } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const container = useRef(null);
  const headingRef = useRef(null);
  const bgTextRef = useRef(null);

  const services = [
    { title: "React & Next.js", icon: <FiCode />, desc: "High-performance frontend applications dynamically built with React.js and Next.js." },
    { title: "Node.js Backend", icon: <FiDatabase />, desc: "Robust, fast, and highly scalable server architectures and APIs powered by Node.js." },
    { title: "PHP Laravel Web", icon: <FiGlobe />, desc: "Secure and feature-rich enterprise-level web applications built on the Laravel framework." },
    { title: "WordPress CMS", icon: <FiLayout />, desc: "Custom theme development and content-rich reliable applications relying on WordPress." },
    { title: "Mobile Apps", icon: <FiSmartphone />, desc: "Responsive cross-platform mobile applications optimized for all smartphone devices." },
    { title: "Design & Scaling", icon: <FiTrendingUp />, desc: "Strategic growth plans coupled with modern, intuitive user interfaces for world-class experiences." }
  ];

  useGSAP(() => {
    // Scroll-scrubbed grid cards
    gsap.fromTo(".service-card",
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );

    // Scroll-scrubbed heading reveal
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        }
      }
    );

  }, { scope: container });

  return (
    <div ref={container} className="w-full pt-8 pb-16 md:pt-12 md:pb-24 relative z-10 overflow-hidden">
      
      <div className="mx-auto w-[90%] md:w-[85%] max-w-7xl relative z-10">
        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] text-left mb-16"
        >
          Our Core <span className="text-blue-600 dark:text-blue-400">Expertise</span>
        </h2>

        {/* 3 Column Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative bg-white/80 dark:bg-[#0a0f1c]/80 backdrop-blur-xl cursor-pointer p-8 lg:p-10 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)] dark:hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.15)] hover:-translate-y-2 hover:bg-white/95 dark:hover:bg-[#0a0f1c]/95 transition-all duration-500 overflow-hidden"
            >
              {/* Animated subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 dark:bg-slate-900 text-blue-600 dark:text-blue-400 rounded-[1.25rem] flex items-center justify-center text-3xl sm:text-4xl mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                  {service.desc}
                </p>
              </div>
              
              {/* Bottom colored border accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
