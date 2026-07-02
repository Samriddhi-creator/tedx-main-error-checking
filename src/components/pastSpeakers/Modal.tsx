"use client";

import { Speaker } from "@/types/speaker";
import Image from "next/image";
import {
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/src/components/ui/dialog"; 
import { ExternalLink, X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { useState } from "react";

interface SpeakerModalProps {
  speaker: Speaker;
}

export default function SpeakerModal({ speaker }: SpeakerModalProps) {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <DialogContent 
      className="max-w-[95vw] sm:max-w-[95vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-[70vw] bg-[#413d3d] border border-[#F8F8F8] rounded-2xl px-5 text-white gap-0 focus:outline-none [&>button]:hidden"
    >
      <DialogTitle asChild>
        <VisuallyHidden>
          <h2>{speaker.name}</h2>
        </VisuallyHidden>
      </DialogTitle>
      <div className="relative flex flex-col md:flex-row gap-3 md:gap-6 lg:gap-8 items-center w-full  py-10">
        <DialogClose className="absolute -right-4 md:-top-2 md:-right-2 p-1 rounded-full border border-white/40 text-white/80 hover:text-white hover:border-white transition-all bg-stone-700/50 md:bg-transparent">
          <X className="w-5 h-5 stroke-[1.5]" />
        </DialogClose>
        <div className="group relative w-[200px] sm:w-[350px] md:w-[250px] lg:w-[350px] aspect-square flex-shrink-0 bg-white">
  <Image
    src={speaker.image}
    alt={speaker.name}
    fill
    className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
    sizes="(max-width: 640px) 350px,
           (max-width: 768px) 250px,
           (max-width: 1024px) 350px,
           200px"
  />
</div>
        <div className="flex flex-col flex-grow text-center md:text-left pt-2">
          <h2 className="lg:text-[48px] md:text-[30px] sm:text-[30px] text-[20px]  font-medium uppercase tracking-wide text-[#e00d0d] font-bebas leading-none">
            {speaker.name}
          </h2>
          <p className="mt-2 sm:mt-4  text-white text-[12px] md:text-sm lg:text-base font-sourceSans leading-relaxed overflow-y-auto no-scrollbar">
            {speaker.body}
          </p>
          <div className=" flex flex-col mt-2 sm:mt-4 text-white text-[12px] md:text-sm lg:text-base font-semibold font-sourceSans leading-relaxed overflow-y-auto no-scrollbar">
            {speaker.talk && (
              <span>
                <em>Spoke On: {speaker.talk}</em>
              </span>
            )}
            <div className="flex justify-center mt-2">
            <Link 
              href={speaker?.ytLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-center justify-center gap-1.5 font-sourceSans  border border-red-500 rounded-4xl bg-red-500  w-42 md:w-48 lg:w-56 p-2 hover:bg-red-400 "
            >
              <button className="cursor-pointer">
                Watch talk on YouTube
              </button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}