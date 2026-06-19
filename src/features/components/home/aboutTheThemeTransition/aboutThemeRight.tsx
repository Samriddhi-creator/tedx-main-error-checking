"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  activeSection: "home" | "about" | "closing";
}

export default function AboutThemeRight({
  activeSection,
}: Props) {
  return (
    <motion.div
      initial={false}
      animate={{
        x: activeSection === "about" ? 0 : -600,
        opacity: activeSection === "about" ? 1 : 0,
      }}
      transition={{
        duration: 1,
        delay: 0.15,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="
        hidden
        lg:flex
        lg:w-[50%]
        justify-center
        "
    >
      <div className="relative w-[800px] h-[500px]">
        <Image
          src="/rectangle.svg"
          alt="shape"
          fill
          className="
            object-contain
            filter blur-md
            z-0
            pointer-events-none
            scale-x-[-1]
          "
        />

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-[99%] h-[99%] relative">
            <Image
              src="/rectangle.svg"
              alt="inner-shape-black"
              fill
              className="object-contain scale-x-[-1]"
              style={{
                filter: "brightness(0) saturate(100%)",
              }}
            />
          </div>
        </div>

        <div
  className="absolute inset-0 z-20 overflow-hidden scale-x-[-1]"
  style={{
    WebkitMaskImage: "url('/rectangle.svg')",
    WebkitMaskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskImage: "url('/rectangle.svg')",
    maskSize: "contain",
    maskRepeat: "no-repeat",
    maskPosition: "center",
  }}
>
          <Image
            src="/aboutTheThemeBg.svg"
            alt="about theme"
            fill
            className="object-cover z-0 pointer-events-none scale-x-[-1]"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/terraIncognitaLogo.svg"
              alt="logo"
              width={300}
              height={300}
              className="object-contain z-0 pointer-events-none scale-x-[-1]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}