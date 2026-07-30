"use client"
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronLeft } from "lucide-react";

export default function Theme() {
  return (
    <>
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
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 text-white">
      
      <style>{`
        @keyframes letterSwing {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-swing-a {
          display: inline-block;
          transform-origin: top center;
          animation: letterSwing 3s ease-in-out infinite;
        }
      `}</style>

       

      <div className="flex flex-col-reverse md:flex-row items-start justify-center w-full  py-4">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[50vw]">
            <Image
              src="/editions/ki.png"
              alt="KI Artwork"
              width={600}
              height={600}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <div className="w-full mt-10">
        <div className="flex flex-col p-4 border-[2px] sm:border-[3px] border-[#EB0028CC] rounded-lg items-center text-white  bg-[#BC1918]/10">
          <h1 className="font-bebas text-[30px] sm:text-[50px] md:text-[60px] lg:text-[70px] text-center">
            ABOUT THE THEME
          </h1>
          <p className="font-space text-[12px] sm:text-[22px] md:text-[28px] lg:text-[32px] text-center">
            "Kaleidoscopic" evokes vibrant, ever-shifting patterns—glimpses of identity
            refracted through time and experience. "Interludes" suggests pauses in life’s rhythm—transitional moments that carry quiet transformation.
            Kaleidoscopic Interludes invites us to explore the subtle shifts that shape who we are—not through grand events, but through passing decisions, contradictions, and silences. It speaks to the fragments in between: the times when we are not fixed, but continually becoming.
            In these fluid intervals, where identity moves between clarity and ambiguity, we uncover the quiet beauty of being unfinished. This theme calls us to embrace complexity and reflect on the spaces where meaning flickers into view.
          </p>
        </div>
      </div>
    </div>  </>
  );
}