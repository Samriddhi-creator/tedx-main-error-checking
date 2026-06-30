"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from "lucide-react";

export default function TedxThemeSection() {
  return (
    <div
      className="relative flex w-full flex-col items-center bg-black bg-cover bg-top pb-16 px-4 sm:px-6 lg:px-8 min-h-screen overflow-hidden"
      style={{ 
        backgroundImage: "url('/image 59 (1).png')",
        backgroundPosition: "center 20%" 
      }}
    >
      {/* Maximum Width Wrapper - Restored your original classes (no mx-auto) */}
      <div className="w-full max-w-7xl z-10 flex flex-col items-start mt-6 sm:mt-10 relative">
        
        {/* Go back button - ONLY this container is adjusted to fix the position */}
        <div className="w-full mb-8 sm:mb-12">
          <Link 
            className="items-center text-[#EB0028] hover:text-[#EB0028CC] font-space flex flex-row gap-2 transition-colors sm:ml-5 md:ml-15" 
            href="/past-editions"
            onClick={(e) => {
              // Safely check if window exists to prevent SSR crashes
              if (typeof window !== "undefined" && window.history.length > 1) {
                e.preventDefault();
                window.history.back();
              }
            }}
          >
            <ChevronLeft size={50} />
          </Link>
        </div>

        {/* 1. Heading Container - Restored your original negative margins */}
        <div className="relative pt-10 sm:pt-20 text-left select-none w-full -ml-1 sm:-ml-2">
          <h1 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-bold tracking-widest text-white uppercase leading-none">
            <span
              className="relative font-bold uppercase tracking-wide text-white animate-glow-pulse animate-flicker block sm:inline"
              style={{
                textShadow: `
                  0 0 4px #fff,
                  0 0 10px #ff2a2a,
                  0 0 20px #ff2a2a,
                  0 0 40px #ff0000,
                  0 0 80px #cc0000
                `,
              }}
            >
              META
            </span>
            <span className="block sm:inline">MORPHOSIS</span>
          </h1>
        </div> 

        {/* 2. About the Theme Box */}
        <div className="w-full mt-60 sm:mt-64 md:mt-180 mb-8 z-10">
          <div className="flex flex-col p-6 sm:p-8 md:p-12 bg-[#BC1918]/10 border-2 sm:border-[3px] border-[#EB0028CC] rounded-2xl items-start text-white shadow-2xl ">
            {/* Heading left-aligned */}
            <h2 className="font-bebas text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] text-left mb-6 tracking-wide w-full">
              ABOUT THE THEME
            </h2>
       
            {/* Text left-aligned and responsive */}
            <p className="font-space text-[15px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-left text-gray-200 leading-relaxed max-w-5xl w-full">
              The 2nd edition of TEDxIIT Patna, Metamorphosis,
              embraced the idea that permanence is an illusion — that
              everything in existence is in a constant state of 
              becoming. Change is not something to resist, but to
              understand; it often holds within it the potential for 
              growth, renewal, and transformation.
              <br /><br />
              The edition brought together experts who reflected on
              the impact of rapid, often disruptive changes in
              technology, entertainment, and — most profoundly — on
              people and societal values.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}