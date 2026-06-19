"use client";

import { motion } from "framer-motion";

interface Props {
  activeSection: "home" | "about" | "closing";
}
export default function AboutThemeLeft({
  activeSection,
}: Props) {
  return (
    <div className="w-full lg:w-[50%] lg:pl-12 flex flex-col">
    
      <motion.h1
        initial={false}
        animate={{
          x: activeSection === "about" ? 0 : 800,
          opacity: activeSection === "about" ? 1 : 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.25,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="
          font-bebas
          uppercase
          text-white
          text-5xl
          md:text-6xl
          lg:text-7xl
          leading-none
        "
      >
        About The Theme
      </motion.h1>

      <motion.div
        initial={false}
        animate={{
          x: activeSection === "about" ? 0 : 600,
          opacity: activeSection === "about" ? 1 : 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.45,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="
          mt-8
          font-space
          text-[#D7D0C5]
          font-light
          text-[18px]
          md:text-[18px]
          xl:text-[22px]
          tracking-[0.64px]
          leading-[1.4]
          space-y-8
        "
      >
        <p>
          This year&apos;s theme,{" "}
          <span className="text-white">
            &ldquo;Terra Incognita&rdquo;
          </span>
          , explores how civilization constantly redraws the
          boundaries of the acceptable, where ideas once seen as
          impossible or unimaginable gradually become part of
          ordinary reality.
        </p>

        <p>
          Like the blank spaces on ancient maps, the unknown exists
          beyond the limits of inherited imagination, waiting to be
          understood. Spanning science, technology, philosophy,
          art, and human behavior, Terra Incognita celebrates the
          curiosity and courage to question established norms and
          venture into unexplored ways of thinking.
        </p>
      </motion.div>

      <motion.button
        initial={false}
        animate={{
          x: activeSection === "about" ? 0 : 600,
          opacity: activeSection === "about" ? 1 : 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.45, 
          ease: [0.76, 0, 0.24, 1], 
        }}
        className="
          mt-8
          w-fit
          px-4
          py-3
          rounded-full
          border
          border-[#B3031C]
          text-[#D7D0C5]
          bg-[#B3031C]
          text-lg
          tracking-[0.5px]
          transition-colors /* Keeps hover effect safe from interfering */
          duration-300
          hover:bg-red-700/40
          uppercase
        "
      >
        Watch The Reveal
      </motion.button>

    </div>
  );
}