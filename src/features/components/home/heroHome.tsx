import HeroHomeLeft from "./heroHomeLeft";
import HeroHomeRight from "./heroHomeRight";

export default function HomeHero() {
  return (
    <section className="flex flex-col lg:flex-row w-full min-h-screen">
      <HeroHomeLeft />
      <HeroHomeRight />
    </section>
  );
}