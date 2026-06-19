import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function Theme() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4 text-white">
      
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

      <div>
        <Link 
          className="text-[20px] sm:text-[28px] items-center text-[#EB0028CC] font-space hover:underline flex flex-row gap-2" 
          href="/past-editions"
        >
          <ArrowLeft />
          Go Back
        </Link>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full gap-8 py-4">
        
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center select-none">
          <h1 className="font-lemon text-4xl sm:text-6xl md:text-7xl tracking-wider leading-tight uppercase">
            Veiled <br />
            <span className="flex flex-row items-start justify-center">Ver
              <span className="text-[#EB0028] text-5xl sm:text-7xl md:text-8xl animate-swing-a mx-[-1px]">
                A
              </span>
              city
            </span>
          </h1>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[50vw]">
            <Image
              src="/images/VV.png"
              alt="Veiled Veracity Artwork"
              width={600}
              height={600}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

      </div>

      <div className="w-full mt-4">
        <div className="flex flex-col p-4 border-[2px] sm:border-[3px] border-[#EB0028CC] rounded-lg items-center text-white">
          <h1 className="font-bebas text-[30px] sm:text-[50px] md:text-[60px] lg:text-[70px] text-center">
            ABOUT THE THEME
          </h1>
          <p className="font-space text-[12px] sm:text-[22px] md:text-[28px] lg:text-[32px] text-center">
            "Veiled Veracity" reminds us that amidst confusion and uncertainty, there's always the beacon of hope guiding us towards clarity and strength. It challenges us to confront the illusions that shape our lives and embrace the courage to seek out authentic understanding.
            "Veiled" suggests that beneath the surface lies something waiting to be revealed, similar to a treasure hidden behind a curtain. "Veracity" underscores the importance of truthfulness and honesty in our exploration.
          </p>
        </div>
      </div>
    </div>  
  );
}