"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaXTwitter, FaHouse } from "react-icons/fa6";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Pre-events", href: "/funfair" },
    { label: "Past Editions", href: "/past-editions" },
    { label: "Sponsors", href: "/sponsors" },
    { label: "About Us", href: "/about" },
    { label: "Speakers", href: "/speakers" },
];

const socialLinks = [
    { icon: FaInstagram, href: "https://www.instagram.com/tedxiitpatna" },
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/tedxiitpatna" },
    { icon: FaFacebookF, href: "https://www.facebook.com/tedxiitpatna" },
    { icon: FaXTwitter, href: "https://twitter.com/tedxiitpatna" },
];

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    //const setActiveSection = useSectionStore((state) => state.setActiveSection);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Auto-close sidebar on page change / history navigation (e.g. back/forward arrow clicks)
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <>
            <header className={`sticky top-0 z-[110] w-full h-[40px] md:h-[64px] flex items-center justify-between pr-4 md:pr-8 overflow-hidden transition-all duration-500 ${open ? "bg-transparent" : scrolled ? "bg-black/40 backdrop-blur-md" : "bg-black"}`}>
                <div className="flex items-center justify-center h-full" style={{ width: "clamp(180px, 20vw, 384px)", minWidth: "180px" }}>
                    <a href="/" className="flex items-center md:justify-center ml-6 w-full h-full">
                        <Image src="/logo.svg" alt="TEDxIITPatna" width={527} height={108} className="w-[56%] h-auto" />
                    </a>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <a href="/cart" className="h-[26px] md:h-[45px] px-3 md:px-6 rounded-full border-[2px] md:border-[2px] border-red-700 text-white font-['Inter'] text-xs md:text-xl font-semibold hover:bg-red-700/20 transition-colors flex items-center">
                        Buy Now
                    </a>

                    <button
                        onClick={() => setOpen(!open)}
                        className="size-[24px] md:size-[45px] bg-gradient-to-b from-red-600 to-red-900 rounded-full flex flex-col items-center justify-center gap-[3px] md:gap-[4px] hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-red-600/30 z-[120] cursor-pointer">
                        <span className={`w-[10px] md:w-4 h-[2px] bg-white rounded-full transition-all duration-300 ${open ? "translate-y-[5px] md:translate-y-[6px] rotate-45" : ""}`} />
                        <span className={`w-[10px] md:w-4 h-[2px] bg-white rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                        <span className={`w-[10px] md:w-4 h-[2px] bg-white rounded-full transition-all duration-300 ${open ? "-translate-y-[5px] md:-translate-y-[6px] -rotate-45" : ""}`} />
                    </button>
                </div>
            </header>

            <div
                className={`fixed inset-0 w-screen h-screen bg-black/95 backdrop-blur-md z-[100] flex px-6 md:px-16 py-8 md:py-12 transition-all duration-500 ease-in-out ${open ? "opacity-100 translate-x-0 pointer-events-auto visible" : "opacity-0 translate-x-full pointer-events-none invisible"}`}
                onClick={() => setOpen(false)}
            >
                <div
                    className={`hidden md:flex flex-col justify-end gap-4 w-1/2 transition-all duration-700 ease-out transform ${open ? "translate-x-0 opacity-100 delay-150" : "-translate-x-8 opacity-0"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image src="/logo.svg" alt="TEDxIITPatna" width={200} height={45} />
                    <div className="mt-8">
                        <p className="text-red-500 font-['Inter'] text-xl font-bold mb-1">Contact Us</p>
                        <a href="mailto:tedxiitpatna@gmail.com" className="flex items-center gap-2 text-white font-['Inter'] text-sm hover:text-red-500 transition-colors">
                            ✉ tedxiitpatna@gmail.com
                        </a>
                    </div>
                    <div>
                        <p className="text-red-500 font-['Inter'] text-xl font-bold mb-2">Follow us</p>
                        <div className="flex gap-4">
                            {socialLinks.map(({ icon: Icon, href }) => (
                                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-red-500 transition-colors">
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-start md:justify-center gap-0 w-full md:w-1/2 pt-12 md:pt-0" onClick={(e) => e.stopPropagation()}>
                    {navLinks.map(({ label, href }, index) => (
                        <a key={label} href={href}
                            onMouseEnter={() => setHovered(label)}
                            onMouseLeave={() => setHovered(null)}
                            style={{ transitionDelay: open ? `${index * 50}ms` : "0ms" }}
                            className={`text-5xl font-normal font-['Bebas_Neue'] py-2 md:py-3 border-b border-white/20 transition-all duration-500 block transform
                                ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
                                ${hovered === label ? "bg-gradient-to-b from-red-700 from-35% via-white via-50% to-red-400 to-65% bg-clip-text text-transparent translate-x-4" : hovered ? "text-white/40" : "text-white"}`}>
                            {label}
                        </a>
                    ))}
                </div>

                <div
                    className={`md:hidden absolute bottom-8 left-6 flex flex-col gap-3 transition-all duration-700 ease-out transform ${open ? "translate-y-0 opacity-100 delay-300" : "translate-y-4 opacity-0"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <p className="text-red-500 font-['Inter'] text-sm font-bold">Follow us</p>
                    <div className="flex gap-4">
                        {socialLinks.map(({ icon: Icon, href }) => (
                            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-white text-xl hover:text-red-500 transition-colors">
                                <Icon />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}