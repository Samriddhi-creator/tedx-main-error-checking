"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Theme() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto   text-white overflow-hidden">
      
      {/* Handled the animation via global inject style safely */}
      <style jsx global>{`
        @keyframes letterSwing {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-swing-x {
          display: inline-block;
          transform-origin: top center;
          animation: letterSwing 3s ease-in-out infinite;
        }
      `}</style>

      {/* Back Button - Shifted further left using negative margin */}
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

      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center md:items-stretch justify-between w-full gap-8 py-4">
        
        {/* Main Title - Shifted to the left and stretched out */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left select-none">
          <h1 className="relative font-molend text-4xl sm:text-6xl md:text-7xl tracking-[0.1em] sm:tracking-[0.15em] leading-tight uppercase">
            Prisms Of{" "}
            <span className="text-[#EB0028] text-2xl sm:text-4xl md:text-5xl font-molend align-top -ml-1 inline-block animate-swing-x">
              X
            </span> 
            <br />
            <span className="block mt-2">
               Perception
            </span>
          </h1>
        </div>

        {/* Artwork */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
          <div className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[45vw]">
            <img
              src="/prism2.png"
              alt="Prisms of Perception Artwork"
              loading="eager"
              className="w-full h-auto object-contain block"
            />
          </div>
        </div>

      </div>

      {/* About Section */}
      <div className="w-full mt-8 md:mt-12">
        <div className="flex flex-col p-6 sm:p-8 md:p-10 border-[2px] sm:border-[3px] border-[#EB0028CC] rounded-lg items-start text-white bg-black/10 backdrop-blur-sm">
          {/* Heading - Left aligned and tracking stretched */}
          <h2 className="font-bebas text-[30px] sm:text-[50px] md:text-[60px] lg:text-[70px] text-left mb-6 tracking-[0.05em] sm:tracking-[0.1em] w-full">
            ABOUT THE THEME
          </h2>
          {/* Paragraph - Justified to stretch edge-to-edge, with wider letter spacing */}
          <p className="font-space text-[14px] sm:text-[20px] md:text-[24px] lg:text-[26px] text-justify leading-[1.8] sm:leading-[2] tracking-wide text-gray-200 w-full">
            We experience the world not through clear glass, but through prisms — shaped by memory, identity, culture, and belief. Each of us carries a lens that bends what we see, coloring our understanding with nuance, distortion, and depth.
            <br /><br />
            Prisms of Perception invites us to question certainty, embrace complexity, and find meaning in multiplicity. Sometimes, the shift we need isn't in what we see — but in how we choose to see it.
          </p>
        </div>
      </div>

    </div>  
  );
}