"use client";

import { useState, useEffect } from "react";
import { Speaker } from "@/types/speaker";
import { motion } from "framer-motion";
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

  return (
    <Dialog>
      <motion.div
        layout
        onClick={onClick}
        animate={{
          width: cardWidth,
          height: cardHeight,
          zIndex: isSelected ? 10 : 0,
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.4
        }}
        className="relative flex-shrink-0 origin-center"
      >
        <motion.div 
          layout
          animate={{
            height: cardHeight,
            borderRadius: isSelected ? "16px" : "0px"
          }}
          transition={{
            type: "tween",
            ease: "easeInOut",
            duration: 0.4
          }}
          className="relative w-full h-full overflow-hidden"
        >
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            className={`object-cover transition-all duration-700 
              ${isSelected ? "grayscale-0 contrast-110" : "grayscale tracking-wide"}`}
            // Optimized responsive image sizing rules matching our layout breakdown
            sizes="(max-width: 640px) 80vw, (max-width: 768px) 250px, 400px"
            priority={isSelected}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          {isSelected && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: 0.15, duration: 0.2 }}
              className="absolute bottom-4 left-0 right-0 flex flex-col items-center px-4 text-center text-white z-20"
            >
              {/* Added line-clamp and responsive text scaling for small screens */}
              <h3 className="font-bold text-[20px] sm:text-[24px] tracking-[0.08rem] font-sourceSans max-w-full truncate px-2">
                {speaker.name}
              </h3>
              <DialogTrigger asChild>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="mt-2 cursor-pointer bg-gradient-to-r from-[#EB0028] to-[#B3031C] hover:from-[#B3031C] hover:to-[#B3031C] text-[14px] sm:text-[16px] font-medium font-sourceSans px-4 py-1.5 rounded-full transition-all duration-200"
                >
                  Know More
                </button>
              </DialogTrigger>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      <SpeakerModal speaker={speaker} />
    </Dialog>
  );
}