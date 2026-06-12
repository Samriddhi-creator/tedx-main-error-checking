"use client";
import React from "react";
import Image from "next/image";
import { Compass } from "lucide-react";
import { Bebas_Neue, Space_Grotesk, Ancizar_Serif } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const ancizarSerif = Ancizar_Serif({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  fallback: ["times new roman", "times", "serif"],
  adjustFontFallback: false // FIXED: Quiets down the terminal build warning block execution loop
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function CartFooter() {
  return (
    <footer className="w-full text-white font-sans mt-auto">
      
      {/* Main Solid Black Container Base */}
      <div className="w-full bg-black relative z-20">
        
        {/* 1. Repeating Ruler Strip Image Element */}
       
        <div 
          className="w-full h-15 bg-repeat-x relative"
          style={{ 
            backgroundImage: "url('/image 16 copy.png')",
            backgroundSize: "auto 100%"
          }}
        />

        {/* 2. Main Footer Navigation Content Grid */}
        <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Column 1: Stacked Logo Brand Block */}
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col">
              <span className="text-[60px] text-white leading-none">
                <span className="text-red-600 text-[60px] font-extrabold">
                  TED<span className="relative bottom-2 text-[60px] font-extrabold lowercase">x</span>
                </span>
                IIT Patna
              </span>
              <span className="text-[11px] text-white font-bold uppercase tracking-wider mt-1">
                <span className="text-red-600 font-bold text-[10px]">x</span> = independently organized TED event
              </span>
            </div>

            {/* Horizontal inline documentation links now sit beautifully inside Column 1 */}
            <div className="pt-2">
             <div className="flex flex-col gap-2.5 text-[15px] mt-5 font-medium text-white">
  
  {/* Link 1: TED Website */}
  <a 
    href="https://www.ted.com/" 
    className="hover:text-red-500 transition-colors flex items-center"
  >
    <span className="text-red-600 mr-3 font-bold">&gt;</span>
    TED Website
  </a>

  {/* Link 2: Terms & Conditions */}

  <a 
    href="https://www.ted.com/participate/organize-a-local-tedx-event/before-you-start/tedx-rules" 
    className="hover:text-red-500 transition-colors flex items-center"
  >
    <span className="text-red-600 mr-3 font-bold">&gt;</span>
    Terms & Conditions
  </a>

  {/* Link 3: About TEDx */}

  <a 
    href="https://www.ted.com/about/programs-initiatives/tedx-program" 
    className="hover:text-red-500 transition-colors flex items-center"
  >
    <span className="text-red-600 mr-3 font-bold">&gt;</span>
    About TEDx
  </a>

</div>
            </div >
          </div>

          {/* Column 2: Follow Us Channel Cards & Mail Link */}
          <div className="flex flex-col items-center text-center space-y-10 md:border-x md:border-dotted md:border-[#A70000] px-5">
            <div className="space-y-4 w-full">
              <h4 className={`${spaceGrotesk.className} text-3xl font-bold tracking-wide text-red-600`}>
                Follow Us
              </h4>
              <div className="flex justify-center gap-5">
                <a href="https://www.instagram.com/tedxiitpatna/" className="w-10 h-10 bg-white text-black rounded-xl hover:bg-zinc-200 transition-colors hover:scale-110 flex items-center justify-center p-2 shadow-md">
                  <Image src="/image.png" alt="Instagram" width={20} height={20} className="w-5 h-5 object-contain" />
                </a>
                <a href="https://www.linkedin.com/company/tedxiitpatna/posts/?feedView=all" className="w-10 h-10 bg-white text-black rounded-xl hover:bg-zinc-200 hover:scale-110 transition-colors flex items-center justify-center p-2 shadow-md">
                  <Image src="/image copy.png" alt="LinkedIn" width={20} height={20} className="w-5 h-5 object-contain" />
                </a>
                <a href="https://www.facebook.com/tedxiitpatna" className="w-10 h-10 bg-white text-black rounded-xl hover:bg-zinc-200 hover:scale-110 transition-colors flex items-center justify-center p-2 shadow-md">
                  <Image src="/image copy 2.png" alt="Facebook" width={20} height={20} className="w-5 h-5 object-contain" />
                </a>
                <a href="https://twitter.com/tedxiitpatna" className="w-10 h-10 bg-white text-black rounded-xl hover:bg-zinc-200 hover:scale-110 transition-colors flex items-center justify-center p-2 shadow-md">
                  <Image src="/image copy 3.png" alt="Twitter" width={20} height={20} className="w-5 h-5 object-contain" />
                </a>
              </div>
            </div>
            
            <div className="w-full border-t md:border-[#A70000] pt-5 space-y-2">
              <h4 className={`${spaceGrotesk.className} text-3xl font-bold tracking-wide text-white`}>
                Contact Us
              </h4>
              <a 
    href="mailto:tedxiitpatna@gmail.com" 
    className="text-sm font-medium tracking-wide text-zinc-400 hover:text-red-500 flex items-center justify-center gap-2.5 transition-colors mx-auto"
  >
    <Image 
      src="/mail.png" 
      alt="Mail Link"
      width={20}
      height={20}
      className="w-5 h-5 object-contain" 
    />
    <span>tedxiitpatna@gmail.com</span>
  </a>
            </div>
          </div>

          {/* Column 3: Quick Links Dynamic Routing List */}
          <div className="md:pl-16 space-y-4">
            <h4 className={`${spaceGrotesk.className} text-3xl ml-4 font-extrabold tracking-widest text-red-600`}>
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xl font-normal tracking-wide text-white">
            
              <li>
                <a href="https://tedxiitpatna.iitp.ac.in/" className={`${ancizarSerif.className} hover:text-red-500 flex items-center gap-2.5 transition-colors`}>
                  <Compass size={14} className="text-red-600" /> Home
                </a>
              </li>
              <li>
                <a href="https://tedxiitpatna.iitp.ac.in/about" className={`${ancizarSerif.className} hover:text-red-500 flex items-center gap-2.5 transition-colors`}>
                  <Compass size={14} className="text-red-600" /> About Us
                </a>
              </li>
              <li>
                <a href="https://tedxiitpatna.iitp.ac.in/our-journey" className={`${ancizarSerif.className} hover:text-red-500 flex items-center gap-2.5 transition-colors`}>
                  <Compass size={14} className="text-red-600" /> Past Editions
                </a>
              </li>
              <li>
                <a href="https://tedxiitpatna.iitp.ac.in/funfair" className={`${ancizarSerif.className} hover:text-red-500 flex items-center gap-2.5 transition-colors`}>
                  <Compass size={14} className="text-red-600" /> Upcoming Event
                </a>
              </li>
              <li>
                <a href="https://tedxiitpatna.iitp.ac.in/speakers" className={`${ancizarSerif.className} hover:text-red-500 flex items-center gap-2.5 transition-colors`}>
                  <Compass size={14} className="text-red-600" /> Meet the Speakers
                </a>
              </li>
              <li>
                <a href="https://tedxiitpatna.iitp.ac.in/buyMerchTickets" className={`${ancizarSerif.className} hover:text-red-500 flex items-center gap-2.5 transition-colors`}>
                  <Compass size={14} className="text-red-600" /> Your Cart
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. Bottom Legal Disclaimer Footer Strip */}
        <div className="max-w-7xl mx-auto border-t border-zinc-900/60 py-6 text-[10px] text-zinc-500 px-8 tracking-wide flex flex-col md:flex-row justify-between gap-2">
          <span>*This Independent TEDx Event Is Operated Under License From TED.</span>
          <span>© 2026 TEDxIITPatna. All rights reserved.</span>
        </div>
        
      </div>
    </footer>
  );
}