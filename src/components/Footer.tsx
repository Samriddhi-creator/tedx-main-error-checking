"use client"
import Image from "next/image";
import React, { useRef, useState } from "react"
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { useJourneyStore } from "@/src/store/useJourneyStore";

const leftLinks = [
    { label: "TED Website", href: "https://www.ted.com/" },
    { label: "Terms and Conditions", href: "https://www.ted.com/participate/organize-a-local-tedx-event/before-you-start/tedx-rules" },
    { label: "About TEDx", href: "https://www.ted.com/about/programs-initiatives/tedx-program" },
    { label: "Refund Policy", href: "/refund-policy" }
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

export default function Footer() {
    const rulerRef = useRef<HTMLDivElement>(null);
    const [spotX, setSpotX] = useState<number | null>(null);
    const setRulerProgress = useJourneyStore((state) => state.setRulerProgress);

    const isDraggingRuler = useRef(false);
    const startX = useRef(0);
    const startScrollLeft = useRef(0);

    const handleGlobalMouseMove = React.useCallback((e: MouseEvent) => {
        if (!isDraggingRuler.current || !rulerRef.current) return;
        const walk = (e.clientX - startX.current) * 2; // scroll speed multiplier
        rulerRef.current.scrollLeft = startScrollLeft.current - walk;

        // Update progress directly on drag to avoid browser scroll event delays
        const { scrollLeft, scrollWidth, clientWidth } = rulerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        if (maxScroll > 0) {
            setRulerProgress(scrollLeft / maxScroll);
        }
    }, [setRulerProgress]);

    const handleGlobalMouseUp = React.useCallback(() => {
        isDraggingRuler.current = false;
        window.removeEventListener("mousemove", handleGlobalMouseMove);
        window.removeEventListener("mouseup", handleGlobalMouseUp);
    }, [handleGlobalMouseMove]);

    const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        isDraggingRuler.current = true;
        startX.current = e.clientX;
        startScrollLeft.current = rulerRef.current?.scrollLeft || 0;
        e.preventDefault(); // Prevent text selection/drag behaviors
        window.addEventListener("mousemove", handleGlobalMouseMove);
        window.addEventListener("mouseup", handleGlobalMouseUp);
    }, [handleGlobalMouseMove, handleGlobalMouseUp]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = rulerRef.current?.getBoundingClientRect();
        if (rect) setSpotX(e.clientX - rect.left);
    };

    const handleMouseLeave = () => {
        setSpotX(null);
    };

    const handleScroll = () => {
        if (rulerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = rulerRef.current;
            const maxScroll = scrollWidth - clientWidth;
            if (maxScroll > 0) {
                setRulerProgress(scrollLeft / maxScroll);
            }
        }
    };

    React.useEffect(() => {
        return () => {
            window.removeEventListener("mousemove", handleGlobalMouseMove);
            window.removeEventListener("mouseup", handleGlobalMouseUp);
        };
    }, [handleGlobalMouseMove, handleGlobalMouseUp]);

    return (
        <footer className="bg-black text-white flex flex-col mt-0 overflow-x-hidden relative z-[60]">
            {/* Ruler */}
            <div className="w-full relative h-[40px] bg-black border-t border-red-900/30">
                <div
                    ref={rulerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onScroll={handleScroll}
                    className="w-full h-full overflow-x-auto overflow-y-hidden flex items-end cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {/* CSS Ruler - guaranteed horizontal scroll width */}
                    <div className="flex items-end justify-between h-full w-[3500px] shrink-0 px-[25vw] pb-[2px]">
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
                        {leftLinks.map((link) => (
                            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1 text-white font-['Inter'] text-[10px] md:text-xl hover:text-red-500 transition-colors">
                                <span className="text-red-600">›</span> {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="self-stretch w-[3px]" style={{ background: "repeating-linear-gradient(to bottom, rgba(153,27,27,0.5) 0px, rgba(153,27,27,0.5) 4px, transparent 8px, transparent 18px)" }} />

                {/* Middle col */}
                <div className="flex flex-col items-center gap-2 md:gap-4 flex-[624] -mt-2 md:-mt-1">
                    <h3 className="font-sans text-base md:text-4xl font-bold text-red-600">Follow us</h3>
                    <div className="flex gap-2 md:gap-6">
                        {socialLinks.map(({ icon: Icon, href }) => (
                            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                                className="size-6 md:size-10 bg-white rounded flex items-center justify-center text-black text-3xs md:text-4xl hover:bg-red-600 hover:text-white transition-colors">
                                <Icon />
                            </a>
                        ))}
                    </div>
                    <div className="w-full h-[1px] bg-red-800/30" />
                    <h3 className="font-sans text-base md:text-4xl font-bold text-white">Contact Us</h3>
                    <a href="mailto:tedxiitpatna@gmail.com"
                        className="flex items-center gap-1 text-white font-['Instrument_Sans'] text-[10px] md:text-sm font-normal hover:text-red-500 transition-colors">
                        <Image src="/mail.svg" alt="mail" width={16} height={16} className="md:w-5 md:h-5" />
                        <span className="-ml-1 md:ml-0 md:text-xl">tedxiitpatna@gmail.com</span>
                    </a>
                </div>

                {/* Divider */}
                <div className="self-stretch w-[3px]" style={{ background: "repeating-linear-gradient(to bottom, rgba(153,27,27,0.5) 0px, rgba(153,27,27,0.5) 4px, transparent 8px, transparent 18px)" }} />

                {/* Right col */}
                <div className="flex flex-col gap-0 md:gap-1 flex-[700] md:flex-[572] items-start -mt-2 md:mt-0">
                    <h3 className="font-sans text-base md:text-4xl font-bold text-red-600 md:ml-24">Quick Links</h3>
                    {quickLinks.map((link) => (
                        <a key={link.label} href={link.href}
                            className="flex items-center gap-1 text-white font-['Ancizar_Serif'] text-[10px] md:text-2xl hover:text-red-500 transition-colors md:ml-24 mt-3 md:mt-2">
                            <span className="text-red-600">
                                <Image src="/compass.svg" alt="•" width={12} height={12} className="md:w-[14px] md:h-[14px]" />
                            </span> {link.label}
                        </a>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="flex justify-between px-4 md:px-16 py-3 md:py-4 border-t border-white/10 text-white">
                <p className="font-['Poppins'] text-[8px] md:text-sm font-medium">*This Independent TEDx Event Is Operated Under License From TED.</p>
                <p className="font-['Inter'] text-[8px] md:text-sm font-normal">© 2026 TEDxIITPatna. All rights reserved.</p>
            </div>
        </footer>
    );
}