// "use client";

// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Locations } from "./pindata";

// gsap.registerPlugin(ScrollTrigger);

// /**
//  * Combines HeroHomeLeft + HeroHomeRight + AboutTheTheme into a single
//  * pinned, scroll-scrubbed transition (matches the reference recording):
//  *
//  *  1. Hero logo zooms + fades out, location pins blink out fast
//  *  2. The hero map shape grows large and fades away
//  *  3. The About shape fades in already large, then shrinks into place
//  *  4. "About The Theme" heading + copy + button rise in
//  *
//  * Everything is reversible automatically because GSAP scrub ties the
//  * whole timeline directly to scroll position.
//  *
//  * Only pins/animates on lg+ screens (1024px+). On smaller screens the
//  * two sections just render normally, stacked, with no animation —
//  * pin/scrub scroll-jacking on mobile is almost always a bad idea, and
//  * your About shape is already `hidden lg:flex` only.
//  */
// export default function HeroAboutTransition() {
//   const pinWrapRef = useRef<HTMLDivElement>(null);

//   const heroLayerRef = useRef<HTMLDivElement>(null);
//   const heroLeftRef = useRef<HTMLDivElement>(null);
//   const heroShapeRef = useRef<HTMLDivElement>(null);
//   const pinRefs = useRef<(HTMLAnchorElement | null)[]>([]);

//   const aboutLayerRef = useRef<HTMLDivElement>(null);
//   const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
//   const aboutTextRef = useRef<HTMLDivElement>(null);
//   const aboutShapeRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const mm = gsap.matchMedia();

//     mm.add("(min-width: 1024px)", () => {
//       const pins = pinRefs.current.filter(Boolean) as HTMLAnchorElement[];

//       // Starting states for the layer that's fading IN
//       gsap.set(aboutShapeRef.current, {
//         autoAlpha: 0,
//         scale: 1.8,
//         transformOrigin: "center center",
//       });
//       gsap.set([aboutHeadingRef.current, aboutTextRef.current], {
//         autoAlpha: 0,
//         y: 40,
//       });

//       const tl = gsap.timeline({
//         defaults: { ease: "none" },
//         scrollTrigger: {
//           trigger: pinWrapRef.current,
//           start: "top top",
//           end: "+=120%",
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//         },
//       });

//       tl
//         // --- Hero exits ---
//         .to(
//           heroLeftRef.current,
//           { scale: 1.35, autoAlpha: 0, transformOrigin: "left center", duration: 1 },
//           0
//         )
//         .to(pins, { autoAlpha: 0, scale: 0.5, stagger: 0.04, duration: 0.5 }, 0)
//         .to(
//           heroShapeRef.current,
//           { scale: 1.8, x: "-12vw", transformOrigin: "center center", duration: 1.1 },
//           0.15
//         )
//         .to(heroShapeRef.current, { autoAlpha: 0, duration: 0.45 }, 1.0)

//         // --- About shape lands (overlaps the hero shape fading out) ---
//         .to(aboutShapeRef.current, { autoAlpha: 1, duration: 0.5 }, 0.85)
//         .to(aboutShapeRef.current, { scale: 1, duration: 0.9 }, 0.95)

//         // --- About copy rises in last ---
//         .to(aboutHeadingRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 1.5)
//         .to(aboutTextRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 1.65);

//       return () => {
//         tl.scrollTrigger?.kill();
//         tl.kill();
//       };
//     });

//     // Belt-and-suspenders: if the viewport crosses back under 1024px,
//     // strip any leftover inline transforms so mobile layout is unaffected.
//     mm.add("(max-width: 1023px)", () => {
//       gsap.set(
//         [
//           heroLeftRef.current,
//           heroShapeRef.current,
//           aboutShapeRef.current,
//           aboutHeadingRef.current,
//           aboutTextRef.current,
//           ...pinRefs.current,
//         ],
//         { clearProps: "all" }
//       );
//     });

//     return () => mm.revert();
//   }, []);

