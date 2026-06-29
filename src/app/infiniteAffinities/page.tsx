"use client";

import React from 'react';
import Link from "next/link";
import { Bebas_Neue, Space_Grotesk, Fredoka } from 'next/font/google';
import { ChevronLeft } from "lucide-react";
export const bebasNeue = Bebas_Neue({
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-bebas-neue', 
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk', 
});

export const fredoka = Fredoka({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-fredoka',
});

export default function TedxThemeSection() {
  return (
    <div
      className={`${fredoka.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} bg-cover bg-top min-h-screen w-full relative flex flex-col pb-16 px-4 sm:px-6 lg:px-8`}
      style={{ 
        backgroundImage: "url('/image%2058.png')", 
        backgroundPosition: "center 30%"
      }}
    >
      {/* Central Wrapper for Large Screens */}
      <div className="w-full max-w-6xl mx-auto flex flex-col">
         <div className="w-full flex justify-start mt-4 -ml-2 sm:-ml-4 md:-ml-8">
        <Link 
          className="inline-flex items-center text-[#EB0028] hover:text-[#EB0028CC] font-space gap-2 transition-colors" 
          href="/past-editions"
          onClick={(e) => {
            if (typeof window !== "undefined" && window.history.length > 1) {
              e.preventDefault();
              window.history.back();
            }
          }}
        >
          <ChevronLeft size={50} />
        </Link>
      </div>
        
        {/* 1. Heading Container */}
        <div className="relative pt-8 sm:pt-16 md:pt-20 text-left w-full z-10 flex flex-col leading-[0.9] select-none">
          
          {/* Main INFINITE Heading */}
          <h1 
            className="font-['var(--font-panton-caps)',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#ed5e76] [-webkit-text-stroke:1px_rgba(255,255,255,0.6)] uppercase"
          >
            INFINITE
          </h1>
          
          {/* Main AFFINITIES Heading */}
          <h1 
            className="font-['var(--font-panton-caps)',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black [-webkit-text-stroke:1px_#ffffff] sm:[-webkit-text-stroke:2px_#ffffff] text-transparent tracking-widest uppercase mt-2 sm:mt-0"
          >
            AFFINITIES
          </h1>
        </div>

        {/* 2. About the Theme Box */}
        <div className="w-full mt-[250px] sm:mt-[280px] md:mt-[500px] mb-8 z-10">
          <div className="flex flex-col p-6 sm:p-8 md:p-12 bg-[#BC1918]/10 border-2 sm:border-3 border-[#EB0028CC] rounded-2xl items-center text-white shadow-2xl ">
            
            <h2 className="[font-family:var(--font-bebas-neue)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-center mb-4 sm:mb-6 tracking-wider">
              ABOUT THE THEME
            </h2>
            
            <p className="[font-family:var(--font-space-grotesk)] text-sm sm:text-base md:text-lg lg:text-2xl text-center text-gray-200 leading-relaxed max-w-4xl mx-auto">
              We at TEDxIITPatna believe that dreams can become reality when everyone works together.
              We are an amalgamation of ideas - intertwined by the bonds we share. Through 
              Infinite Affinities, we celebrate unity and the spirit of togetherness.
              <br /><br />
              We are human only through the humanity of others. If we are to 
              accomplish anything—it will, in equal measure, be due to the work 
              and achievements of the entire community. We all have a role to play and it's 
              vital that our actions inspire others to want to be a part of a better and brighter future.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}