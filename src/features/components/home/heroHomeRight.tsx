import Link from "next/link";
import Image from "next/image";
import { Locations } from "./pindata";

export default function HeroHomeRight() {
  return (
    <div
      className="
        flex justify-center lg:justify-end
        w-full lg:w-[calc(50%-14px)]
        pt-[13.06vh] pb-[7.5vh]
        pr-0 lg:pr-[2.5vw]
        px-4 lg:px-0
        shrink-0
      "
    >
      <div
        className="
        relative
        w-[85%]
        sm:w-[90%]
        md:w-full
        max-w-218.25
        lg:w-[45.99vw]
        aspect-883/858
        mx-auto
      "
      >
        <Image
          src="/map.svg"
          alt="Map"
          fill
          className="object-contain"
          priority
        />

        {Locations.map((location) => (
          <Link
            key={location.name}
            href={location.href}
            className="group absolute cursor-pointer"
            style={{
              left: `${location.leftInPercentage}%`,
              top: `${location.topInPercentage}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="
                relative
                w-8 h-8
                sm:w-14 sm:h-14
                md:w-16 md:h-16
                lg:w-18 lg:h-18
                transition-all duration-300
                group-hover:scale-150
                drop-shadow-[0_0_12px_rgba(235,0,40,0.8)]
              "
            >
              <Image
                src="/locateicon2.svg"
                alt={location.name}
                fill
                className="object-contain"
              />
            </div>
            <div
              className="
                absolute
                left-6 sm:left-8 md:left-10 lg:left-14
                top-1/2 -translate-y-1/2
                whitespace-nowrap
                text-[10px] md:text-xs lg:text-sm
                text-white
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                pointer-events-none
              "
            >
              {location.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}