//   return (
//     <div ref={pinWrapRef} className="relative w-full lg:h-screen overflow-hidden">
//       {/* ============== HERO LAYER ============== */}
//       <div
//         ref={heroLayerRef}
//         className="relative lg:absolute lg:inset-0 z-20 w-full h-full flex flex-col lg:flex-row items-center"
//       >
//         {/* Hero Left */}
//         <div
//           ref={heroLeftRef}
//           className="
//             flex items-center justify-center
//             w-full lg:w-[calc(50%-14px)]
//             pl-[4.58vw]
//             py-16 lg:py-0
//             shrink-0
//           "
//         >
//           <Image
//             src="/terraIncognitaLogo.svg"
//             alt="Terra Incognita"
//             width={873}
//             height={318}
//             className="
//               w-full
//               max-w-218.25
//               lg:w-[45.47vw]
//               lg:max-w-218.25
//               h-auto
//               lg:max-h-79.5
//               object-contain
//             "
//             priority
//           />
//         </div>

//         {/* Hero Right */}
//         <div
//           className="
//             flex justify-center lg:justify-end
//             w-full lg:w-[calc(50%-14px)]
//             pt-[9.06vh] pb-[7.5vh]
//             pr-0 lg:pr-[2.5vw]
//             px-4 lg:px-0
//             shrink-0
//           "
//         >
//           <div
//             ref={heroShapeRef}
//             className="
//               relative
//               w-[85%]
//               sm:w-[90%]
//               md:w-full
//               max-w-218.25
//               lg:w-[45.99vw]
//               aspect-883/858
//               mx-auto
//             "
//           >
//             <Image src="/map.svg" alt="Map" fill className="object-contain" priority />

//             {Locations.map((location, i) => (
//               <Link
//                 key={location.name}
//                 href={location.href}
//                 ref={(el) => {
//                   pinRefs.current[i] = el;
//                 }}
//                 className="group absolute cursor-pointer"
//                 style={{
//                   left: `${location.leftInPercentage}%`,
//                   top: `${location.topInPercentage}%`,
//                   transform: "translate(-50%, -50%)",
//                 }}
//               >
//                 <div
//                   className="
//                     relative
//                     w-8 h-8
//                     sm:w-22 sm:h-22
//                     md:w-28 md:h-28
//                     lg:w-32 lg:h-32
//                     transition-all duration-300
//                     group-hover:scale-135
//                     drop-shadow-[0_0_12px_rgba(235,0,40,0.8)]
//                   "
//                 >
//                   <Image
//                     src="/locateicon2.svg"
//                     alt={location.name}
//                     fill
//                     className="object-contain"
//                   />
//                 </div>
//                 <div
//                   className="
//                     absolute
//                     left-6 sm:left-8 md:left-18 lg:left-24
//                     top-1/2 -translate-y-1/2
//                     whitespace-nowrap
//                     text-[14px] md:text-sm lg:text-md
//                     text-white
//                     pointer-events-none
//                     font-bebus
//                   "
//                 >
//                   {location.name}
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ============== ABOUT LAYER ============== */}
//       <section
//         ref={aboutLayerRef}
//         className="relative lg:absolute lg:inset-0 z-10 w-full h-full py-12 lg:py-14 overflow-x-hidden"
//       >
//         <div className="pl-6 lg:pl-16 pr-6 lg:pr-0">
//           <h1
//             ref={aboutHeadingRef}
//             className="
//               font-bebas
//               uppercase
//               text-white
//               text-5xl
//               md:text-6xl
//               lg:text-7xl
//               leading-none
//             "
//           >
//             About The Theme
//           </h1>

//           <div className="flex mt-4">
//             <div ref={aboutTextRef} className="w-full lg:w-[45%] lg:pr-12">
//               <div
//                 className="
//                   mt-8
//                   font-space
//                   text-[#D7D0C5]
//                   font-light
//                   text-[18px]
//                   md:text-[18px]
//                   xl:text-[22px]
//                   tracking-[0.64px]
//                   leading-[1.4]
//                   space-y-8
//                 "
//               >
//                 <p>
//                   This year&apos;s theme,{" "}
//                   <span className="text-white">&ldquo;Terra Incognita&rdquo;</span>,
//                   explores how civilization constantly redraws the boundaries
//                   of the acceptable, where ideas once seen as impossible or
//                   unimaginable gradually become part of ordinary reality.
//                 </p>

//                 <p>
//                   Like the blank spaces on ancient maps, the unknown exists
//                   beyond the limits of inherited imagination, waiting to be
//                   understood. Spanning science, technology, philosophy, art,
//                   and human behavior, Terra Incognita celebrates the curiosity
//                   and courage to question established norms and venture into
//                   unexplored ways of thinking.
//                 </p>
//               </div>

