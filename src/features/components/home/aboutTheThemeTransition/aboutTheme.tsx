"use client";

import AboutThemeLeft from "./aboutThemeLeft";
import AboutThemeRight from "./aboutThemeRight";
import { motion } from "framer-motion";

interface Props {
  activeSection: "home" | "about" | "closing";
}

export default function AboutTheme({
  activeSection,
}: Props) {
  return (
    <motion.section
      initial={false}
      animate={{
        opacity: activeSection === "about" ? 1 : 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        absolute
        inset-0
        z-20
        flex
        items-center
        overflow-hidden
      "
      style={{
        pointerEvents:
          activeSection === "about" ? "auto" : "none",
      }}
    >
      <div className="w-full px-6 lg:px-16">
        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-10
          "
        >
          {/* LEFT SIDE IMAGE */}
          <AboutThemeRight
            activeSection={activeSection}
          />

          {/* RIGHT SIDE CONTENT */}
          <AboutThemeLeft
            activeSection={activeSection}
          />
        </div>
      </div>
    </motion.section>
  );
}