import HeroHomeLeft from "./heroHomeLeft";
import HeroHomeRight from "./heroHomeRight";
import { motion } from "framer-motion";

interface HomeHeroProps {
  activeSection: "home" | "about" | "closing";
  setActiveSection: (
    section: "home" | "about" | "closing"
  ) => void;
}

export default function HomeHero({
  activeSection,
  setActiveSection,
}: HomeHeroProps) {
  return (
    <motion.section
      className="
        flex
        flex-col
        lg:flex-row
        w-full
        lg:h-screen
      "
      animate={{
        opacity: activeSection === "about" ? 0.3 : 1,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      <HeroHomeLeft activeSection={activeSection} />
      <HeroHomeRight
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </motion.section>
  );
}