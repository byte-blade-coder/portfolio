"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import logoFull from "../assets/logo-full.png";
import logoDark from "../assets/logo-dark.png";

gsap.registerPlugin(ScrollTrigger);


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");
  const [previousActive, setPreviousActive] = useState("#hero");
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const navItemRefs = useRef({});

  const menuItems = [
    { name: "Home", path: "#hero" },
    { name: "Services", path: "#services" },
    { name: "Projects", path: "/projects" },
    { name: "Testimonials", path: "#testimonials" },
    { name: "About Us", path: "#about" },
    { name: "Contact", path: "#cta" },
  ];

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (path.startsWith("/")) {
      setActiveHash(path);
      router.push(path);
    } else {
      if (pathname !== "/" && pathname !== "/home") {
        setActiveHash(path);
        router.push("/" + path);
      } else {
        setActiveHash(path);
        const element = document.querySelector(path);
        if (element) {
          const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    }
  };

  // Optimized scroll tracking on homepage using ScrollTrigger.create (no empty tweens)
  useGSAP(() => {
    if (pathname !== "/" && pathname !== "/home") return;
    const sections = document.querySelectorAll("section[id], div[id='hero']");
    
    const triggers = Array.from(sections).map((section) => {
      return ScrollTrigger.create({
        trigger: section,
        start: "top 40%",
        end: "bottom 40%",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveHash(`#${section.id}`);
          }
        }
      });
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/projects") {
      setActiveHash("/projects");
    } else {
      setActiveHash("#hero");
    }
  }, [pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);



  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.from(".mobile-link", {
        y: 15,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.1
      });
    } else {
      gsap.to(mobileMenuRef.current, { 
        height: 0, 
        opacity: 0, 
        duration: 0.3, 
        ease: "power2.in" 
      });
    }
  }, [isOpen]);

  // Navbar entrance animation
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -50,
      duration: 1,
      ease: "power3.out",
      delay: 0.1
    });
  }, []);

  const handleLogoHover = (e) => {
    gsap.to(e.currentTarget, { rotate: 180, scale: 1.1, duration: 0.5 });
  };

  const handleLogoLeave = (e) => {
    gsap.to(e.currentTarget, { rotate: 0, scale: 1, duration: 0.5 });
  };

  const handleLinkTap = (e) => {
    gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
  };

  // Wobble effect for active navigation item
  useGSAP(() => {
    if (activeHash !== previousActive && previousActive) {
      const activeRef = navItemRefs.current[activeHash];
      if (activeRef) {
        // Kill any existing animations on this element
        gsap.killTweensOf(activeRef);
        
        // Create jelly-like left-right wobble timeline
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(activeRef, { x: 0, scaleX: 1, scaleY: 1 });
            setPreviousActive(activeHash);
          }
        });
        
        tl.to(activeRef, {
          x: 2,
          scaleX: 0.98,
          scaleY: 1.02,
          duration: 0.15,
          ease: "power2.out"
        })
        .to(activeRef, {
          x: -2,
          scaleX: 1.02,
          scaleY: 0.98,
          duration: 0.3,
          ease: "sine.inOut"
        })
        .to(activeRef, {
          x: 1,
          scaleX: 0.99,
          scaleY: 1.01,
          duration: 0.2,
          ease: "sine.inOut"
        })
        .to(activeRef, {
          x: -1,
          scaleX: 1.01,
          scaleY: 0.99,
          duration: 0.2,
          ease: "sine.inOut"
        })
        .to(activeRef, {
          x: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.25,
          ease: "power2.inOut"
        });
      } else {
        // Fallback: update previous state even if ref not found
        setPreviousActive(activeHash);
      }
    }
  }, [activeHash, previousActive]);

  // Wobble effect for active item - temporarily disabled
  // useGSAP(() => {
  //   if (activeHash !== previousActive && previousActive) {
  //     const activeElement = document.querySelector(`a[href="${activeHash}"]`);
  //     if (activeElement) {
  //       gsap.fromTo(activeElement,
  //         { rotate: 0, scale: 1 },
  //         {
  //           rotate: 5,
  //           scale: 1.05,
  //           duration: 0.15,
  //           yoyo: true,
  //           repeat: 3,
  //           ease: "power2.inOut",
  //           onComplete: () => {
  //             gsap.set(activeElement, { rotate: 0, scale: 1 });
  //           }
  //         }
  //       );
  //     }
  //     setPreviousActive(activeHash);
  //   }
  // }, [activeHash, previousActive]);

  return (
    <div className="fixed top-0 left-0 w-full pt-2 sm:pt-3 z-[100] px-2 sm:px-4">
      <nav
        ref={navRef}
        className="mx-auto border border-gray-100 dark:border-slate-800 shadow-2xl bg-white/95 dark:bg-[#0a0f1c] backdrop-blur-md dark:backdrop-blur-none overflow-hidden w-full max-w-7xl rounded-[25px] sm:rounded-[35px]"
      >
        <div className="px-3 sm:px-5 py-2 sm:py-2.5">
          <div className="flex justify-between items-center h-9 sm:h-10 md:h-12">

            {/* Logo Section */}
            <Link href="/" className="flex items-center group cursor-pointer shrink-0">
              <Image
                src={logoFull}
                alt="ByteBlade Logo"
                height={36}
                sizes="(max-width: 768px) 100px, 150px"
                className="h-6 sm:h-7 md:h-9 w-auto object-contain group-hover:scale-[1.03] transition-transform duration-300 block dark:hidden"
              />
              <Image
                src={logoDark}
                alt="ByteBlade Logo"
                height={36}
                sizes="(max-width: 768px) 100px, 150px"
                className="h-6 sm:h-7 md:h-9 w-auto object-contain group-hover:scale-[1.03] transition-transform duration-300 hidden dark:block"
              />
            </Link>

            <div className="hidden md:flex lg:hidden items-center gap-1">
              {menuItems.map((item) => {
                const isActive = activeHash === item.path;
                return (
                  <a
                    key={item.name}
                    ref={(el) => navItemRefs.current[item.path] = el}
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className="relative px-2 py-1.5 text-[10px] font-black tracking-tight transition-colors duration-300 min-w-[60px] text-center"
                  >
                    <span className={`relative z-10 ${isActive ? "text-white" : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"}`}>
                      {item.name}
                    </span>
                    {isActive && (
                      <div
                        className="active-pill absolute inset-0 bg-blue-600 rounded-full shadow-lg"
                      />
                    )}
                  </a>
                );
              })}
              <div className="ml-2 pl-2 border-l border-gray-100 dark:border-slate-800 relative z-30 pointer-events-auto">
                <ThemeToggle />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {menuItems.map((item) => {
                const isActive = activeHash === item.path;
                return (
                  <a
                    key={item.name}
                    ref={(el) => navItemRefs.current[item.path] = el}
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className="relative px-4 sm:px-5 py-2 text-[12px] sm:text-[14px] lg:text-[15px] font-black tracking-tight transition-colors duration-300 min-w-[80px] text-center"
                  >
                    <span className={`relative z-10 ${isActive ? "text-white" : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"}`}>
                      {item.name}
                    </span>
                    {isActive && (
                      <div
                        className="active-pill absolute inset-0 bg-blue-600 rounded-full shadow-lg"
                      />
                    )}
                  </a>
                );
              })}
              <div className="ml-4 sm:ml-6 pl-4 sm:pl-6 border-l border-gray-100 dark:border-slate-800 relative z-30 pointer-events-auto">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Actions (Toggle + Theme) */}
            <div className="md:hidden flex items-center gap-2 sm:gap-3 relative z-30 pointer-events-auto">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseDown={handleLinkTap}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="p-1.5 sm:p-2 text-gray-900 dark:text-white focus:outline-none flex items-center justify-center transition-transform"
              >
                {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <div
            ref={mobileMenuRef}
            className="md:hidden overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <div className="flex flex-col gap-1.5 pb-3 sm:pb-4 mt-2 sm:mt-3 border-t border-gray-50 dark:border-slate-800 pt-3 sm:pt-4 px-1 sm:px-2">
              {menuItems.map((item) => {
                const isActive = activeHash === item.path;
                return (
                  <div key={item.name} className="mobile-link">
                    <a
                      href={item.path}
                      onClick={(e) => handleNavClick(e, item.path)}
                      className={`w-full block text-center py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-black tracking-tight transition-all
                        ${isActive
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-700 active:bg-blue-50 dark:text-gray-300 dark:active:bg-slate-800"
                        }`}
                    >
                      {item.name}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
