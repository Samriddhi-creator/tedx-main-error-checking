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
    <div
      className={`${fredoka.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} font-sans bg-cover bg-top min-h-screen w-full relative flex flex-col items-center pb-16 px-4 sm:px-6 lg:px-8`}
      style={{ 
        backgroundImage: "url('/image 60.png')",
        backgroundPosition: "center 20%"
      }}
    > 
      {/* Maximum Width Wrapper */}
      <div className="w-full max-w-6xl z-10 flex flex-col items-start mt-6 sm:mt-10 relative">
        
        {/* Go back button - ONLY this container was adjusted to fix the position */}
        <div className="w-full mb-8 sm:mb-12">
          <Link 
            className="items-center text-[#EB0028] hover:text-[#EB0028CC] font-space flex flex-row gap-2 transition-colors" 
            href="/past-editions"
            onClick={(e) => {
              // Safely check if window exists to prevent build errors
              if (typeof window !== "undefined" && window.history.length > 1) {
                e.preventDefault();
                window.history.back();
              }
            }}
          >
            <ChevronLeft size={50} />
          </Link>
        </div>

        {/* Heading Container - Original negative margins restored */}
        <div className="flex flex-col bg-transparent pt-8 sm:pt-12 w-full -ml-2 sm:-ml-4 md:-ml-8">
          {/* Main ROAR Heading with Responsive Text Sizes */}
          <h1 className="text-[60px] sm:text-[90px] md:text-[120px] font-black tracking-wide uppercase select-none flex items-center cursor-pointer scale-y-125 drop-shadow-[0_0_15px_rgba(229,83,116,0.3)] leading-none origin-left">
            
            {/* R Component */}
            <span className="bg-gradient-to-b from-[#f9aabd] to-[#A21A3F] bg-clip-text text-transparent transition-transform duration-300 hover:scale-110">
              R
            </span>

            {/* Custom Stylized O Container */}
            <span className="relative inline-flex items-center justify-center mx-1 sm:mx-2 px-2 sm:px-4 h-[85px] sm:h-[130px] md:h-[170px] w-[65px] sm:w-[100px] md:w-[130px]">
              
              {/* Left Ear */}
              <span 
                className="absolute top-[8%] left-[20%] w-0 h-0 
                           border-l-[6px] sm:border-l-[10px] border-l-transparent 
                           border-r-[6px] sm:border-r-[10px] border-r-transparent 
                           border-b-[10px] sm:border-b-[16px] border-b-[#f9aabd] 
                           rotate-[-15px] transform origin-bottom select-none"
              />
              
              {/* Right Ear */}
              <span 
                className="absolute top-[8%] right-[20%] w-0 h-0 
                           border-l-[6px] sm:border-l-[10px] border-l-transparent 
                           border-r-[6px] sm:border-r-[10px] border-r-transparent 
                           border-b-[10px] sm:border-b-[16px] border-b-[#f9aabd] 
                           rotate-[15px] transform origin-bottom select-none"
              />
              
              {/* Left Claw Curve */}
              <span className="absolute left-0 text-[55px] sm:text-[85px] md:text-[110px] font-light text-[#d05471] scale-y-95 opacity-90 normal-case select-none">(</span>
              
              {/* Center Letter O */}
              <span className="relative z-10 bg-gradient-to-b from-[#f9aabd] to-[#A21A3F] bg-clip-text text-transparent transition-transform duration-300 hover:scale-110">
                O
              </span>
              
              {/* Right Claw Curve */}
              <span className="absolute right-0 text-[55px] sm:text-[85px] md:text-[110px] font-light text-[#d05471] scale-y-95 opacity-90 normal-case select-none">)</span>
            </span>

            {/* AR Component */}
            <span className="bg-gradient-to-b from-[#f9aabd]  to-[#A21A3F] bg-clip-text text-transparent transition-transform duration-300 hover:scale-110">
              A
            </span>
            <span className="bg-gradient-to-b from-[#f9aabd]  to-[#A21A3F] bg-clip-text text-transparent transition-transform duration-300 hover:scale-110">
              R
            </span>
          </h1>

          {/* Tagline - Stretched tracking and mobile line-break applied */}
          <p 
            className="text-[40px] sm:text-lg md:text-[20px] font-medium tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] lowercase mt-4 sm:mt-2
                       bg-gradient-to-r from-[#e55374] to-[#b61b40] 
                       bg-clip-text text-transparent transition-transform duration-300 hover:scale-105 origin-left text-left w-full scale-y-125"
          >
            the acoustics{" "}
            <span className="block sm:inline">of strength</span>
          </p>
        </div>

        {/* About the theme Box */}
        <div className="w-full mt-40 sm:mt-60 md:mt-160 mb-8 z-10"> 
          <div className="flex flex-col p-6 sm:p-8 md:p-12 bg-[#BC1918]/10 border-[3px] border-[#EB0028CC] rounded-2xl items-start md:items-center text-white shadow-2xl ">
            {/* Shifted text to left on mobile, centered on md and up */}
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-left md:text-center mb-6 tracking-wide w-full">
              ABOUT THE THEME
            </h2>
            <p className="font-[family-name:var(--font-space-grotesk)] text-sm sm:text-base md:text-xl lg:text-2xl text-left md:text-center text-gray-200 leading-relaxed max-w-4xl mx-auto w-full">
              The 3rd edition of TEDxIIT Patna, Roar – The Acoustics of Strength, celebrated the enduring spirit of resilience and the inner voice that refuses to be silenced. It echoed the truth that the stronger one’s conviction, the greater their untapped potential. 
              <br /><br />
              Roar was a call to liberate the self, summon spiritual courage, and embrace a mindset forged not in silence, but in the sound of fearless becoming.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}