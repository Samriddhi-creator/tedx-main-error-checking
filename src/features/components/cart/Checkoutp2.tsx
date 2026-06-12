"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import CartFooter from "./footet"; 
import bgImg from "./background.png"; 
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import CartNavbar from "./CartNavbar"; 

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function Checkoutp2() {
  const router = useRouter();
  const [locationType, setLocationType] = useState("in-campus");

  // In-Campus State Trackers
  const [sector, setSector] = useState("");
  const [room, setRoom] = useState("");

  // Out-of-Campus State Trackers
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Validation Error Flag Trackers
  const [errors, setErrors] = useState({
    sector: false,
    room: false,
    address: false,
    city: false,
    state: false,
    postalCode: false,
  });

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (locationType === "in-campus") {
      const sectorInvalid = !sector || sector === "";
      const roomEmpty = !room.trim();

      setErrors(prev => ({
        ...prev,
        sector: sectorInvalid,
        room: roomEmpty
      }));

      if (sectorInvalid || roomEmpty) return;

      // FIXED: Persist In-Campus tracking references down to localStorage
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
        address: addressEmpty,
        city: cityEmpty,
        state: stateEmpty,
        postalCode: postalEmpty
      }));

      if (addressEmpty || cityEmpty || stateEmpty || postalEmpty) return;

      // FIXED: Persist Out-of-Campus address matrix strings down to localStorage
      localStorage.setItem("location_type", "out-campus");
      localStorage.setItem("out_address", address);
      localStorage.setItem("out_city", city);
      localStorage.setItem("out_state", state);
      localStorage.setItem("out_postal", postalCode);
    }

    // All clear -> Forward to Manifest Review Step
    router.push("/checkoutp3");
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-red-600 flex flex-col justify-between">
      
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
   
      {/* 1. TOP NAVBAR */}
      <div className="w-full relative z-20">
        <CartNavbar />
      </div>

      {/* 2. MAIN INTERFACE BOX */}
      <main className="max-w-4xl w-full mx-auto border border-red-950/80  rounded-2xl overflow-hidden shadow-2xl shadow-red-950/10 relative z-10 mt-12 mb-0">
        
        {/* Title Block Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-black  border-red-950/50">
          <div>
            <p className={`${spaceGrotesk.className} text-[12px] uppercase text-white tracking-widest font-lighter`}>Checkout Protocol</p>
            <h2 className={`${spaceGrotesk.className} text-xl font-semibold scale-y-125 tracking-tighter text-white mt-0.5 uppercase`}>IDENTIFY EXPLORER</h2>
          </div>
        <Link href="/cart"> <button className={`${spaceGrotesk.className} text-xs text-white hover:text-red-500 flex items-center gap-1.5 uppercase tracking-wide group transition-colors`}>
            <span className="text-red-500 group-hover:scale-110 transition-transform">✕</span> Abort
          </button></Link> 
        </div>

        {/* Content Segment Wrapper */}
        <div className="flex flex-col md:flex-row min-h-[420px]">
          
          {/* LEFT SIDE: Progress Tracker */}
          <div className="w-full md:w-1/4 p-6 border-b bg-black md:border-b-0 md:border-r border-red-950/50 flex flex-col justify-between  relative">
            <div className="space-y-6 relative">
              <p className={`${spaceGrotesk.className} text-[10px] uppercase text-zinc-500 tracking-widest font-bold`}>Progress</p>
              
              <div className="flex items-center gap-3">
                <span className="text-red-600 text-[10px] font-bold">✓</span>
                <span className="text-xs text-zinc-500 font-normal tracking-wide">Coordinates</span>
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

            <button onClick={() => router.push("/checkoutp1")} className="mt-12 md:mt-0 w-24 py-1.5 bg-red-950/20 border border-red-600/70 text-[11px] font-bold text-white rounded uppercase tracking-wider hover:bg-red-600 transition-colors cursor-pointer">
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

              <div className="space-y-3 max-w-md">
                
                {/* Segmented Location Tabs */}
                <div className="inline-flex bg-[#303030] p-1 border border-zinc-800 rounded-lg mb-4">
                  <button 
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

                {/* IN CAMPUS VIEW */}
                {locationType === "in-campus" && (
                  <div className="space-y-6 ml-5">
                    
                    {/* Dropdown Menu Option */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <label className={`${spaceGrotesk.className} text-xs scale-y-125 text-white w-24 font-lighter tracking-wide`}>Hostel Sector :</label>
                        <select 
                          value={sector}
                          onChange={(e) => {
                            setSector(e.target.value);
                            if (e.target.value !== "") setErrors(p => ({ ...p, sector: false }));
                          }}
                          className={`${spaceGrotesk.className} bg-[#2a2a2a] border py-1.5 text-xs text-white focus:outline-none tracking-wide cursor-pointer w-44 font-normal rounded transition-colors ${
                            errors.sector ? "border-red-600" : "border-white"
                          }`}
                        >
                          <option value="">SECTOR</option>
                          <option value="CV Raman">CV Raman</option>
                          <option value="Aryabhatta">Aryabhatta</option>
                          <option value="Kalam">Kalam</option>
                          <option value="Asima">Asima</option>
                        </select>
                      </div>
                      {errors.sector && <p className="text-[10px] text-red-500 mt-1 sm:ml-25">Please designate an active hostel deployment sector block.</p>}
                    </div>

                    {/* Room Input element */}
                    <div>
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
                      {errors.room && <p className="text-[10px] text-red-500 mt-1 sm:ml-25">Specify room parameters to establish drop-point routing maps.</p>}
                    </div>

                  </div>
                )}

                {/* OUT OF CAMPUS VIEW */}
                {locationType === "out-campus" && (
                  <div className="space-y-6 ml-5">
                    
                    {/* Address Line */}
                    <div>
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
                      {errors.address && <p className="text-[10px] text-red-500 mt-1 sm:ml-46">Address route coordinates are required.</p>}
                    </div>

                    {/* City and State Grid Container */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* City Column */}
                      <div>
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
                        {errors.city && <p className="text-[10px] text-red-500 mt-1 ml-18">Specify City location.</p>}
                      </div>
                      
                      {/* State Column */}
                      <div>
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
                        {errors.state && <p className="text-[10px] text-red-500 mt-1 sm:ml-18">Specify State sector.</p>}
                      </div>
                    </div>

                    {/* Postal Code */}
                    <div>
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
                      {errors.postalCode && <p className="text-[10px] text-red-500 mt-1 sm:ml-46">Valid postal sequence routing key required.</p>}
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

      {/* 3. BOTTOM FOOTER */}
      <div className="w-full text-zinc-600 text-xs relative z-10">
        <CartFooter />
      </div>

    </div>
  );
}