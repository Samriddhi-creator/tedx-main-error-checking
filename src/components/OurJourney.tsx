 "use client";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const editions = [
    { id: 1, year: 2025, title: "Kaleidoscopic Interludes", description: `"Kaleidoscopic" evokes vibrant, ever-shifting patterns—glimpses of identity refracted through time and experience. "Interludes" suggests pauses in life's rhythm—transitional moments that carry quiet transformation."`, side: "right", image: "/images/KI.png" ,link:"#"},
    { id: 2, year: 2024, title: "Veiled Veracity", description: `"Veiled Veracity" reminds us that even in confusion, hope leads us to clarity. It urges us to confront illusions and seek truth with courage. "Veiled" hints at hidden truths, while "Veracity" emphasizes honesty in our search for meaning`, side: "left", image: "/images/VV.png" ,link:"#"},
    { id: 3, year: 2023, title: "Prisms of Perception", description: `Prisms of Perception" explores how our view of the world, like light through a prism, is shaped by various factors. It shows that by shifting perspective, we reveal new ideas and solutions, fostering innovation and understanding.`, side: "right", image: "/images/PoP.png",link:"#" },
    { id: 4, year: 2022, title: "Infinite Affinities", description: `At TEDxIITPatna, we believe dreams become reality together. Infinite Affinities celebrates unity, shared effort, and the humanity that connects us. Each of us has a role—to inspire a brighter future.`, side: "left", image: "/images/IA.png",link:"infinite" },
    { id: 5, year: 2021, title: "Roar", description: `The 3rd Edition of TEDxIIT Patna, Roar – The Acoustic of Strength, celebrated resilience and inner power. When we overcome fear and take charge of our thoughts, we unlock the strength to face any challenge. Unleash your inner roar and join us on the path to a stronger self.`, side: "right", image: "/images/Ro.png" ,link:"roar"},
    { id: 6, year: 2019, title: "Metamorphosis", description: `The 2nd Edition of TEDxIITPatna, Metamorphosis, embraced change as a constant force. It highlighted how transformation brings growth and how adapting is key. Experts explored its impact on technology, entertainment, and societal values.`, side: "left", image: "/images/MM.png",link:"/metamorphosis" },
    { id: 7, year: 2016, title: "Shedding Off Feathers", description: `TEDxIITPatna believes that building anything new is possible when we let go of the old. Just as birds shed their feathers, allowing the new ones to embrace, taking them afresh to infinite skies, bringing out change is an inevitable part of one's life to keep walking the course of life.`, side: "right", image: "/images/SoF.png",link:"shedding" },
];

