"use client"
import React from 'react';
import { Bebas_Neue, Space_Grotesk, Fredoka } from 'next/font/google';
import Link from 'next/link';
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
      className={`${fredoka.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} bg-cover bg-top min-h-screen w-full relative flex flex-col items-center pt-6 pb-12 px-6 sm:px-8 md:px-12 overflow-hidden  ml-2 sm:ml-8 md:ml-9 lg:ml-10 -mt-17 `}
      style={{ 
        backgroundImage: "url('/image 62.png')",
        backgroundPosition: "top right"
      }}
    > 
      
      {/* Maximum Width Wrapper to align content cleanly */}
      <div className="w-full max-w-6xl mx-auto z-10 flex flex-col items-start mt-4 sm:mt-8">
        
      

        {/* Heading Container */}
        <div className="flex flex-col bg-transparent pt-8 sm:pt-16 md:pt-24 w-full text-left select-none font-[family-name:var(--font-bebas-neue)] tracking-widest">
          {/* Main SHEDDING OFF FEATHERS Heading */}
          <h1 className="font-extrabold text-white text-5xl sm:text-7xl md:text-8xl uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] origin-left">
            SHEDDING OFF
          </h1>
          <h1 className="font-extrabold text-[#EB0028] text-5xl sm:text-7xl md:text-8xl uppercase mt-3 sm:mt-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] origin-left">
            FEATHERS
          </h1>
        </div>

        {/* About the Theme Box */}
        <div className="w-full mt-70 sm:mt-90 md:mt-120 lg:mt-140 mb-8 z-10"> 
          {/* The main box panel - Left aligned contents */}
          <div className="flex flex-col p-6 sm:p-8 md:p-12 bg-[#BC1918]/10 border-[2px] sm:border-[3px] border-[#EB0028CC] rounded-2xl items-start text-white shadow-2xl ">
            
            {/* Heading */}
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl md:text-6xl tracking-wide text-left mb-6 uppercase w-full">
              ABOUT THE THEME
            </h2>

            {/* Quote Container */}
            <div className="w-full max-w-4xl text-left mb-8 font-serif">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 italic font-light leading-relaxed">
                "The secret of change is to focus all your energy not on fighting the old but on building the new"
              </p>
              {/* Socrates Attribution */}
              <div className="text-left sm:text-right w-full mt-3 sm:pr-8">
                <span className="text-sm sm:text-base md:text-lg text-[#EB0028] font-sans font-medium tracking-wide">
                  — Socrates
                </span>
              </div>
            </div>

            {/* Main Description Body Paragraphs */}
            <div className="font-[family-name:var(--font-space-grotesk)] text-sm sm:text-base md:text-xl lg:text-2xl text-left text-gray-200 max-w-5xl space-y-6 leading-relaxed w-full">
              <p>
                TEDxIITPatna believes that building anything new is possible when we let go of the old. 
                Just as birds shed their feathers, allowing the new ones to embrace, taking them afresh 
                to infinite skies, bringing out change is an inevitable part of one’s life to keep walking 
                the course of life. A change within us to become better.
              </p>
              <p>
                A change within the society to make this a better place to live in.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div></>
  );
}