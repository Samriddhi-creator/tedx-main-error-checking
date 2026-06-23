"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

import bgImg from "./background.png"; 
import { Bebas_Neue, Space_Grotesk } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

interface Checkoutp2Props {
  onNext: () => void;
  onBack: () => void;
  onStepChange?: (stepNumber: number) => void;
}

export default function Checkoutp2({ onNext, onBack, onStepChange }: Checkoutp2Props) {
  // PRE-FILL CONFIGURATION: Initializing states directly from localStorage values if available
  const [locationType, setLocationType] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("location_type") || "in-campus";
    }
    return "in-campus";
  });

  // In-Campus State Trackers
  const [sector, setSector] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("hostel_sector") || "";
    }
    return "";
  });
  
  const [room, setRoom] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("room_coordinate") || "";
    }
    return "";
  });
  
  // Custom Dropdown Open/Close UI State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Out-of-Campus State Trackers
  const [address, setAddress] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("out_address") || "";
    }
    return "";
  });
  
  const [city, setCity] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("out_city") || "";
    }
    return "";
  });
  
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("out_state") || "";
    }
    return "";
  });
  
  const [postalCode, setPostalCode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("out_postal") || "";
    }
    return "";
  });

  // Validation Error Flag Trackers
  const [errors, setErrors] = useState({
    sector: false,
    room: false,
    address: false,
    city: false,
    state: false,
    postalCode: false,
  });

  const SECTORS = ["CV Raman", "Aryabhatta", "Kalam", "Asima"];

  // Sync state cleanly if navigation steps trigger re-renders
  useEffect(() => {
    const savedType = localStorage.getItem("location_type");
    if (savedType) {
      setLocationType(savedType);
      if (savedType === "in-campus") {
        setSector(localStorage.getItem("hostel_sector") || "");
        setRoom(localStorage.getItem("room_coordinate") || "");
      } else {
        setAddress(localStorage.getItem("out_address") || "");
        setCity(localStorage.getItem("out_city") || "");
        setState(localStorage.getItem("out_state") || "");
        setPostalCode(localStorage.getItem("out_postal") || "");
      }
    }
  }, []);

  // Close custom dropdown when clicking anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (locationType === "in-campus") {
      const sectorInvalid = !sector || sector === "";
      const roomEmpty = !room.trim();

      setErrors(prev => ({
        ...prev,
        sector: sectorInvalid,
        room: roomEmpty,
        address: false,
        city: false,
        state: false,
        postalCode: false
      }));

      if (sectorInvalid || roomEmpty) return;

      localStorage.setItem("location_type", "in-campus");
      localStorage.setItem("hostel_sector", sector);
      localStorage.setItem("room_coordinate", room);

    } else {
      const addressEmpty = !address.trim();
      const cityEmpty = !city.trim();
      const stateEmpty = !state.trim();
      const postalEmpty = !postalCode.trim();

      setErrors(prev => ({
        ...prev,
        sector: false,
        room: false,
        address: addressEmpty,
        city: cityEmpty,
        state: stateEmpty,
        postalCode: postalEmpty
      }));

      if (addressEmpty || cityEmpty || stateEmpty || postalEmpty) return;

      localStorage.setItem("location_type", "out-campus");
      localStorage.setItem("out_address", address);
      localStorage.setItem("out_city", city);
      localStorage.setItem("out_state", state);
      localStorage.setItem("out_postal", postalCode);
    }

    onNext();
  };

  return (
    <div className="min-h-full h-full bg-black text-white relative overflow-x-hidden selection:bg-red-600 flex flex-col justify-between">
      
      {/* BACKGROUND GRAPHIC */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-75"
        style={{
          backgroundImage: `url(${bgImg.src})`,
          backgroundPosition: 'center top',
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
         }}
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />
   
      {/* MAIN INTERFACE BOX */}
      <main className="max-w-4xl w-full mx-auto border border-red-950/80 rounded-2xl overflow-hidden shadow-2xl shadow-red-950/10 relative z-10 mt-12 mb-20">
        
        {/* Title Block Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-black border-red-950/50">
          <div>
            <p className={`${spaceGrotesk.className} text-[12px] uppercase text-white tracking-widest font-lighter`}>Checkout Protocol</p>
            <h2 className={`${spaceGrotesk.className} text-xl font-semibold scale-y-125 tracking-tighter text-white mt-0.5 uppercase`}>IDENTIFY EXPLORER</h2>
          </div>
          <Link href="/cart"> 
            <button className={`${spaceGrotesk.className} text-xs text-white hover:text-red-500 flex items-center gap-1.5 uppercase tracking-wide group transition-colors`}>
              <span className="text-red-500 group-hover:scale-110 transition-transform">✕</span> Abort
            </button>
          </Link> 
        </div>

        {/* Content Segment Wrapper */}
        <div className="flex flex-col md:flex-row min-h-[460px]">
          
          {/* LEFT SIDE: Progress Tracker */}
          <div className="w-full md:w-1/4 p-6 border-b bg-black md:border-b-0 md:border-r border-red-950/50 flex flex-col justify-between relative">
            <div className="space-y-6 relative">
              <p className={`${spaceGrotesk.className} text-[10px] uppercase text-zinc-500 tracking-widest font-bold`}>Progress</p>
              
              <div 
                className="flex items-center gap-3 cursor-pointer" 
                onClick={() => onStepChange && onStepChange(1)}
              >
                <span className="text-red-600 text-[10px] font-bold">✓</span>
                <span className="text-xs text-zinc-500 font-normal tracking-wide hover:text-zinc-300 transition-colors">Coordinates</span>
              </div>
              
              <div className="flex items-center gap-3 pl-0.5">
                <div className="w-2.5 h-2.5 bg-red-600 transform rotate-45 shadow-md shadow-red-500/50"></div>
                <span className="text-xs font-semibold text-white tracking-wide">Route</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-[18px] h-[18px] rounded-full border border-zinc-700 bg-zinc-950 flex items-center justify-center text-[9px] text-zinc-400">3</div>
                <span className="text-xs text-zinc-500 tracking-wide">Manifest</span>
              </div>
            </div>

            <button 
              onClick={onBack} 
              className="mt-12 md:mt-0 w-24 py-1.5 bg-red-950/20 border border-red-600/70 text-[11px] font-bold text-white rounded uppercase tracking-wider hover:bg-red-600 transition-colors cursor-pointer"
            >
              ← BACK
            </button>
          </div>

          {/* RIGHT SIDE: Route Allocation Input Panel */}
          <div className="w-full md:w-3/4 p-6 md:p-10 bg-black/50 flex flex-col justify-between">
            <div>
              <h3 className={`${bebasNeue.className} text-[30px] font-black uppercase tracking-normal scale-y-[1.10] text-white leading-none`}>
                Collection Route
              </h3>
              <p className={`${spaceGrotesk.className} text-[15px] font-medium text-white/90 mt-2 mb-4 tracking-[0.02em]`}>
                Designate the drop point for your artifacts and passes
              </p>

              {/* Location Selector Tabs */}
              <div className="inline-flex bg-[#303030] p-1 border border-zinc-800 rounded-lg mb-6">
                <button 
                  type="button"
                  onClick={() => setLocationType("in-campus")}
                  className={`${spaceGrotesk.className} px-4 py-1.5 text-xs font-lighter tracking-wide transition-all rounded-md ${
                    locationType === "in-campus" 
                      ? "bg-black border border-zinc-700 text-white shadow-md" 
                      : "text-white hover:text-red-500"
                  }`}
                >
                  In Campus
                </button>
                <button 
                  type="button"
                  onClick={() => setLocationType("out-campus")}
                  className={`${spaceGrotesk.className} px-4 py-1.5 text-xs font-lighter tracking-wide transition-all rounded-md ${
                    locationType === "out-campus" 
                      ? "bg-black border border-zinc-700 text-white shadow-md" 
                      : "text-white hover:text-red-500"
                  }`}
                >
                  Out of Campus
                </button>
              </div>

              {/* Height-stable container */}
              <div className="max-w-md min-h-[290px]">
                
                {/* IN CAMPUS VIEW */}
                {locationType === "in-campus" && (
                  <div className="space-y-8 ml-5">
                    
                    {/* CUSTOM DROPDOWN SELECT ROUTINE */}
                    <div className="relative" ref={dropdownRef}>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <label className={`${spaceGrotesk.className} text-xs scale-y-125 text-white w-24 font-lighter tracking-wide`}>
                          Hostel Sector :
                        </label>
                        
                        {/* Selector Trigger Button */}
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`${spaceGrotesk.className} bg-[#2a2a2a] border px-3 py-1.5 text-xs text-white text-left tracking-wide cursor-pointer w-44 font-normal rounded flex items-center justify-between transition-colors ${
                            errors.sector ? "border-red-600 focus:border-red-600" : "border-white"
                          }`}
                        >
                          <span className={sector ? "text-white" : "text-zinc-400"}>
                            {sector || "SECTOR"}
                          </span>
                          <span className={`text-[9px] text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}>
                            ▼
                          </span>
                        </button>
                      </div>

                      {/* Floating Dropdown Options Panel */}
                      {isDropdownOpen && (
                        <div className="absolute left-25 top-full mt-1 w-44 bg-[#1a1a1a] border border-zinc-800 rounded shadow-2xl z-50 overflow-hidden">
                          {SECTORS.map((sec) => (
                            <button
                              key={sec}
                              type="button"
                              onClick={() => {
                                setSector(sec);
                                setErrors(p => ({ ...p, sector: false }));
                                setIsDropdownOpen(false);
                              }}
                              className={`${spaceGrotesk.className} w-full text-left px-3 py-2 text-xs text-zinc-300 hover:bg-red-600 hover:text-white transition-colors uppercase tracking-wider`}
                            >
                              {sec}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Dropdown Error Warning */}
                      {errors.sector && (
                        <p className="text-[10px] text-red-500 mt-1 sm:ml-25 absolute left-0 top-full">
                          Please designate an active hostel deployment sector block.
                        </p>
                      )}
                    </div>

                    {/* Room Input component */}
                    <div className="relative pt-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className={`${spaceGrotesk.className} text-xs text-white w-34 scale-y-125 font-lighter tracking-wide`}>Room / Coordinate :</label>
                        <input 
                          type="text" 
                          value={room}
                          onChange={(e) => {
                            setRoom(e.target.value);
                            if (e.target.value.trim()) setErrors(p => ({ ...p, room: false }));
                          }}
                          placeholder="e.g. A-101" 
                          className={`flex-1 bg-transparent border-b outline-none text-sm pb-1 text-white placeholder:text-zinc-700 transition-colors ${
                            errors.room ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                          }`}
                        />
                      </div>
                      {errors.room && <p className="text-[10px] text-red-500 mt-1 sm:ml-36 absolute left-0 top-full">Specify room parameters to establish drop-point routing maps.</p>}
                    </div>
                  </div>
                )}

                {/* OUT OF CAMPUS VIEW */}
                {locationType === "out-campus" && (
                  <div className="space-y-8 ml-5">
                    <div className="relative">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className="text-xs text-zinc-400 w-44 font-normal tracking-wide">Address Line :</label>
                        <input 
                          type="text" 
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                            if (e.target.value.trim()) setErrors(p => ({ ...p, address: false }));
                          }}
                          placeholder="Street Address" 
                          className={`flex-1 bg-transparent border-b outline-none text-sm pb-1 text-white placeholder:text-zinc-700 transition-colors ${
                            errors.address ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                          }`}
                        />
                      </div>
                      {errors.address && <p className="text-[10px] text-red-500 mt-1 sm:ml-46 absolute left-0 top-full">Address route coordinates are required.</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                      <div className="relative">
                        <div className="flex flex-row items-center gap-2">
                          <label className="text-xs text-zinc-400 w-16 font-normal tracking-wide">City :</label>
                          <input 
                            type="text" 
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                              if (e.target.value.trim()) setErrors(p => ({ ...p, city: false }));
                            }}
                            className={`flex-1 bg-transparent border-b outline-none text-sm pb-1 text-white transition-colors ${
                              errors.city ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                            }`}
                          />
                        </div>
                        {errors.city && <p className="text-[10px] text-red-500 mt-1 ml-18 absolute left-0 top-full">Specify City location.</p>}
                      </div>
                      
                      <div className="relative">
                        <div className="flex flex-row items-center gap-2">
                          <label className="text-xs text-zinc-400 w-16 font-normal tracking-wide sm:pl-2">State :</label>
                          <input 
                            type="text" 
                            value={state}
                            onChange={(e) => {
                              setState(e.target.value);
                              if (e.target.value.trim()) setErrors(p => ({ ...p, state: false }));
                            }}
                            className={`flex-1 bg-transparent border-b outline-none text-sm pb-1 text-white transition-colors ${
                              errors.state ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                            }`}
                          />
                        </div>
                        {errors.state && <p className="text-[10px] text-red-500 mt-1 sm:ml-18 absolute left-0 top-full">Specify State sector.</p>}
                      </div>
                    </div>

                    <div className="relative pt-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className="text-xs text-zinc-400 w-44 font-normal tracking-wide">Postal Code :</label>
                        <input 
                          type="text" 
                          value={postalCode}
                          onChange={(e) => {
                            setPostalCode(e.target.value);
                            if (e.target.value.trim()) setErrors(p => ({ ...p, postalCode: false }));
                          }}
                          className={`w-40 bg-transparent border-b outline-none text-sm pb-1 text-white transition-colors ${
                            errors.postalCode ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                          }`}
                        />
                      </div>
                      {errors.postalCode && <p className="text-[10px] text-red-500 mt-1 sm:ml-46 absolute left-0 top-full">Valid postal sequence routing key required.</p>}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Form Finish Control Sequence */}
            <div className="flex justify-end mt-12">
              <button 
                onClick={handleContinue}
                className="bg-red-600 border border-red-600 px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded hover:bg-transparent transition duration-200 text-white cursor-pointer"
              >
                CONTINUE →
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}