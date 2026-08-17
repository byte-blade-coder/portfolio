"use client";

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppWidget = () => {
  // Replace this placeholder with the actual WhatsApp number including country code (e.g., 923001234567)
  const whatsappNumber = "923202108037"; 
  const message = encodeURIComponent("Hi Ahmed! I want to discuss a project.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/50 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
      
      <FaWhatsapp className="w-8 h-8 md:w-10 md:h-10 z-10" aria-hidden="true" />

      {/* Tooltip on Hover */}
      <span className="absolute right-full mr-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block border border-slate-200 dark:border-white/10">
        Let&apos;s Chat!
        {/* Triangle Arrow */}
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white dark:bg-slate-800 rotate-45 border-t border-r border-slate-200 dark:border-white/10"></div>
      </span>
    </a>
  );
};

export default WhatsAppWidget;
