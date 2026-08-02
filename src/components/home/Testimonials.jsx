import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Hamza Tariq",
    role: "CEO, TechVerse",
    text: "Ahmed's attention to detail is unmatched. He delivered our platform ahead of schedule with perfect execution! An absolute master of his craft.",
    rating: 5,
    avatar: "HT",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    name: "Fatima Noor",
    role: "Founder, Innovate PK",
    text: "The cleanest code I've ever seen. Finding a developer who understands both premium design and crazy performance is a rare gem.",
    rating: 5,
    avatar: "FN",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Usman Ali",
    role: "CTO, StartupX",
    text: "Incredible communication and outstanding final product. Outperformed all our expectations and elevated our brand's digital presence completely.",
    rating: 5,
    avatar: "UA",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    name: "Ayesha Khan",
    role: "Product Manager",
    text: "Ahmed transformed our laggy legacy system into a high-performance modern web app. The user retention skyrocketed within weeks.",
    rating: 5,
    avatar: "AK",
    color: "from-emerald-400 to-teal-500",
  }
];

function Testimonials() {
  const container = useRef(null);
  const textRef = useRef(null);
  const bgQuoteRef = useRef(null);
  const bgTextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeTestimonial = testimonials[activeIndex];

  useGSAP(() => {
    // Scroll-scrubbed header reveal
    gsap.fromTo(".t-header",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );

  }, { scope: container });

  // Handle slide change animations
  const changeSlide = (newIndex) => {
    if (isAnimating || newIndex === activeIndex) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(newIndex);
        setIsAnimating(false);
      }
    });

    // Fade out current text
    tl.to(textRef.current, {
      opacity: 0,
      y: -20,
      filter: "blur(10px)",
      duration: 0.4,
      ease: "power2.inOut"
    });

    // The state updates here via onComplete, wait a tiny bit then fade new one in
    // This is handled by a useEffect reacting to activeIndex
  };

  useEffect(() => {
    if (textRef.current && !isAnimating) {
      gsap.fromTo(textRef.current, 
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
      );
    }
  }, [activeIndex, isAnimating]);

  // Auto loop the slider every 5 seconds
  useEffect(() => {
    const autoLoop = setInterval(() => {
      if (!isAnimating) {
        changeSlide((activeIndex + 1) % testimonials.length);
      }
    }, 5000);
    return () => clearInterval(autoLoop);
  }, [activeIndex, isAnimating]);

  const nextSlide = () => changeSlide((activeIndex + 1) % testimonials.length);
  const prevSlide = () => changeSlide((activeIndex - 1 + testimonials.length) % testimonials.length);

  return (
    <div ref={container} className="relative w-full py-12 md:py-24 bg-white dark:bg-[#030712] overflow-hidden transition-colors">
      

      <div className="mx-auto w-[90%] md:w-[85%] max-w-7xl relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-24 items-start mt-4 md:mt-10">
        
        {/* Left Side: Header & Controls */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div>
            <h3 className="t-header text-sm font-black uppercase tracking-[0.3em] text-blue-500 mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-blue-500"></span>
              Social Proof
            </h3>
            <h2 className="t-header text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] text-left">
              Client<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-600">
                Stories.
              </span>
            </h2>
            <p className="t-header text-slate-600 dark:text-slate-400 mt-6 text-lg font-medium max-w-sm leading-relaxed">
              Real feedback from the incredible people and visionary massive brands I've had the pleasure to work with.
            </p>
          </div>

          <div className="t-header flex items-center gap-4 mt-4">
            <button 
              onClick={prevSlide}
              className="w-14 h-14 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:scale-110 transition-all duration-300 backdrop-blur-md"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-14 h-14 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:scale-110 transition-all duration-300 backdrop-blur-md"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="t-header flex items-center gap-3 mt-2 md:mt-4 pl-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => changeSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-500 rounded-full ${
                  idx === activeIndex 
                    ? "w-8 md:w-12 h-2 bg-blue-600 dark:bg-blue-500" 
                    : "w-2 h-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Dynamic Interactive Display */}
        <div className="w-full lg:w-2/3 relative min-h-[320px] sm:min-h-[400px] flex items-start pt-0 lg:pt-1">
          
          {/* Animated Glow Behind Text */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-gradient-to-tr ${activeTestimonial.color} opacity-5 blur-[120px] rounded-full transition-colors duration-1000 -z-10`} />

          <div className="relative w-full">
            {/* Stars */}
            <div className="flex gap-2 mb-4 md:mb-8">
              {[...Array(activeTestimonial.rating)].map((_, idx) => (
                <Star key={idx} size={20} className="fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Dynamic Morphing Text */}
            <div ref={textRef} className="will-change-transform flex flex-col gap-6 md:gap-10">
              <div className="min-h-[100px] sm:min-h-[140px] md:min-h-[180px] lg:min-h-[180px] xl:min-h-[160px] flex items-start">
                <h4 className="text-lg sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[38px] text-slate-900 dark:text-white/95 font-medium italic leading-[1.3] tracking-tight mb-4 md:mb-8 font-serif">
                  {activeTestimonial.text}
                </h4>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${activeTestimonial.color} flex items-center justify-center text-xl font-black text-white shadow-2xl shadow-blue-500/20 shrink-0`}>
                  {activeTestimonial.avatar}
                </div>
                <div>
                  <h5 className="text-lg md:text-xl font-black text-slate-900 dark:text-white">{activeTestimonial.name}</h5>
                  <span className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mt-1 block">
                    {activeTestimonial.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Testimonials;
