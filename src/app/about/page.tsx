"use client"
import Image from "next/image";
import { team } from "@/data/teamData"
import OrgCard from "@/src/components/about/OrgCard";
import AboutTed from "@/src/components/about/AboutTed";
import { motion } from "framer-motion";
export default function About() {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-8 sm:gap-10"
        >
        <div className="flex flex-row items-center justify-center">
            <span className="text-[#F3E9DC] font-bebas text-[30px] sm:text-[60px] md:text-[70px] lg:text-[90px] font-normal not-italic ">
            ABOUT&nbsp;&nbsp;
            <span className="text-[#EB0028] font-cormorant text-[30px] sm:text-[60px] md:text-[70px] lg:text-[90px] font-bold">
            TEDxIITPatna
            </span>
            </span>
        </div>
        <div className="mx-auto">
            <p className="text-[10px] sm:text-[18px] md:text-[22px] lg:text-[28px] font-space font-light tracking-[0.01em] text-center text-white">
            Since 2016, TEDxIIT Patna has served as a crucible for ideas, dialogue, and imagination-bridging disciplines and perspectives to spark conversations that endure. With a consistent footfall of 1500+ attendees across past editions, it has become a space where curiosity meets clarity, and complexity gives way to connection. Through changing times and shifting landscapes, the platform has remained committed to elevating diverse voices and celebrating the nuance in thought. It stands not just as an event, but as an evolving archive of insight-where fleeting moments of expression form lasting interludes in the broader narrative of innovation and understanding.
            </p>
        </div>
        <div className="flex justify-center">
            <h2 className="text-[50px] sm:text-[120px] md:text-[140px] lg:text-[200px] xl:text-[250px] font-bebas font-normal tracking-normal text-center text-[#F3E9DC]">
            MEET OUR{" "}
            <span className="text-[#EB0028]">
                TEAM
            </span>
            </h2>
        </div>
        <div className="flex flex-row justify-evenly sm:px-4">
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}>
                <div className="relative overflow-hidden border-[2px] sm:border-[2.5px] border-[#EB0028] h-[120px] sm:h-[250px] md:h-[320px] lg:h-[460px] xl:h-[500px] aspect-square rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:shadow-lg shadow-red-600">
                    <Image src="/bg2.png" alt="background" fill className="object-cover opacity-60"/>

                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center h-[75%] w-full">
                        <div className="relative w-full h-full">
                        <Image 
                            src="/pic.png" 
                            alt="" 
                            fill 
                            sizes="100vw" 
                            className="object-contain object-bottom" 
                            priority
                        />
                        </div>
                    </div>

                    <div className="absolute bottom-0.5 left-3 z-30 flex flex-col select-none pointer-events-none">
                        <span className="text-white font-space text-[15px] sm:text-[20px] md:text-[25px] lg:text-[30px] font-light tracking-wide mb-1">
                        Organizer
                        </span>

                        <h2 className="text-white font-bebas text-[18px] sm:text-[40px] md:text-[50px] lg:text-[70px] font-white tracking-wider uppercase leading-none drop-shadow-lg">
                        Kavya Mahajan
                        </h2>
                    </div>
                </div>
            </motion.div>


            <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}>
                    <div className="relative overflow-hidden border-[2px] sm:border-[2.5px] border-[#EB0028] h-[120px] sm:h-[250px] md:h-[320px] lg:h-[460px] xl:h-[500px] aspect-square rounded-2xl hover:scale-[1.02] transition-all duration-300 hover:shadow-lg shadow-red-600">
                    <Image src="/bg2.png" alt="background" fill className="object-cover opacity-60"/>

                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center h-[75%] w-full">
                        <div className="relative w-full h-full">
                        <Image 
                            src="/pic.png" 
                            alt="" 
                            fill 
                            sizes="100vw" 
                            className="object-contain object-bottom" 
                            priority
                        />
                        </div>
                    </div>

                    <div className="absolute bottom-0.5 left-3 z-30 flex flex-col select-none pointer-events-none">
                        <span className="text-white font-space text-[15px] sm:text-[20px] md:text-[25px] lg:text-[30px] font-light tracking-wide mb-1">
                        Organizer
                        </span>

                        <h2 className="text-white font-bebas text-[18px] sm:text-[40px] md:text-[50px] lg:text-[70px] font-white tracking-wider uppercase leading-none drop-shadow-lg">
                        Ashmit Malik
                        </h2>
                    </div>
                </div>
            </motion.div>
        </div>
        <div className="text-[#F3E9DC] -mb-12 sm:-mb-20 text-[40px] sm:text-[90px] md:text-[100px] lg:text-[120px] font-normal text-center font-bebas">
            CORE TEAM
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 lg:gap-5">
            {
                team.map((sec)=>(
                    <div key={sec.id} className="gap-8 sm:gap-10 md:gap-12 lg:gap-15">
                        <div className="flex flex-col items-center text-center my-8 sm:my-10 md:my-12 lg:my-15">
                            <h2 className="text-white text-[20px] sm:text-[20px] md:text-[30px] lg:text-[40px] font-inter font-semibold tracking-[0.02em] items-center flex flex-col w-fit gap-3">
                                {sec.title}
                                <hr className="rounded-full border-[#AA0000] border-t-[6px] sm:border-t-[8px] w-[95%]"/>
                            </h2>
                        </div>
                        <div className="w-full justify-start overflow-x-auto snap-x mandatory scroll-smooth flex flex-row gap-6 sm:gap-12 md:gap-15 lg:gap-20 py-2 sm:py-4 mb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <div className="ml-auto" />
                            {sec.members.map((member) => (
                                <div key={member.id} className="snap-aria flex-shrink-0">
                                    <OrgCard 
                                        name={member.name}
                                        img={member.img}
                                    />
                                </div>
                            ))}
                            <div className="mr-auto" />
                        </div>
                        <hr className="w-full border-t-[2px] border-solid mt-2 [border-image-slice:1] [border-image-source:linear-gradient(90deg,rgba(248,248,248,0.1)_0%,#F8F8F8_50%,rgba(248,248,248,0.1)_100%)]" />
                    </div>
                ))
            }
        </div>
        <div className="mt-6">
            <p className="text-white font-space text-[12px] sm:text-[18px] md:text-[22px] lg:text-[28px] font-normal tracking-normal text-center flex items-center justify-center">
                We are grateful to have the support of many dedicated volunteers who brought the TEDxIITPatna experience to life. Your energy and commitment made it all possible!
            </p>
        </div>
        <AboutTed/>
    </motion.div>
  );
}