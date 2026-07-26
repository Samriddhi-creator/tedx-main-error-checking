"use client"
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useCallback, useLayoutEffect } from "react"
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { useJourneyStore } from "@/src/store/useJourneyStore";

const leftLinks = [
    { label: "TED Website", href: "https://www.ted.com/" },
    { label: "Terms and Conditions", href: "https://www.ted.com/participate/organize-a-local-tedx-event/before-you-start/tedx-rules" },
    { label: "About TEDx", href: "https://www.ted.com/about/programs-initiatives/tedx-program" }
];

const socialLinks = [
    { icon: FaInstagram, href: "https://www.instagram.com/tedxiitpatna" },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/tedxiitpatna" },
    { icon: FaFacebookF, href: "https://www.facebook.com/tedxiitpatna" },
    { icon: FaXTwitter, href: "https://twitter.com/tedxiitpatna" },
];

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Speakers", href: "/speakers" },
    /*{ label: "Past Editions", href: "/past-editions" },
    { label: "Pre - event", href: "/funfair" },
    { label: "Your Cart", href: "/cart" },*/
];
const FRICTION = 0.95;       // per-16.67ms-frame velocity decay
const MIN_VELOCITY = 0.02;   // px/ms — stop inertia below this

export default function Footer() {
    const rulerRef = useRef<HTMLDivElement>(null);
    const [spotX, setSpotX] = useState<number | null>(null);
    const addJourneyDistance = useJourneyStore((state) => state.addJourneyDistance);

    const isDraggingRuler = useRef(false);
    const startX = useRef(0);
    const startScrollLeft = useRef(0);

    // Distance-delta tracking (drives infinite-scroll wrap + journeyDistance)
    const lastScrollLeft = useRef(0);
    const patternWidthRef = useRef(0);

    // Velocity tracking for inertia
    const dragLastX = useRef(0);
    const dragLastTime = useRef(0);
    const velocityRef = useRef(0); // scrollLeft px per ms
    const inertiaFrame = useRef<number | null>(null);

    const stopInertia = useCallback(() => {
        if (inertiaFrame.current !== null) {
            cancelAnimationFrame(inertiaFrame.current);
            inertiaFrame.current = null;
        }
    }, []);

    const runInertia = useCallback(() => {
        let lastTime = performance.now();

        const step = (time: number) => {
            const el = rulerRef.current;
            if (!el) {
                inertiaFrame.current = null;
                return;
            }

            const dt = time - lastTime;
            lastTime = time;

            el.scrollLeft += velocityRef.current * dt;
            // frame-rate independent exponential decay
            velocityRef.current *= Math.pow(FRICTION, dt / 16.67);

            if (Math.abs(velocityRef.current) > MIN_VELOCITY) {
                inertiaFrame.current = requestAnimationFrame(step);
            } else {
                inertiaFrame.current = null;
            }
        };

        inertiaFrame.current = requestAnimationFrame(step);
    }, []);

    const handleGlobalMouseMove = useCallback((e: MouseEvent) => {
        if (!isDraggingRuler.current || !rulerRef.current) return;

        const walk = (e.clientX - startX.current) * 0.2; // scroll speed multiplier
        rulerRef.current.scrollLeft = startScrollLeft.current - walk;

        const now = performance.now();
        const dt = now - dragLastTime.current;
        if (dt > 0) {
            const dx = e.clientX - dragLastX.current;
            // matches the *2 multiplier above, negative because dragging right moves scrollLeft left
            velocityRef.current = (-dx / dt) * 0.2;
        }
        dragLastX.current = e.clientX;
        dragLastTime.current = now;
    }, []);

    const handleGlobalMouseUp = useCallback(() => {
        isDraggingRuler.current = false;
        window.removeEventListener("mousemove", handleGlobalMouseMove);
        window.removeEventListener("mouseup", handleGlobalMouseUp);
        runInertia();
    }, [handleGlobalMouseMove, runInertia]);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        stopInertia();
        isDraggingRuler.current = true;
        startX.current = e.clientX;
        startScrollLeft.current = rulerRef.current?.scrollLeft || 0;
        dragLastX.current = e.clientX;
        dragLastTime.current = performance.now();
        velocityRef.current = 0;
        e.preventDefault();
        window.addEventListener("mousemove", handleGlobalMouseMove);
        window.addEventListener("mouseup", handleGlobalMouseUp);
    }, [handleGlobalMouseMove, handleGlobalMouseUp, stopInertia]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = rulerRef.current?.getBoundingClientRect();
        if (rect) setSpotX(e.clientX - rect.left);
    };

    const handleMouseLeave = () => setSpotX(null);

    // Single source of truth for distance + the infinite-scroll illusion.
    // Fires for drag (we set scrollLeft directly), inertia (same), and native
    // wheel/trackpad scrolling on the ruler — so all three "just work".
    const handleScroll = useCallback(() => {
        const el = rulerRef.current;
        if (!el) return;

        const current = el.scrollLeft;
        const delta = current - lastScrollLeft.current;
        lastScrollLeft.current = current;

        if (delta !== 0) {
            addJourneyDistance(delta);
        }

        const patternWidth = patternWidthRef.current;
        if (patternWidth > 0) {
            if (el.scrollLeft < patternWidth * 0.5) {
                el.scrollLeft += patternWidth;
                lastScrollLeft.current += patternWidth;
            } else if (el.scrollLeft > patternWidth * 1.5) {
                el.scrollLeft -= patternWidth;
                lastScrollLeft.current -= patternWidth;
            }
        }
    }, [addJourneyDistance]);

    const RulerPattern = () => (
        <div className="flex items-end justify-between h-full w-[3500px] shrink-0 pb-[2px]">
            {Array.from({ length: 300 }).map((_, i) => (
                <div
                    key={i}
                    className={`w-[2px] shrink-0 bg-red-800 ${i % 10 === 0 ? 'h-[24px]' :
                        i % 5 === 0 ? 'h-[16px]' :
                            'h-[8px] opacity-40'
                        }`}
                />
            ))}
        </div>
    );

    useLayoutEffect(() => {
        return () => {
            window.removeEventListener("mousemove", handleGlobalMouseMove);
            window.removeEventListener("mouseup", handleGlobalMouseUp);
            stopInertia();
        };
    }, [handleGlobalMouseMove, handleGlobalMouseUp, stopInertia]);

    useLayoutEffect(() => {
        if (!rulerRef.current) return;
        const patternWidth = rulerRef.current.scrollWidth / 3;
        patternWidthRef.current = patternWidth;
        rulerRef.current.scrollLeft = patternWidth;
        lastScrollLeft.current = patternWidth;
    }, []);

    return (
        <footer className="bg-black text-white flex flex-col mt-0 overflow-x-hidden relative z-[60]">
            {/* Ruler */}
            <div className="w-full relative h-[40px] bg-black border-t border-red-900/30">
                <div
                    ref={rulerRef}
                    onPointerDown={handleMouseDown}
                    onPointerMove={handleMouseMove}
                    onPointerLeave={handleMouseLeave}
                    onScroll={handleScroll}
                    className="w-full h-full overflow-x-auto overflow-y-hidden flex items-end cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {/* CSS Ruler - guaranteed horizontal scroll width */}
                    <div className="flex shrink-0">
                        <RulerPattern />
                        <RulerPattern />
                        <RulerPattern />
                    </div>
                </div>

                {/* Fixed overlays that don't scroll */}
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                {spotX !== null && (
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle 80px at ${spotX}px 50%, rgba(220,38,38,0.4) 0%, transparent 100%)`,
                        }}
                    />
                )}
            </div>

            {/* Main content */}
            <div className="flex justify-between items-start px-4 md:px-16 py-4 md:py-8 gap-2 md:gap-8">

                {/* Left col */}
                <div className="flex flex-col gap-2 md:gap-4 flex-[600] md:flex-[724]">
                    <Image src="/logo.svg" alt="TEDxIITPatna" width={527} height={108} className="w-32 md:w-[384px] h-auto" />
                    <div className="flex flex-col gap-1 md:gap-3 mt-2 md:mt-6">
                        {/* External links */}
                        {leftLinks.map((link) => (<Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white font-['Inter'] text-[10px] md:text-lg hover:text-red-500 transition-colors" >
                            <span className="text-red-600">›</span> {link.label} </Link>
                        ))}
                        {/* Internal link */}
                        <Link href="/refund" className="flex items-center gap-1 text-white font-['Inter'] text-[10px] md:text-lg hover:text-red-500 transition-colors" >
                            <span className="text-red-600">›</span> Refund Policy </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="-ml-1 self-stretch w-[3px]" style={{ background: "repeating-linear-gradient(to bottom, rgba(153,27,27,0.5) 0px, rgba(153,27,27,0.5) 4px, transparent 8px, transparent 18px)" }} />

                {/* Middle col */}
                <div className="flex flex-col items-center gap-2 md:gap-4 flex-[624] -mt-2 md:-mt-1">
                    <h3 className="font-['Inter'] text-base md:text-2xl font-bold text-red-600">Follow us</h3>
                    <div className="flex gap-2 md:gap-6">
                        {socialLinks.map(({ icon: Icon, href }) => (
                            <Link key={href} href={href} target="_blank" rel="noopener noreferrer"
                                className="size-6 md:size-10 bg-white rounded flex items-center justify-center text-black text-3xs md:text-4xl hover:bg-red-600 hover:text-white transition-colors">
                                <Icon />
                            </Link>
                        ))}
                    </div>
                    <div className="w-full h-[1px] bg-red-800/30" />
                    <h3 className="font-['Inter'] text-base md:text-2xl font-bold text-white">Contact Us</h3>
                    <div className="flex flex-col gap-3 md:gap-4 items-center w-full">
                        <div className="flex flex-col items-center text-center">
                            <span className="font-['Inter'] text-[9px] md:text-xs text-red-500 font-semibold uppercase tracking-wider mb-0.5">Speaker Queries</span>
                            <Link href="mailto:tedxiitpatna@gmail.com"
                                className="flex items-center gap-1 text-white font-['Inter'] text-[10px] md:text-sm font-normal hover:text-red-500 transition-colors">
                                <Image src="/mail.svg" alt="mail" width={16} height={16} className="w-3.5 h-3.5 md:w-5 md:h-5" />
                                <span className="-ml-1 md:ml-0 md:text-lg">curation.tedxiitpatna@iitp.ac.in</span>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <span className="font-['Inter'] text-[9px] md:text-xs text-red-500 font-semibold uppercase tracking-wider mb-0.5">Sponsor Queries</span>
                            <div className="-ml-1">
                                <Link href="mailto:tedxiitpatna@gmail.com"
                                    className="flex items-center gap-1 text-white font-['Inter'] text-[10px] md:text-sm font-normal hover:text-red-500 transition-colors">
                                    <Image src="/mail.svg" alt="mail" width={16} height={16} className="w-3.5 h-3.5 md:w-5 md:h-5" />
                                    <span className="-ml-1 md:ml-0 md:text-lg">sponsorship.tedxiitpatna@iitp.ac.in</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="ml-2 self-stretch w-[3px]" style={{ background: "repeating-linear-gradient(to bottom, rgba(153,27,27,0.5) 0px, rgba(153,27,27,0.5) 4px, transparent 8px, transparent 18px)" }} />

                {/* Right col */}
                <div className="flex flex-col gap-0 md:gap-1 flex-[620]] md:flex-[572] items-start -mt-2 md:mt-0">
                    <h3 className="font-['Inter'] text-base md:text-2xl font-bold text-red-600 md:ml-24">Quick Links</h3>
                    {quickLinks.map((link) => (
                        <Link key={link.label} href={link.href}
                            className="flex items-center gap-1 text-white font-['Inter'] text-[10px] md:text-lg hover:text-red-500 transition-colors md:ml-24 mt-3 md:mt-2">
                            <span className="text-red-600">
                                <Image src="/compass.svg" alt="•" width={12} height={12} className="md:w-[14px] md:h-[14px]" />
                            </span> {link.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="flex justify-between px-4 md:px-16 py-3 md:py-4 border-t border-white/10 text-white">
                <p className="font-['Inter'] text-[8px] md:text-sm font-medium">*This Independent TEDx Event Is Operated Under License From TED.</p>
                <p className="font-['Inter'] text-[8px] md:text-sm font-normal">© 2026 TEDxIITPatna. All rights reserved.</p>
            </div>
        </footer >
    );
}