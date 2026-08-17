"use client";

import { FiPhone, FiMail, FiFacebook, FiLinkedin, FiInstagram, FiGithub, FiArrowUp } from "react-icons/fi";
import Image from "next/image";
import logoFull from "../assets/logo-full.png";
import logoDark from "../assets/logo-dark.png";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-white dark:bg-[#030712] text-slate-900 dark:text-white py-8 border-t border-slate-100 dark:border-white/5 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand & Socials */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-3">
              <Image
                src={logoFull}
                alt="ByteBlade Logo"
                height={28}
                sizes="(max-width: 768px) 80px, 120px"
                className="h-6 sm:h-7 w-auto object-contain block dark:hidden"
              />
              <Image
                src={logoDark}
                alt="ByteBlade Logo"
                height={28}
                sizes="(max-width: 768px) 80px, 120px"
                className="h-6 sm:h-7 w-auto object-contain hidden dark:block"
              />
            </div>
            
            <div className="flex gap-2">
              {[
                { Icon: FiGithub, label: "GitHub", href: "https://github.com/byte-blade-coder" },
                { Icon: FiLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ahmed-raza-05b89a30a" },
                { Icon: FiFacebook, label: "Facebook", href: "https://www.facebook.com/people/Byte-Blade/61593103071784/" },
                { Icon: FiInstagram, label: "Instagram", href: "https://www.instagram.com/blade.byte/" }
              ].map(({ Icon, label, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all duration-300 group">
                  <Icon size={14} className="transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright & Info */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] opacity-80">
              &copy; {new Date().getFullYear()} Byte Blade
            </p>
            
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10 hidden md:block"></div>
            
            <a href="mailto:mrahmedrazabaig@gmail.com" className="text-slate-500 dark:text-slate-400 text-[10px] font-bold hover:text-blue-600 transition-colors">
              mrahmedrazabaig@gmail.com
            </a>
            
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300 shadow-lg shadow-blue-600/30"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Back To Top</span>
              <FiArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}


export default Footer;
