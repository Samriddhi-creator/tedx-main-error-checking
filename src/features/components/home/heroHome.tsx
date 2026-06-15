import HeroHomeLeft from "./heroHomeLeft";
import HeroHomeRight from "./heroHomeRight";
import { useEffect,useState } from "react";

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
    <section className="flex flex-col lg:flex-row w-full h-auto">
      <HeroHomeLeft />
      {!isMobile && <HeroHomeRight />}
    </section>
  );
}