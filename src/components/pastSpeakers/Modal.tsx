"use client";

import { Speaker } from "@/types/speaker";
import Image from "next/image";
import {
  DialogContent,
  DialogClose,
} from "@/src/components/ui/dialog"; 
import { ExternalLink, X } from "lucide-react";
import Link from "next/link";

interface SpeakerModalProps {
  speaker: Speaker;
}

export default function SpeakerModal({ speaker }: SpeakerModalProps) {
  return (
    <DialogContent 
      className="max-w-[95vw] sm:max-w-[95vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-[70vw] bg-[#534F4F] border border-[#F8F8F8] rounded-2xl px-5 py-10 text-white gap-0 focus:outline-none [&>button]:hidden"
    >
      <div className="relative flex flex-col md:flex-row gap-3 md:gap-6 lg:gap-8 items-center w-full">
        <DialogClose className="absolute -top-7 -right-4 md:-top-2 md:-right-2 p-1 rounded-full border border-white/40 text-white/80 hover:text-white hover:border-white transition-all bg-stone-700/50 md:bg-transparent">
          <X className="w-5 h-5 stroke-[1.5]" />
        </DialogClose>
        <div className="relative w-[200px] sm:w-[350px] md:w-[250px] lg:w-[350px] aspect-square flex-shrink-0">
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            className="object-cover  aspect-square"
            sizes="(max-width: 640px) 350px,
            (max-width: 768px) 250px,
            (max-width: 640px) 350px,
            200px"
          />
        </div>
        <div className="flex flex-col flex-grow text-center md:text-left pt-2">
          <h2 className="lg:text-[48px] md:text-[30px] sm:text-[30px] text-[20px]  font-medium uppercase tracking-wide text-white font-bebas leading-none">
            ABOUT
          </h2>
          <h3 className="lg:text-[24px] md:text-[20px] sm:text-[18px] text-[16px] font-bold font-sourceSans text-[#B61713]">
            {speaker.name}
          </h3>
          
          <p className="mt-2 sm:mt-4  text-stone-300 text-[12px] md:text-sm lg:text-base font-sourceSans leading-relaxed overflow-y-auto no-scrollbar">
            {speaker.body}
          </p>
          <div className="mt-2 sm:mt-4 text-white text-[12px] md:text-sm lg:text-base font-semibold font-sourceSans leading-relaxed overflow-y-auto no-scrollbar">
            <Link 
              href={speaker?.ytLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5  hover:underline font-medium transition-colors duration-150"
            >
              <ExternalLink size={16} className="flex-shrink-0" />
              <span>{speaker?.ytLink}</span>
            </Link>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}