export default function OurJourney() {

    const timelineRef = useRef<HTMLDivElement>(null);
    const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
    const segmentsRef = useRef<(SVGLineElement | null)[]>([]);
    const islandsRef = useRef<(HTMLDivElement | null)[]>([]);
    const boatRef = useRef<HTMLDivElement>(null);
    const boatPathRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        //Force scroll to top on mount
        window.scrollTo(0, 0);
        //Smooth scroll setup
        const lenis = new Lenis({ duration: 2 });
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        if (!timelineRef.current) return;
        if (typeof window === "undefined") return;

        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            //Mobile: fade up per row 
            document.querySelectorAll(".edition-row").forEach(row => {
                gsap.fromTo(row,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: row,
                            start: "top 85%",
                            once: true,
                        }
                    }
                );
            });

            //Mobile: animate divider lines
            document.querySelectorAll(".mobile-divider").forEach(divider => {
                gsap.fromTo(divider,
                    { scaleY: 0, opacity: 0 },
                    {
                        scaleY: 1, opacity: 1,
                        duration: 0.4,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: divider,
                            start: "top 90%",
                            once: true,
                        }
                    }
                );
            });

        } else {
            //Desktop: hide all rows initially
            document.querySelectorAll(".edition-row").forEach(row => {
                gsap.set(row, { opacity: 0 });
            });

            //Desktop: show first dot and first row on load 
            if (dotsRef.current[0]) gsap.set(dotsRef.current[0], { opacity: 1 });
            const firstRow = document.querySelector(".edition-row") as HTMLElement;
            if (firstRow) gsap.set(firstRow, { opacity: 1, y: 0 });

            //Desktop: checkpoint + boat — all inside setTimeout so layout is settled 
            setTimeout(() => {

                //Checkpoint animation
                editions.slice(0, -1).forEach((_, index) => {
                    const currentDot = dotsRef.current[index];
                    const nextDot = dotsRef.current[index + 1];
                    const segment = segmentsRef.current[index];
                    const nextEntry = document.querySelectorAll(".edition-row")[index + 1] as HTMLElement;
                    const nextIsland = islandsRef.current[index + 1];

                    if (!currentDot || !nextDot || !segment || !timelineRef.current) return;

                    //calculate dot positions relative to timeline container
                    const containerTop = timelineRef.current.getBoundingClientRect().top + window.scrollY;
                    const fromY = currentDot.getBoundingClientRect().top + window.scrollY - containerTop;
                    const toY = nextDot.getBoundingClientRect().top + window.scrollY - containerTop;

                    //set segment start position (collapsed at current dot)
                    segment.setAttribute("y1", String(fromY));
                    segment.setAttribute("y2", String(fromY));

                    //trigger sequence when next dot enters viewport
                    ScrollTrigger.create({
                        trigger: nextEntry,
                        start: "top 100%",
                        once: true,
                        preventOverlaps: true,
                        fastScrollEnd: true,
                        onEnter: () => {
                            const tl = gsap.timeline();
                            //1.draw line down to next dot
                            tl.to(segment, { attr: { y2: toY }, duration: 0.6, ease: "power4.out" })
                                //2.pop in next dot
                                .to(nextDot, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out" }, "-=0.1")
                                //3.fade in the island
                                .fromTo(nextIsland, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.2")
                                //4.fade in next entry row
                                .fromTo(nextEntry,
                                    { opacity: 0, y: 30 },
                                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.1"
                                );
                        }
                    });
                });

                //Boat Path Animation 
                if (boatRef.current && pathRef.current && timelineRef.current) {
                    const containerTop = timelineRef.current.getBoundingClientRect().top + window.scrollY;

                    //Get dot positions relative to timeline container
                    const dotPositions = dotsRef.current.map(dot => {
                        if (!dot) return { x: 0, y: 0 };
                        const rect = dot.getBoundingClientRect();
                        return {
                            x: rect.left + rect.width / 2 - timelineRef.current!.getBoundingClientRect().left,
                            y: rect.top + window.scrollY - containerTop + rect.height / 2,
                        };
                    });

                    //Unique path offsets per segment (seg 0 is hardcoded below)
                    const pathOffsets = [
                        { cp1x: -500, cp1y: 0.2, cp2x: -400, cp2y: 0.8 }, // placeholder, not used
                        { cp1x: 600, cp1y: 0.3, cp2x: 500, cp2y: 0.7 },
                        { cp1x: -300, cp1y: 0.1, cp2x: -600, cp2y: 0.9 },
                        { cp1x: 400, cp1y: 0.5, cp2x: 700, cp2y: 0.5 },
                        { cp1x: -600, cp1y: 0.3, cp2x: -300, cp2y: 0.6 },
                        { cp1x: 500, cp1y: 0.2, cp2x: 400, cp2y: 0.9 },
                    ];

                    let pathD = `M ${dotPositions[0].x} ${dotPositions[0].y}`;
                    const p0 = dotPositions[0];
                    const p1 = dotPositions[1];
                    const p2 = dotPositions[2];
                    const p3 = dotPositions[3];
                    const p4 = dotPositions[4];
                    const p5 = dotPositions[5];
                    const p6 = dotPositions[6];
                    //Segment 0 
                    const dy0 = p1.y - p0.y;
                    const mid0 = { x: p0.x + 600, y: p0.y + dy0 * 0.6 };
                    pathD += ` C ${p0.x - 700} ${p0.y + dy0 * 0.2}, ${mid0.x - 1000} ${mid0.y - 50}, ${mid0.x} ${mid0.y}`;
                    pathD += ` C ${mid0.x + 100} ${mid0.y + 50}, ${p1.x + 200} ${p1.y - 100}, ${p1.x} ${p1.y}`;

                    //Segment 1
                    const dy1 = p2.y - p1.y;
                    const mid1 = { x: p1.x - 400, y: p1.y + dy1 * 0.5 };
                    pathD += ` C ${p1.x + 700} ${p1.y + dy1 * 0.2}, ${mid1.x + 1000} ${mid1.y - 50}, ${mid1.x} ${mid1.y}`;
                    pathD += ` C ${mid1.x + 100} ${mid1.y + 50}, ${p2.x + 200} ${p2.y - 100}, ${p2.x} ${p2.y}`;

                    //Segment 2
                    const dy2 = p3.y - p2.y;
                    pathD += ` C ${p2.x - 400} ${p2.y + dy2 * 0.2}, ${p3.x + 400} ${p2.y + dy2 * 0.8}, ${p3.x} ${p3.y}`;

                    //Segment 3
                    const dy3 = p4.y - p3.y;

                    const loopSize = 90;
                    pathD += ` C ${p3.x - loopSize} ${p3.y}, ${p3.x - loopSize} ${p3.y - loopSize * 2}, ${p3.x} ${p3.y - loopSize * 2}`;
                    pathD += ` C ${p3.x + 900} ${p3.y - loopSize * 2 + 100}, ${p4.x - 900} ${p4.y - 100}, ${p4.x} ${p4.y}`;

                    //Segment 4
                    const dy4 = p5.y - p4.y;
                    const mid4 = { x: p4.x + 600, y: p4.y + dy4 * 0.6 };
                    pathD += ` C ${p4.x - 700} ${p4.y + dy4 * 0.2}, ${mid4.x - 1000} ${mid4.y - 50}, ${mid4.x} ${mid4.y}`;
                    pathD += ` C ${mid4.x + 100} ${mid4.y + 50}, ${p5.x + 200} ${p5.y - 100}, ${p5.x} ${p5.y}`;

                    //Segment 5
                    const dy5 = p6.y - p5.y;
                    const mid5 = { x: p5.x + 500, y: p5.y + dy5 * 0.5 };


                    pathD += ` C ${p5.x + 600} ${p5.y + dy5 * 0.1}, ${mid5.x + 200} ${mid5.y - 100}, ${mid5.x} ${mid5.y}`;
                    pathD += ` C ${mid5.x - 200} ${mid5.y - 200}, ${p6.x - 700} ${p6.y - 100}, ${p6.x} ${p6.y}`;


                    pathRef.current.setAttribute("d", pathD);
                    gsap.set(boatRef.current, { opacity: 1 });

                    //Animate boat along path scrubbed to scroll
                    gsap.to(boatRef.current, {
                        motionPath: {
                            path: "#boatPath",
                            align: "#boatPath",
                            autoRotate: true,
                            alignOrigin: [0.5, 0.5],
                        },
                        ease: "none",
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: true,
                        }
                    });
                }

            }, 200);
        }

        //Cleanup on unmount
        return () => {
            lenis.destroy();
        };

    }, []);

    return (
        <section
            className="relative w-full min-h-screen px-4 py-16"
            style={{
                backgroundImage: `url('/images/bg1.png'), url('/images/bg2.png')`,
                backgroundRepeat: 'repeat-y, repeat-y',
                backgroundPosition: 'top, center',
                backgroundSize: '100%, 100%',
            }}
        >
            {/* Black overlay over background */}
            <div className="absolute inset-0 bg-black/40 z-0" />

            {/* Page title */}
            <Image
                src="/ourjourney.svg"
                alt="Our Journey"
                width={800}
                height={200}
                className="relative z-10 mx-auto mb-24 w-[90%] md:w-[800px]"
                priority
            />

            {/* Timeline container */}
            <div ref={timelineRef} className="relative z-10 max-w-5xl mx-auto">

                {/* Animated SVG line segments (desktop only) */}
                <svg
                    className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none w-[2px]"
                    style={{ height: "100%" }}
                    overflow="visible"
                >
                    {editions.slice(0, -1).map((_, index) => (
                        <line
                            key={index}
                            ref={el => { segmentsRef.current[index] = el; }}
                            x1="1" y1="0"
                            x2="1" y2="0"
                            stroke="rgba(255,255,255,1)"
                            strokeWidth="1.5"
                        />
                    ))}
                </svg>

                {/* Boat path SVG — desktop only */}
                <svg
                    ref={boatPathRef}
                    className="hidden md:block absolute left-0 top-0 pointer-events-none w-full"
                    style={{ height: "100%" }}
                    overflow="visible"
                >
                    <path
                        ref={pathRef}
                        id="boatPath"
                        fill="none"
                        stroke="rgba(255,255,255,0)"
                    />
                </svg>

                {/* Boat — desktop only, placeholder */}
                <div
                    ref={boatRef}
                    className="hidden md:block absolute z-20 text-2xl pointer-events-none opacity-0"
                >
                    🚢
                </div>

                {/* Edition rows */}
                {editions.map((edition, index) => (
                    <div key={edition.id}>
                        <div className="edition-row relative flex flex-col md:flex-row items-center mb-0 md:mb-64">

                            {/* Island background — desktop only, animates in with content */}
                            <div
                                ref={el => { islandsRef.current[index] = el; }}
                                className={`hidden md:block absolute -z-10 pointer-events-none ${index % 2 === 0 ? '-right-64' : '-left-64 -rotate-12'}`}
                            >
                                <Image
                                    src="/map.svg"
                                    alt=""
                                    width={800}
                                    height={800}
                                    className="opacity-60"
                                />
                            </div>

                            {/* Left side — shows content when edition.side === "left" */}
                            <div className="journey-entry entry-left w-full md:w-1/2 md:pr-16 flex flex-col justify-center items-center md:items-start mb-4 md:mb-0">
                                {edition.side === "left" && (
                                   <Link href={edition.link} className="w-full">  <div className="flex flex-col items-center md:items-start w-full">
                                        <Image
                                            src={edition.image}
                                            alt={edition.title}
                                            width={720}
                                            height={720}
                                            className="object-contain mb-4 w-full md:w-[440px] md:h-[440px]"
                                            priority
                                        />
                                        <div style={{ fontFamily: 'var(--font-space)' }}>
                                            <h2 className="text-white font-bold text-lg uppercase text-center md:text-left">{edition.title} ({edition.year})</h2>
                                            <p className="text-white/60 text-sm mt-2 text-center md:text-left">{edition.description}</p>
                                        </div>
                                    </div></Link>
                                )}
                            </div>

                            {/* Center dot — hidden on mobile, GSAP reveals on desktop */}
                            <div
                                ref={el => { dotsRef.current[index] = el; }}
                                className="hidden md:block md:absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white z-10 opacity-0"
                            />

                            {/* Right side — shows content when edition.side === "right" */}
                            <div className="journey-entry entry-right w-full md:w-1/2 md:pl-16 flex flex-col justify-center items-center md:items-end">
                                {edition.side === "right" && (
                                   <Link href={edition.link} className="w-full">
                                     <div className="flex flex-col items-center md:items-end w-full">
                                         <Image
                                             src={edition.image}
                                             alt={edition.title}
                                             width={720}
                                             height={720}
                                             className="object-contain mb-4 w-full md:w-[440px] md:h-[440px]"
                                             priority
                                         />
                                         <div style={{ fontFamily: 'var(--font-space)' }}>
                                             <h2 className="text-white font-bold text-lg uppercase text-center md:text-right">{edition.title} ({edition.year})</h2>
                                             <p className="text-white/60 text-sm mt-2 text-center md:text-right">{edition.description}</p>
                                         </div>
                                     </div>
                                   </Link>
                                )}
                            </div>

                        </div>

                        {/* Mobile divider line between entries — animated by GSAP */}
                        {index < editions.length - 1 && (
                            <div className="mobile-divider md:hidden w-px h-40 bg-white/30 mx-auto my-8" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
} 