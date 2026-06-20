import HeroHomeLeft from "./heroHomeLeft";
import HeroHomeRight from "./heroHomeRight";
import { useEffect,useState } from "react";
import SpeakerHome from "./speakerhome"; 

export default function HomeHero() {
  const [isMobile, setIsMobile]=useState(false);

  useEffect(()=>{
    const checkScreen=()=>{
      setIsMobile(window.innerWidth<768);
    }
    checkScreen();
    window.addEventListener("resize", checkScreen);
     return () => {
      window.removeEventListener("resize", checkScreen);
    };
  },[768]);

  
  return (
    // The main wrapper uses flex-col so components stack cleanly on top of each other
    <div className="flex flex-col w-full min-h-screen  text-white">
      
      {/* SECTION 1: HERO (Takes up the first full screen) */}
      <section className="flex flex-col lg:flex-row w-full min-h-screen snap-start">
        <HeroHomeLeft />
        <HeroHomeRight />
      </section>
      
      {/* SECTION 2: SPEAKER PAGE (Takes up the second full screen just beneath) */}
      <section className="w-full min-h-screen bg-zinc-950 snap-start">
        <SpeakerHome />
      </section>

    </div>
  );
}