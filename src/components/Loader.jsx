"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Loader = ({ done }) => {
  const loaderRef = useRef(null);

  // Fade in on mount
  useGSAP(() => {
    gsap.fromTo(loaderRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }
    );
  }, { scope: loaderRef });

  // Fade out when App signals done
  useEffect(() => {
    if (done && loaderRef.current) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }
  }, [done]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999999] flex items-center justify-center bg-[#e0e5ec] dark:bg-slate-950"
    >
      <section className="loader">
        <div className="slider" style={{ "--i": 0 }}></div>
        <div className="slider" style={{ "--i": 1 }}></div>
        <div className="slider" style={{ "--i": 2 }}></div>
        <div className="slider" style={{ "--i": 3 }}></div>
        <div className="slider" style={{ "--i": 4 }}></div>
      </section>
      <style>{`
        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
        }

        .slider {
          overflow: hidden;
          background-color: #e0e5ec;
          margin: 0 15px;
          height: 80px;
          width: 20px;
          border-radius: 30px;
          box-shadow: 15px 15px 20px rgba(0, 0, 0, 0.1), -15px -15px 30px #fff,
            inset -5px -5px 10px rgba(0, 0, 255, 0.1),
            inset 5px 5px 10px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .dark .slider {
          background-color: #0b1121;
          box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5), -10px -10px 20px rgba(255, 255, 255, 0.05),
            inset -5px -5px 10px rgba(0, 0, 255, 0.1),
            inset 5px 5px 10px rgba(0, 0, 0, 0.3);
        }

        .slider::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 20px;
          width: 20px;
          border-radius: 100%;
          box-shadow: inset 0px 0px 0px rgba(0, 0, 0, 0.3),
            0px 420px 0 400px var(--primary-600, #2697f3),
            inset 0px 0px 0px rgba(0, 0, 0, 0.1);
          animation: animate_2 2.5s ease-in-out infinite;
          animation-delay: calc(-0.5s * var(--i));
        }

        @keyframes animate_2 {
          0%   { transform: translateY(250px); filter: hue-rotate(0deg); }
          50%  { transform: translateY(0); }
          100% { transform: translateY(250px); filter: hue-rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