//               <button
//                 className="
//                 mt-8
//                 px-4
//                 py-3
//                 rounded-full
//                 border
//                 border-[#B3031C]
//                 text-[#D7D0C5]
//                 bg-[#B3031C]
//                 text-lg
//                 font-large
//                 tracking-[0.5px]
//                 transition-all
//                 duration-300
//                 hover:bg-red-700/40
//                 font-inter
//                 uppercase
//                 "
//               >
//                 watch the reveal
//               </button>
//             </div>

//             <div className="hidden lg:flex lg:w-[55%] justify-end">
//               <div ref={aboutShapeRef} className="relative w-[800px] h-[500px]">
//                 <Image
//                   src="/rectangle.svg"
//                   alt="shape"
//                   fill
//                   className="object-contain filter blur-md z-0 pointer-events-none"
//                 />

//                 <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
//                   <div className="w-[99%] h-[99%] relative">
//                     <Image
//                       src="/rectangle.svg"
//                       alt="inner-shape-black"
//                       fill
//                       className="object-contain"
//                       style={{ filter: "brightness(0) saturate(100%)" }}
//                     />
//                   </div>
//                 </div>

//                 <div
//                   className="absolute inset-0 z-20 overflow-hidden"
//                   style={{
//                     WebkitMaskImage: "url('/rectangle.svg')",
//                     WebkitMaskSize: "contain",
//                     WebkitMaskRepeat: "no-repeat",
//                     WebkitMaskPosition: "center",
//                     maskImage: "url('/rectangle.svg')",
//                     maskSize: "contain",
//                     maskRepeat: "no-repeat",
//                     maskPosition: "center",
//                   }}
//                 >
//                   <Image
//                     src="/aboutTheThemeBg.svg"
//                     alt="about the theme"
//                     fill
//                     className="object-cover"
//                   />

//                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     <Image
//                       src="/terraIncognitaLogo.svg"
//                       alt="terra incognita"
//                       width={300}
//                       height={300}
//                       className="object-contain z-30"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Locations } from "./pindata";

gsap.registerPlugin(ScrollTrigger);

/**
 * Combines HeroHomeLeft + HeroHomeRight + AboutTheTheme into a single
 * pinned, scroll-scrubbed transition (matches the reference recording):
 *
 *  1. Hero logo zooms + fades out, location pins blink out fast
 *  2. The hero map shape grows large and fades away
 *  3. The About shape fades in already large, then shrinks into place
 *  4. "About The Theme" heading + copy + button rise in
 *
 * Everything is reversible automatically because GSAP scrub ties the
 * whole timeline directly to scroll position.
 *
 * Only pins/animates on lg+ screens (1024px+). On smaller screens the
 * two sections just render normally, stacked, with no animation —
 * pin/scrub scroll-jacking on mobile is almost always a bad idea, and
 * your About shape is already `hidden lg:flex` only.
 */
