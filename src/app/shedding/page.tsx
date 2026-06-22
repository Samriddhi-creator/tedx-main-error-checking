"use client"
import React from 'react';
import { Bebas_Neue, Space_Grotesk, Fredoka } from 'next/font/google';
import Link from 'next/link'
import { ArrowLeft } from "lucide-react";

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
      className={`${fredoka.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} bg-cover bg-top min-h-screen w-full relative flex flex-col items-center pt-6 pb-12 px-4 sm:px-6 lg:px-8`}
      style={{ 
        backgroundImage: "url('/image 62.png')",
        backgroundPosition: "center 20%"
      }}
    > 
      
      {/* Maximum Width Wrapper to align content cleanly */}
      <div className="w-full max-w-6xl z-10 flex flex-col items-start mt-4 sm:mt-8">
        
        {/* Go back button - Kept perfectly at the top-left corner */}
        <div className="mb-8 sm:mb-12">
          <Link 
            className="text-lg sm:text-2xl font-medium tracking-wide flex items-center text-[#EB0028CC] hover:text-[#ff3355] transition-colors gap-2 font-[family-name:var(--font-space-grotesk)] hover:underline" 
            href="/past-editions"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Go Back</span>
          </Link>
        </div>

        {/* Heading Container */}
        <div className="flex flex-col bg-transparent pt-12 sm:pt-20 md:pt-28 w-full text-left select-none font-[family-name:var(--font-bebas-neue)] tracking-widest">
          {/* Main SHEDDING OFF FEATHERS Heading */}
          <h1 className="font-extrabold text-white text-5xl sm:text-7xl md:text-8xl scale-y-125 uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] origin-left">
            SHEDDING OFF
          </h1>
          <h1 className="font-extrabold text-[#EB0028] text-5xl sm:text-7xl md:text-8xl scale-y-125 uppercase mt-3 sm:mt-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] origin-left">
            FEATHERS
          </h1>
        </div>

        {/* About the Theme Box */}
        <div className="w-full mt-24 sm:mt-36 md:mt-120 mb-8"> 
          {/* The main box panel */}
          <div className="flex flex-col p-6 sm:p-8 md:p-12 bg-[#BC1918]/10 border border-[#EB0028CC] sm:border-2 rounded-2xl items-center text-white shadow-2xl ">
            
            {/* Heading */}
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-5xl md:text-6xl tracking-wide text-center mb-6 uppercase">
              ABOUT THE THEME
            </h2>

            {/* Quote Container */}
            <div className="w-full max-w-3xl text-center mb-8 font-serif">
              <p className="text-base sm:text-xl md:text-2xl text-gray-100 italic font-light leading-relaxed">
                "The secret of change is to focus all your energy not on fighting the old but on building the new"
              </p>
              {/* Socrates Attribution aligned cleanly */}
              <div className="text-right w-full mt-3 pr-4 sm:pr-8">
                <span className="text-sm sm:text-base md:text-lg text-gray-300 italic font-light">
                  - Socrates
                </span>
              </div>
            </div>

            {/* Main Description Body Paragraphs */}
            <div className="font-[family-name:var(--font-space-grotesk)] text-sm sm:text-base md:text-lg lg:text-xl text-center text-gray-200 max-w-4xl space-y-6 leading-relaxed">
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
    </div>
  );
}