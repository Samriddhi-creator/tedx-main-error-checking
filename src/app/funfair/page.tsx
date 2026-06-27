// src/features/components/home/funfair.tsx
"use client";

import React, { useState } from 'react';
import { Bebas_Neue, Space_Grotesk } from "next/font/google"; 

interface PolaroidPhoto {
  id: number;
  src: string;
  alt: string;
  frameSrc: string; 
}

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

// Mock gallery images with custom matched frames mapped directly to their layout indices
const FUNFAIR_PHOTOS: PolaroidPhoto[] = [
  { id: 1, src: "", alt: "Activity 1", frameSrc: "/image 50.png" },
  { id: 2, src: "", alt: "Activity 2", frameSrc: "/image 51.png" },
  { id: 3, src: "", alt: "Activity 3", frameSrc: "/image 52.png" },
  { id: 4, src: "", alt: "Activity 4", frameSrc: "/image 53.png" },
  { id: 5, src: "", alt: "Activity 5", frameSrc: "/image 54.png" },
  { id: 6, src: "", alt: "Activity 6", frameSrc: "/image 55.png" },
];

export default function FunFairSection() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const activePhoto = FUNFAIR_PHOTOS[selectedPhotoIndex] || FUNFAIR_PHOTOS[0];

  return (
    <section className="flex flex-col items-center w-full px-5 py-10 text-white bg-transparent box-border">
      
      {/* Title Header Layout Area */}
      <div className="text-center w-full max-w-[850px] mb-8">
        <h1 
          className={`${bebasNeue.className} font-bold scale-y-[1.2] text-5xl md:text-[72px] mb-5`}
        >
          <span className="text-[#e61c1c]">FUN</span> FAIR
        </h1>
        
        <p 
          className={`${spaceGrotesk.className} tracking-normal scale-y-[1.25] text-base md:text-[17.5px] font-light leading-relaxed mx-auto mb-10`}
        >
          Before ideas take center stage, the journey begins with Funfair, a lively student
          -driven celebration that brings the IIT Patna campus to life. Featuring interactive 
          games, creative activities, and vibrant photo opportunities, the event creates an 
          atmosphere filled with energy, laughter, and connection. More than just a pre-event, 
          Funfair serves as the opening chapter of the TEDxIITPatna experience.
        </p>
      </div>

      {/* Main Interactive Stage Workspace */}
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.5fr] gap-10 w-full max-w-[1100px] items-center">
        
        {/* LEFT COLUMN: Spotlight */}
        <div className="flex flex-col gap-4 w-full items-center lg:items-start">
          <span 
            className={`${bebasNeue.className} text-[#e61c1c] text-xl md:text-2xl tracking-wide uppercase`}
          >
            A trip down the memory lane... ↴
          </span>
          
          {/* Big Spotlight Polaroid Canvas Box */}
          {/* We use aspect-square so it remains a perfect square as it scales down */}
          <div className="relative w-full max-w-[440px] aspect-square flex justify-center">
            
            {/* Background Frame Layer */}
            <div 
              className="absolute inset-0 bg-[length:100%_100%] bg-no-repeat"
              style={{ backgroundImage: "url('/image 56.png')" }}
            />
            
            {/* Inner Active Photo Window */}
            {/* Switched fixed pixels to percentage-based positioning based on original math (334/440 = 76%, etc) */}
            <div 
              className="absolute overflow-hidden"
              style={{
                top: '20%',       // originally 88px / 440px
                left: '12%',      // horizontally centered
                width: '76%',     // originally 334px / 440px
                height: '54.5%',  // originally 240px / 440px
              }}
            >
              {activePhoto?.src && (
                <img 
                  src={activePhoto.src} 
                  alt={activePhoto.alt || "Active view"} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Grid Thumbnails */}
        {/* Uses a 2-column grid on mobile, switching to 3-column on medium screens and up */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {FUNFAIR_PHOTOS.map((photo, index) => {
            const isSelected = index === selectedPhotoIndex;
            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`relative w-full aspect-[23/21] cursor-pointer transition-transform duration-200 flex justify-center ${isSelected ? 'scale-105' : 'scale-100 hover:scale-[1.02]'}`}
              >
                {/* Background Frame */}
                <div 
                  className="absolute inset-0 bg-[length:100%_100%] bg-no-repeat"
                  style={{ backgroundImage: `url('${photo.frameSrc}')` }}
                />
              
                {/* Inner Thumbnail Photo Window */}
                {/* Uses percentages derived from your original fixed pixels (151/230, etc.) */}
                <div 
                  className="absolute overflow-hidden bg-[#111]"
                  style={{
                    top: '19%',       // originally 40px / 210px
                    left: '17%',      // horizontally centered
                    width: '65.6%',   // originally 151px / 230px
                    height: '52.3%',  // originally 110px / 210px
                  }}
                >
                  {photo.src && (
                    <img 
                      src={photo.src} 
                      alt={photo.alt} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}