export default function HeroAboutTransition() {
  const pinWrapRef = useRef<HTMLDivElement>(null);

  const heroLayerRef = useRef<HTMLDivElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroShapeRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const aboutLayerRef = useRef<HTMLDivElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const aboutShapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const pins = pinRefs.current.filter(Boolean) as HTMLAnchorElement[];

      // Starting states for the layer that's fading IN
      gsap.set(aboutShapeRef.current, {
        autoAlpha: 0,
        scale: 1.8,
        transformOrigin: "center center",
      });
      gsap.set([aboutHeadingRef.current, aboutTextRef.current], {
        autoAlpha: 0,
        y: 40,
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pinWrapRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl
        // --- Hero exits ---
        .to(
          heroLeftRef.current,
          { scale: 1.35, autoAlpha: 0, transformOrigin: "left center", duration: 1 },
          0
        )
        .to(pins, { autoAlpha: 0, scale: 0.5, stagger: 0.04, duration: 0.5 }, 0)
        .to(
          heroShapeRef.current,
          { scale: 1.8, x: "-12vw", transformOrigin: "center center", duration: 1.1 },
          0.15
        )
        .to(heroShapeRef.current, { autoAlpha: 0, duration: 0.45 }, 1.0)

        // --- About shape lands (overlaps the hero shape fading out) ---
        .to(aboutShapeRef.current, { autoAlpha: 1, duration: 0.5 }, 0.85)
        .to(aboutShapeRef.current, { scale: 1, duration: 0.9 }, 0.95)

        // --- About copy rises in last ---
        .to(aboutHeadingRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 1.5)
        .to(aboutTextRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 1.65);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    // Belt-and-suspenders: if the viewport crosses back under 1024px,
    // strip any leftover inline transforms so mobile layout is unaffected.
    mm.add("(max-width: 1023px)", () => {
      gsap.set(
        [
          heroLeftRef.current,
          heroShapeRef.current,
          aboutShapeRef.current,
          aboutHeadingRef.current,
          aboutTextRef.current,
          ...pinRefs.current,
        ],
        { clearProps: "all" }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={pinWrapRef} className="relative w-full lg:h-screen overflow-hidden">
      {/* ============== HERO LAYER ============== */}
      <div
        ref={heroLayerRef}
        className="relative lg:absolute lg:inset-0 z-20 w-full h-full flex flex-col lg:flex-row items-center"
      >
        {/* Hero Left */}
        <div
          ref={heroLeftRef}
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

        {/* Hero Right */}
        <div
          className="
            flex justify-center lg:justify-end
            w-full lg:w-[calc(50%-14px)]
            pt-[9.06vh] pb-[7.5vh]
            pr-0 lg:pr-[2.5vw]
            px-4 lg:px-0
            shrink-0
          "
        >
          <div
            ref={heroShapeRef}
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
            <Image src="/map.svg" alt="Map" fill className="object-contain" priority />

            {Locations.map((location, i) => (
              <Link
                key={location.name}
                href={location.href}
                ref={(el) => {
                  pinRefs.current[i] = el;
                }}
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
                    sm:w-22 sm:h-22
                    md:w-28 md:h-28
                    lg:w-32 lg:h-32
                    transition-all duration-300
                    group-hover:scale-135
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
                    left-6 sm:left-8 md:left-18 lg:left-24
                    top-1/2 -translate-y-1/2
                    whitespace-nowrap
                    text-[14px] md:text-sm lg:text-md
                    text-white
                    pointer-events-none
                    font-bebus
                  "
                >
                  {location.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ============== ABOUT LAYER ============== */}
      <section
        ref={aboutLayerRef}
        className="relative lg:absolute lg:inset-0 z-10 w-full h-full py-12 lg:py-14 overflow-x-hidden"
      >
        <div className="pl-6 lg:pl-16 pr-6 lg:pr-0">
          <h1
            ref={aboutHeadingRef}
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
          </h1>

          <div className="flex mt-4">
            <div ref={aboutTextRef} className="w-full lg:w-[45%] lg:pr-12">
              <div
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
                  <span className="text-white">&ldquo;Terra Incognita&rdquo;</span>,
                  explores how civilization constantly redraws the boundaries
                  of the acceptable, where ideas once seen as impossible or
                  unimaginable gradually become part of ordinary reality.
                </p>

                <p>
                  Like the blank spaces on ancient maps, the unknown exists
                  beyond the limits of inherited imagination, waiting to be
                  understood. Spanning science, technology, philosophy, art,
                  and human behavior, Terra Incognita celebrates the curiosity
                  and courage to question established norms and venture into
                  unexplored ways of thinking.
                </p>
              </div>

              <button
                className="
                mt-8
                px-4
                py-3
                rounded-full
                border
                border-[#B3031C]
                text-[#D7D0C5]
                bg-[#B3031C]
                text-lg
                font-large
                tracking-[0.5px]
                transition-all
                duration-300
                hover:bg-red-700/40
                font-inter
                uppercase
                "
              >
                watch the reveal
              </button>
            </div>

            <div className="hidden lg:flex lg:w-[55%] justify-end">
              <div ref={aboutShapeRef} className="relative w-[800px] h-[500px]">
                <Image
                  src="/rectangle.svg"
                  alt="shape"
                  fill
                  className="object-contain filter blur-md z-0 pointer-events-none"
                />

                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-[99%] h-[99%] relative">
                    <Image
                      src="/rectangle.svg"
                      alt="inner-shape-black"
                      fill
                      className="object-contain"
                      style={{ filter: "brightness(0) saturate(100%)" }}
                    />
                  </div>
                </div>

                <div
                  className="absolute inset-0 z-20 overflow-hidden"
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
                    alt="about the theme"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Image
                      src="/terraIncognitaLogo.svg"
                      alt="terra incognita"
                      width={300}
                      height={300}
                      className="object-contain z-30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}