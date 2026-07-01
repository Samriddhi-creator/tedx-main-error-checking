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
      className={`${fredoka.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} font-sans bg-cover bg-top min-h-screen w-full relative flex flex-col items-center pb-16 px-4 sm:px-6 lg:px-8 ml-2 sm:ml-8 md:ml-9 lg:ml-10 -mt-16 `}
      style={{ 
        backgroundImage: "url('/WhatsApp Image 2026-07-01 at 03.01.36 (1) copy.jpeg')",
       backgroundSize: 'cover',
        backgroundPosition: 'right top',
        
      }}
    > 
      {/* Maximum Width Wrapper */}
      <div className="w-full max-w-6xl z-10 flex flex-col items-start mt-6 sm:mt-10 relative">
        
        {/* Go back button - ONLY this container was adjusted to fix the position */}
      

        {/* Heading Container - Original negative margins restored */}
        <div className="flex flex-col bg-transparent pt-8 sm:pt-12 w-full -ml-2 sm:-ml-4 md:-ml-8">
          {/* Main ROAR Heading with Responsive Text Sizes */}
                   {/* Main ROAR Heading */}
          <h1 className="font-space text-[60px] sm:text-[100px] lg:text-[130px] font-bold tracking-wide uppercase flex items-center leading-none mt-12 md:mt-25">
            
            {/* R */}
            <span className="bg-[linear-gradient(150deg,#F1A1B4_50%,#CE1B42_68%,#64061A_100%)] bg-clip-text text-transparent transition-transform duration-300 hover:scale-105 origin-left text-left  scale-y-125  ">
              R
            </span>

            {/* Custom Stylized O Container */}
            <span className="relative inline-flex items-center justify-center mx-2 sm:mx-4 lg:mx-5 h-[60px] sm:h-[100px] lg:h-[130px] w-[60px] sm:w-[100px] lg:w-[130px] transition-transform duration-300 hover:scale-105 origin-left text-left  scale-y-125 ">
              
              {/* Left Ear */}
              <div 
                className="absolute -top-[12%] left-[15%] w-[12px] sm:w-[20px] lg:w-[26px] h-[12px] sm:h-[20px] lg:h-[26px] bg-gradient-to-b from-[#FFFFFF] to-[#F1A1B4] rotate-[-22deg]  transition-transform duration-300 hover:scale-105 origin-left text-left  scale-y-125"
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />
              
              {/* Right Ear */}
              <div 
                className="absolute -top-[12%] right-[15%] w-[12px] sm:w-[20px] lg:w-[26px] h-[12px] sm:h-[20px] lg:h-[26px] bg-gradient-to-b from-[#FFFFFF] to-[#F1A1B4] rotate-[22deg]  "
                style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
              />
              
              {/* Left Claw Curve (SVG) */}
              <svg className="absolute -left-[15%] h-[90%] w-[35%] z-0" viewBox="0 0 20 100 " preserveAspectRatio="none">
                <path d="M20 0 Q 0 50 20 100 Q 5 50 20 0" fill="#9e1335" />
              </svg>
              
              {/* Center Letter O */}
              <span className="relative z-10  bg-[linear-gradient(150deg,#F1A1B4_50%,#CE1B42_57%,#64061A_100%)] bg-clip-text text-transparent ">
                O
              </span>
              
              {/* Right Claw Curve (SVG) */}
              <svg className="absolute -right-[15%] h-[90%] w-[35%] z-0" viewBox="0 0 20 100" preserveAspectRatio="none">
                <path d="M0 0 Q 20 50 0 100 Q 15 50 0 0" fill="#9e1335" />
              </svg>
            </span>

            {/* A R */}
            <span className="bg-[linear-gradient(180deg,#F1A1B4_50%,#CE1B42_68%,#64061A_100%)] bg-clip-text text-transparent  transition-transform duration-300 hover:scale-105 origin-left text-left  scale-y-125">
              A
            </span>
            <span className="bg-[linear-gradient(150deg,#F1A1B4_50%,#CE1B42_68%,#64061A_100%)] bg-clip-text text-transparent transition-transform duration-300 hover:scale-105 origin-left text-left  scale-y-125">
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
        <div className="w-full mt-40 sm:mt-70 md:mt-100 lg:mt-190 mb-8 z-10"> 
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
    </div></>
  );
}