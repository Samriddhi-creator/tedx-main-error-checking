import Link from "next/link";
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
          w-full
          max-w-218.25
          lg:w-[45.99vw]
          aspect-883/858
        "
      >
        <img
          src="/map.png"
          alt="Map"
          className="w-full h-full object-contain"
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
            <img
              src="/locateicon.png"
              alt={location.name}
              className="
                w-4 h-4
                sm:w-5 sm:h-5
                md:w-6 md:h-6
                lg:w-8 lg:h-8
                transition-all duration-300
                group-hover:scale-150
                drop-shadow-[0_0_12px_rgba(235,0,40,0.8)]
              "
            />
            <div
              className="
                absolute left-10 top-1/2 -translate-y-1/2
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