"use client";

import { useState, useRef, useEffect, UIEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeakerCard from "@/src/components/pastSpeakers/SpeakerCard";
import { speakerServices } from "@/services/speakerServices";
import { Speaker } from "@/types/speaker";
import SpeakersSkeleton from "@/src/components/pastSpeakers/Skeleton";

const YEARS = ["2025","2024","2023","2022","2021","2019"];

export default function PastSpeakers() {
  const [selectedYear, setSelectedYear] = useState("2025");//
  const [activeIdx, setActiveIdx] = useState(0);//
  const [currentSpeakers,setSpeakers]=useState<Speaker[] | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);//
  const yearsRef = useRef<HTMLDivElement>(null);//
  
  const isInternalScrolling = useRef(false);
  const scrollDebounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft = 0;
      }
      setActiveIdx(0);
      setSpeakers(null);
      
      const res = await speakerServices.getSpeakersByYear(selectedYear);
      setSpeakers(res);
    };
    fetchSpeakers();
  }, [selectedYear]);

  useEffect(() => {
    const defaultIdx = YEARS.indexOf("2025");
    if (defaultIdx !== -1) {
      setTimeout(() => {
        centerElementByIndex(yearsRef.current, defaultIdx, "auto");
      }, 100);
    }
  }, []);

  const getCenteredElementIndex = (container: HTMLDivElement): number => {
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const children = Array.from(container.children) as HTMLElement[];
    
    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const distance = Math.abs(containerCenter - childCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  const centerElementByIndex = (
    container: HTMLDivElement | null, 
    index: number,
    behavior: "smooth" | "auto" = "smooth"
  ) => {
    if (!container) return;
    const children = container.children;
    if (children[index]) {
      if (behavior === "smooth") isInternalScrolling.current = true;
      
      const target = children[index] as HTMLElement;
      const targetOffset = target.offsetLeft;
      const targetWidth = target.offsetWidth;
      const containerWidth = container.offsetWidth;

      container.scrollTo({
        left: targetOffset - containerWidth / 2 + targetWidth / 2,
        behavior: behavior,
      });

      if (behavior === "smooth") {
        if (scrollDebounceTimeout.current) clearTimeout(scrollDebounceTimeout.current);
        scrollDebounceTimeout.current = setTimeout(() => {
          isInternalScrolling.current = false;
        }, 350);
      }
    }
  };

  const handleSpeakersScroll = (e: UIEvent<HTMLDivElement>) => {
    if (isInternalScrolling.current) return;
    
    const centerIndex = getCenteredElementIndex(e.currentTarget);
    if (centerIndex !== activeIdx) {
      setActiveIdx(centerIndex);
    }
  };

  const handleYearsScroll = (e: UIEvent<HTMLDivElement>) => {
    if (isInternalScrolling.current) return;

    const centerIndex = getCenteredElementIndex(e.currentTarget);
    if (YEARS[centerIndex] && YEARS[centerIndex] !== selectedYear) {
      setSelectedYear(YEARS[centerIndex]);
    }
  };

  const handleYearClick = (year: string, idx: number) => {
    setSelectedYear(year);
    centerElementByIndex(yearsRef.current, idx, "smooth");
  };

  const handleSpeakerClick = (idx: number) => {
    setActiveIdx(idx);
    centerElementByIndex(carouselRef.current, idx, "smooth");
  };

  return (
    <div className="min-h-screen text-white gap-2 sm:gap-4 flex flex-col items-center overflow-hidden relative ">
      <h2 className="lg:text-[100px] md:text-[80px] sm:text-[70px] text-[50px] xl:text-[110px] uppercase tracking-[0.04rem] sm:tracking-[0.08rem] text-center font-bebas text-[#F3E9DC] leading-tight  ">
        Past Speakers
      </h2>
      <div className="w-full overflow-hidden relative px-2">
        <div 
          ref={yearsRef}
          onScroll={handleYearsScroll}
          className="flex gap-3 sm:gap-5 lg:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar "
          style={{ 
            paddingLeft: "calc(50% - 40px)", 
            paddingRight: "calc(50% - 40px)", 
            scrollSnapType: "x mandatory",
          }}
        >
          {YEARS.map((year, idx) => {
            const isSelected = selectedYear === year;
            return (
              <button
                key={year}
                onClick={() => handleYearClick(year, idx)}
                className={`relative px-5 sm:px-8 lg:px-10 py-1.5 text-[18px] sm:text-[22px] lg:text-[28px] font-albertSans tracking-wider rounded-full border snap-center flex-shrink-0 transition-all duration-500 ease-out
                    ${isSelected ? "border-[#B3031C] text-white " : "border-[#B3031C] text-zinc-500 hover:text-zinc-300 scale-95"}`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeYearBg"
                    className="absolute inset-0 bg-gradient-to-r from-[#EB0028] to-[#B3031C] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  />
                )}
                {year}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full relative flex items-center justify-center h-[420px] sm:h-[420px] overflow-hidden select-none mt-4 sm:mt-6">
        <div
          ref={carouselRef}
          onScroll={handleSpeakersScroll}
          className="flex items-center overflow-x-auto snap-x snap-mandatory scroll-smooth w-full no-scrollbar h-full"
          style={{
            paddingLeft: "calc(50% - 200px)", 
            paddingRight: "calc(50% - 200px)",
            scrollSnapType: "x mandatory"
          }}
        >
          <AnimatePresence mode="popLayout">
            { !currentSpeakers?<SpeakersSkeleton/>:currentSpeakers.map((speaker, idx) => (
              <div key={speaker._id} className="snap-center flex-shrink-0">
                <SpeakerCard
                  speaker={speaker}
                  isSelected={idx === activeIdx}
                  onClick={() => handleSpeakerClick(idx)}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}