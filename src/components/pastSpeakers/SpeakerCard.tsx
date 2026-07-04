"use client";

import { useState, useEffect, useRef } from "react";
import { Speaker } from "@/types/speaker";
import Image from "next/image";
import { Dialog, DialogTrigger } from "@/src/components/ui/dialog";
import SpeakerModal from "./Modal";

interface SpeakerCardProps {
  speaker: Speaker;
  isSelected: boolean;
  onClick: () => void;
}

export default function SpeakerCard({ speaker, isSelected, onClick }: SpeakerCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const coords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const desktopSelectedWidth = 400;
  const desktopUnselectedWidth = 250;
  
  const cardWidth = isMobile
    ? (isSelected ? "80vw" : "55vw") 
    : (isSelected ? desktopSelectedWidth : desktopUnselectedWidth);

  const cardHeight = isMobile
    ? (isSelected ? "350px" : "220px")
    : (isSelected ? 400 : 250);

  const handlePointerDown = (e: React.PointerEvent) => {
    coords.current = { x: e.screenX, y: e.screenY };
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (Math.abs(e.screenX - coords.current.x) > 6 || Math.abs(e.screenY - coords.current.y) > 6) {
      return;
    }
    onClick();
  };

  return (
    <Dialog>
      <div
        onPointerDown={handlePointerDown}
        onClick={handleCardClick}
        style={{
          width: cardWidth,
          height: cardHeight,
          zIndex: isSelected ? 10 : 0,
        }}
        className="relative flex-shrink-0 origin-center transition-all duration-300 ease-in-out"
      >
        <div 
          style={{
            height: cardHeight,
          }}
          className={`relative w-full h-full overflow-hidden transition-all duration-300 ease-in-out ${
            isSelected ? "rounded-[16px]" : "rounded-none"
          }`}
        >
          <div className="absolute inset-0 bg-neutral-900" />

          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            onLoad={() => setIsLoaded(true)}
            className={`object-cover transition-all duration-700 ease-out ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } ${
              isSelected ? "grayscale-0 contrast-110" : "grayscale tracking-wide"
            }`}
            sizes="(max-width: 640px) 80vw, (max-width: 768px) 250px, 400px"
            priority={isSelected}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          {isSelected && (
            <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center px-4 text-center text-white z-20 transition-all duration-300">
              <h3 className="font-bold text-[20px] sm:text-[24px] tracking-[0.08rem] font-sourceSans max-w-full truncate px-2">
                {speaker.name}
              </h3>
              <DialogTrigger asChild>
                <button 
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation(); 
                  }}
                  className="mt-2 cursor-pointer bg-gradient-to-r from-[#EB0028] to-[#B3031C] hover:from-[#B3031C] hover:to-[#B3031C] text-[14px] sm:text-[16px] font-medium font-sourceSans px-4 py-1.5 rounded-full relative z-30"
                >
                  Know More
                </button>
              </DialogTrigger>
            </div>
          )}
        </div>
      </div>
      <SpeakerModal speaker={speaker} />
    </Dialog>
  );
}