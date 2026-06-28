import React from 'react';
import Link from 'next/link'
import { ArrowLeft } from "lucide-react";
export default function TedxThemeSection() {
  return (
    <div
      className="relative flex w-full flex-col  bg-black bg-cover bg-top pb-16 px-4 sm:px-6 lg:px-8 min-h-screen"
      style={{ 
        backgroundImage: "url('/image 59 (1).png')",
        backgroundPosition: "center 20%" 
      }}

    >
         {/*Go back button */}
            <div>
        <Link 
          className="text-[20px] sm:text-[28px] items-center text-[#EB0028CC] font-space hover:underline flex flex-row gap-2" 
          href="/past-editions"
          onClick={(e) => {
            if (window.history.length > 1) {
              e.preventDefault();
              window.history.back();
            }
          }}
        >
          <ArrowLeft />
          Go Back
        </Link>
      </div>
      {/* 1. Heading Container */}
      <div className="relative pt-20 sm:pt-32 text-left select-none w-full max-w-6xl z-10">
        <h1 className="text-[36px] sm:text-[55px] md:text-[75px] lg:text-[90px] font-bold tracking-widest text-white uppercase leading-none">
          <span
            className="relative font-bold uppercase tracking-wide text-white animate-glow-pulse animate-flicker"
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
          MORPHOSIS
        </h1>
      </div> 

      {/* 2. About the Theme Box */}
      <div className="w-full max-w-8xl mt-100 sm:mt-200 mb-12 z-10">
        <div className="flex flex-col p-6 sm:p-8 md:p-12 bg-[#BC1918]/10 border-2 sm:border-3 border-[#EB0028CC] rounded-xl items-center text-white shadow-2xl ">
          <h2 className="font-bebas text-[28px] sm:text-[44px] md:text-[56px] lg:text-[64px] text-center mb-6 tracking-wide">
            ABOUT THE THEME
          </h2>
     
          <p className="font-space text-[14px] sm:text-[16px] md:text-[20px] lg:text-[22px] text-center text-gray-200 leading-normal max-w-4xl mx-auto">
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
  );
}