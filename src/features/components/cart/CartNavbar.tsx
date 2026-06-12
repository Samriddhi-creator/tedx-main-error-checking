"use client";
import React from "react";
import { Button } from "../../../components/ui/Button";
import bgImg from "./background.png"; 

export default function CartNavbar(){
    return (
      <div className="relative w-full z-20 px-4 sm:px-8 py-4 overflow-hidden">
        
       
         <img
        src={`${bgImg.src}`}
        alt="Cart background"
        className="absolute inset-0 w-full h-full object-cover  z-10"
      />
        
        <div className="absolute inset-0 bg-black/80 -z-10" />

        <div className="flex flex-row justify-between items-center relative z-10">
          
          
          <div className="flex flex-col">
              <span className="text-[35px] text-gray-300 leading-none">
                <span className="text-red-600 text-[35px] font-extrabold">
                  TED<span className="relative bottom-2 text-[35px] font-extrabold  lowercase">x</span>
                </span>
                IIT Patna
              </span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1">
                <span className="text-red-600 font-bold text-[10px]">x</span> = independently organized TED event
              </span>
          </div>

  
          <div className="flex flex-row items-center gap-6">
            <a href="https://tedxiitpatna.iitp.ac.in/buyMerchTickets"><button className="bg-transparent scale-y-125  text-white border-2 border-red-600 rounded-full h-10 px-3.5 text-[13px] font-bold tracking-widest hover:bg-white hover:text-black transition-all duration-200 uppercase">
              Buy Now
            </button></a>
           
  
            <button className="w-10 h-10 rounded-full flex flex-col justify-center items-center gap-1 transition-all duration-200 hover:scale-105 bg-gradient-to-br from-[#EB0028] to-[#850017] shadow-lg shadow-red-950/30">
              <div className="bg-white h-0.5 w-4 rounded-full"></div>
              <div className="bg-white h-0.5 w-4 rounded-full"></div>
              <div className="bg-white h-0.5 w-4 rounded-full"></div>
            </button>
          </div>

        </div>
      </div>
    );
}