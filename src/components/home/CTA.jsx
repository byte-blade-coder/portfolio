import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, MapPin, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const container = useRef(null);
  const leftSideRef = useRef(null);
  const formContainerRef = useRef(null);
  const bgTextRef = useRef(null);

  useGSAP(() => {
    // Scroll-scrubbed left side
    gsap.fromTo(".cta-info-item",
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: leftSideRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );

    // Scroll-scrubbed form
    gsap.fromTo(formContainerRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formContainerRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        }
      }
    );

  }, { scope: container });

  const handleInputFocus = (e) => {
    gsap.to(e.currentTarget, { scale: 1.01, duration: 0.3 });
  };

  const handleInputBlur = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
  };

  const handleBtnHover = (e) => {
    gsap.to(e.currentTarget, { y: -5, scale: 1.02, duration: 0.3, ease: "power2.out" });
  };

  const handleBtnLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleBtnTap = (e) => {
    gsap.to(e.currentTarget, { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 });
  };

  return (
    <div ref={container} className="w-full py-10 md:py-16 bg-white dark:bg-slate-950 relative overflow-hidden">

      <div className="w-[90%] md:w-[85%] max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE: TEXT & INFO */}
          <div
            ref={leftSideRef}
            className="space-y-6 md:space-y-12"
          >
            <div className="space-y-6">
              <h3 className="cta-info-item text-sm font-black uppercase tracking-[0.4em] text-[var(--primary-600)]">Get in Touch</h3>
              <h2 className="cta-info-item text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] text-left">
                Let's build <br /> <span className="text-[var(--primary-600)]">your dream.</span>
              </h2>
              <p className="cta-info-item text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium max-w-md leading-relaxed">
                Have a project in mind? Looking for a partner to build something extraordinary? Send me a message.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email Me", value: "mrahmedrazabaig@gmail.com", color: "blue" },
                { icon: MapPin, label: "Location", value: "Karachi, Pakistan", color: "purple" },
                { icon: Phone, label: "Phone", value: "+92 320 2108037", color: "green" }
              ].map((item, idx) => (
                <div key={idx} className="cta-info-item flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-white/5 shadow-sm group-hover:bg-[var(--primary-600)]">
                    <item.icon className="text-[var(--primary-600)] group-hover:text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: CONTACT FORM */}
          <div
            ref={formContainerRef}
            className="relative"
          >
            {/* Background Blob for Form */}
            <div className="absolute -inset-10 bg-[var(--primary-600)]/10 blur-[100px] rounded-full pointer-events-none"></div>

            <form className="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[2rem] md:rounded-[2.5rem] pt-6 pb-4 md:pt-16 md:pb-12 px-6 md:px-12 space-y-2 md:space-y-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--primary-600)] ml-2">Name</label>
                  <input
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl px-6 py-2.5 md:py-4 outline-none focus:border-[var(--primary-600)] focus:ring-1 focus:ring-[var(--primary-600)]/20 transition-all dark:text-white font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[var(--primary-600)] ml-2">Email</label>
                  <input
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl px-6 py-2.5 md:py-4 outline-none focus:border-[var(--primary-600)] focus:ring-1 focus:ring-[var(--primary-600)]/20 transition-all dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--primary-600)] ml-2">Subject</label>
                <input
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  type="text"
                  placeholder="Project Inquiry"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl px-6 py-2.5 md:py-4 outline-none focus:border-[var(--primary-600)] focus:ring-1 focus:ring-[var(--primary-600)]/20 transition-all dark:text-white font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--primary-600)] ml-2">Message</label>
                <textarea
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  rows="3"
                  placeholder="Tell me about your project..."
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl px-6 py-2.5 md:py-4 outline-none focus:border-[var(--primary-600)] focus:ring-1 focus:ring-[var(--primary-600)]/20 transition-all dark:text-white resize-none font-bold"
                ></textarea>
              </div>

              <button
                onMouseEnter={handleBtnHover}
                onMouseLeave={handleBtnLeave}
                onMouseDown={handleBtnTap}
                style={{ backgroundColor: 'var(--primary-600)' }}
                className="w-full text-white font-black py-3.5 md:py-5 rounded-2xl flex items-center justify-center gap-3 transition-shadow hover:shadow-[0_20px_40px_-10px_var(--primary-600)] shadow-xl mt-2"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}


export default CTA;

