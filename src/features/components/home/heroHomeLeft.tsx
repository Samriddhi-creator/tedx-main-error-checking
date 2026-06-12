import Image from "next/image";

export default function HeroHomeLeft() {
  return (
    <div
      className="
        flex items-center justify-center
        w-full lg:w-[calc(50%-14px)]
        pl-[4.58vw]
        py-16 lg:py-0
        shrink-0
      "
    >
      <Image
        src="/terraIncognitaLogo.svg"
        alt="Terra Incognita"
        width={873}
        height={318}
        className="
          w-full
          max-w-218.25
          lg:w-[45.47vw]
          lg:max-w-218.25
          h-auto
          lg:max-h-79.5
          object-contain
        "
        priority
      />
    </div>
  );
}