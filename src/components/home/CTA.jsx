"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const container = useRef(null);
  const leftSideRef = useRef(null);
  const formContainerRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useGSAP(() => {
    gsap.fromTo(".cta-info-item",
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: leftSideRef.current, start: "top 85%", toggleActions: "play none none none" }
      }
    );
    gsap.fromTo(formContainerRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: formContainerRef.current, start: "top 88%", toggleActions: "play none none none" }
      }
    );
  }, { scope: container });

  const handleInputFocus = (e) => gsap.to(e.currentTarget, { scale: 1.01, duration: 0.3 });
  const handleInputBlur = (e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
  const handleBtnHover = (e) => gsap.to(e.currentTarget, { y: -5, scale: 1.02, duration: 0.3, ease: "power2.out" });
  const handleBtnLeave = (e) => gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
  const handleBtnTap = (e) => gsap.to(e.currentTarget, { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  const inputClass = "w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl px-6 py-2.5 md:py-4 outline-none focus:border-[var(--primary-600)] focus:ring-1 focus:ring-[var(--primary-600)]/20 transition-all dark:text-white font-bold";

  return (
    <div ref={container} className="w-full py-10 md:py-16 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="w-[90%] md:w-[85%] max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div ref={leftSideRef} className="space-y-6 md:space-y-12">
            <div className="space-y-6">
              <h3 className="cta-info-item text-sm font-black uppercase tracking-[0.4em] text-[var(--primary-600)]">Get in Touch</h3>
              <h2 className="cta-info-item text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] text-left">
                Let&apos;s build <br /> <span className="text-[var(--primary-600)]">your dream.</span>
              </h2>
              <p className="cta-info-item text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium max-w-md leading-relaxed">
                Have a project in mind? Looking for a partner to build something extraordinary? Send me a message.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email Me", value: "mrahmedrazabaig@gmail.com" },
                { icon: MapPin, label: "Location", value: "Karachi, Pakistan" },
                { icon: Phone, label: "Phone", value: "+92 320 2108037" }
              ].map((item, idx) => (
                <div key={idx} className="cta-info-item flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-white/5 shadow-sm group-hover:bg-[var(--primary-600)] transition-colors duration-300">
                    <item.icon className="text-[var(--primary-600)] group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: FORM */}
          <div ref={formContainerRef} className="relative">


            <form
              onSubmit={handleSubmit}
              className="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[2rem] md:rounded-[2.5rem] pt-6 pb-4 md:pt-16 md:pb-12 px-6 md:px-12 space-y-2 md:space-y-6 shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-[10px] font-black uppercase tracking-widest text-[var(--primary-600)] ml-2">Name</label>
                  <input
                    id="contact-name" name="name" type="text" placeholder="John Doe"
                    value={formData.name} onChange={handleChange}
                    onFocus={handleInputFocus} onBlur={handleInputBlur}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-[10px] font-black uppercase tracking-widest text-[var(--primary-600)] ml-2">Email</label>
                  <input
                    id="contact-email" name="email" type="email" placeholder="john@example.com"
                    value={formData.email} onChange={handleChange}
                    onFocus={handleInputFocus} onBlur={handleInputBlur}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-subject" className="text-[10px] font-black uppercase tracking-widest text-[var(--primary-600)] ml-2">Subject</label>
                <input
                  id="contact-subject" name="subject" type="text" placeholder="Project Inquiry"
                  value={formData.subject} onChange={handleChange}
                  onFocus={handleInputFocus} onBlur={handleInputBlur}
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-[10px] font-black uppercase tracking-widest text-[var(--primary-600)] ml-2">Message</label>
                <textarea
                  id="contact-message" name="message" rows="3" placeholder="Tell me about your project..."
                  value={formData.message} onChange={handleChange}
                  onFocus={handleInputFocus} onBlur={handleInputBlur}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/30 rounded-2xl px-5 py-3 font-bold text-sm">
                  <CheckCircle size={18} />
                  Message sent! I&apos;ll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded-2xl px-5 py-3 font-bold text-sm">
                  <AlertCircle size={18} />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                onMouseEnter={handleBtnHover}
                onMouseLeave={handleBtnLeave}
                onMouseDown={handleBtnTap}
                style={{ backgroundColor: "var(--primary-600)" }}
                className="w-full text-white font-black py-3.5 md:py-5 rounded-2xl flex items-center justify-center gap-3 transition-shadow hover:shadow-[0_20px_40px_-10px_var(--primary-600)] shadow-xl mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <><Loader size={18} className="animate-spin" /> Sending...</>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CTA;
