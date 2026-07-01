"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from "lucide-react";

export default function TedxThemeSection() {
  return (
    <>
       {/* 1. FIXED BUTTON: Always stays in place, size scales with screen */}
      <div className="absolute top-14 left-6 sm:top-14 sm:left-10 md:top-20 md:left-10 lg:left-11 lg:top-19 z-[100]">
        <Link 
          className="text-[#EB0028] hover:text-[#EB0028CC] transition-colors" 
          href="/past-editions"
          onClick={(e) => {
            if (typeof window !== "undefined" && window.history.length > 1) {
              e.preventDefault();
              window.history.back();
            }
          }}
        >
          {/* Responsive sizing: scales from 40px to 64px based on screen */}
          <ChevronLeft className="w-8 h-8 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-17 lg:h-17" />
        </Link>
      </div>
  
  
      <div
        className="relative flex w-full flex-col items-center bg-black bg-cover bg-top min-h-screen overflow-hidden"
        style={{ 
          backgroundImage: "url('/image 59 (1).png')",
          backgroundPosition:"center 20%"
         
        }}
      >
        {/* Main Content Wrapper - Added pt-20 to ensure content doesn't hit the button */}
        <div className="w-full max-w-7xl z-10 flex flex-col items-start px-4 sm:px-6 lg:px-8 pt-20 md:pt-32 relative">
          
          {/* 1. Heading Container */}
          <div className="relative text-left w-full z-10 flex flex-col leading-[0.9] select-none">
            <h1 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-bold tracking-widest text-white uppercase leading-none">
              <span
                className="relative animate-glow-pulse animate-flicker block sm:inline"
                style={{
                  textShadow: `0 0 4px #fff, 0 0 10px #ff2a2a, 0 0 20px #ff2a2a, 0 0 40px #ff0000, 0 0 80px #cc0000`,
                }}
              >
                META
              </span>
              <span className="block sm:inline">MORPHOSIS</span>
            </h1>
          </div> 

          {/* 2. About the Theme Box */}
          <div className="w-full mt-70 sm:mt-100 md:mt-140 lg:mt-180 mb-16 z-10">
            <div className="flex flex-col p-6 sm:p-8 md:p-12 bg-[#BC1918]/10 border-2 sm:border-[3px] border-[#EB0028CC] rounded-2xl items-start text-white shadow-2xl">
              <h2 className="font-bebas text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] text-left mb-6 tracking-wide w-full">
                ABOUT THE THEME
              </h2>
              <p className="font-space text-[15px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-left text-gray-200 leading-relaxed max-w-5xl w-full">
                The 2nd edition of TEDxIIT Patna, Metamorphosis, embraced the idea that permanence is an illusion — that everything in existence is in a constant state of becoming. Change is not something to resist, but to understand; it often holds within it the potential for growth, renewal, and transformation.
                <br /><br />
                The edition brought together experts who reflected on the impact of rapid, often disruptive changes in technology, entertainment, and — most profoundly — on people and societal values.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}