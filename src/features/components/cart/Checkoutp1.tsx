"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import CartFooter from "./footet"; 
import bgImg from "./background.png"; 
import CartNavbar from "./CartNavbar"; 
import { Bebas_Neue, Space_Grotesk, Ancizar_Serif } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const ancizarSerif = Ancizar_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  fallback: ["times new roman", "times", "serif"],
  adjustFontFallback: false
});

export default function Checkoutp1() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    phoneInvalid: false,
  });

  const handleTransmission = () => {
    localStorage.clear();
    router.push("/cart");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); 
    if (value.length <= 10) {
      setPhone(value);
      setErrors(prev => ({
        ...prev, 
        phone: value.trim() === "", 
        phoneInvalid: value.length > 0 && value.length < 10
      }));
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nameEmpty = !name.trim();
    const emailEmpty = !email.trim();
    const phoneEmpty = !phone.trim();
    const phoneLengthInvalid = !phoneEmpty && phone.length !== 10;

    setErrors({
      name: nameEmpty,
      email: emailEmpty,
      phone: phoneEmpty,
      phoneInvalid: phoneLengthInvalid,
    });

    if (nameEmpty || emailEmpty || phoneEmpty || phoneLengthInvalid) {
      return;
    }

    localStorage.setItem("explorer_name", name);
    localStorage.setItem("explorer_email", email);
    localStorage.setItem("explorer_phone", phone);

    router.push("/checkoutp2");
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-red-600 flex flex-col justify-between">
      
      {/* BULLETPROOF CHROME AUTOFILL OVERRIDE 
        This injects the raw CSS rule to force a black background and white text when autofilled 
      */}
      <style dangerouslySetInnerHTML={{__html: `
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-text-fill-color: #ffffff !important;
          -webkit-box-shadow: 0 0 0px 1000px #000000 inset !important;
          box-shadow: 0 0 0px 1000px #000000 inset !important;
          transition: background-color 5000s ease-in-out 0s !important;
        }
      `}} />

      <img
        src={`${bgImg.src}`}
        alt="Cart background"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-75"
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />
      
      <div className="w-full relative z-20">
        <CartNavbar/>
      </div>

      <main className="max-w-4xl w-full mx-auto border border-red-950/80 rounded-2xl overflow-hidden shadow-2xl shadow-red-950/10 relative z-10 mt-12 mb-20">
        
        <div className="flex justify-between items-center px-6 py-4 bg-black border-b border-red-950/50">
          <div>
            <p className={`${bebasNeue.className} text-xs uppercase text-white tracking-widest font-normal`}>Checkout Protocol</p>
            <h2 className={`text-xl font-semibold scale-y-125 ${spaceGrotesk.className} tracking-tighter text-white mt-0.5 uppercase`}>IDENTIFY EXPLORER</h2>
          </div>
        <Link href="/cart"> <button className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 uppercase tracking-wide group transition-colors">
            <span className="text-red-600 font-bold group-hover:scale-110 transition-transform">✕</span> Abort
          </button></Link> 
        </div>

        <div className="flex flex-col md:flex-row min-h-[420px]">
          
          <div className="w-full md:w-1/4 p-6 border-b md:border-b-0 md:border-r border-red-950/50 flex flex-col justify-between bg-[#1D1D1D] relative">
            <div className="space-y-6 relative">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Progress</p>
              <div className="flex items-center gap-3 pl-0.5">
                <div className="w-2.5 h-2.5 bg-red-600 transform rotate-45 shadow-md shadow-red-500/50"></div>
                <span className="text-xs font-semibold text-white tracking-wide">Coordinates</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[18px] h-[18px] rounded-full border border-zinc-700 bg-zinc-950 flex items-center justify-center text-[9px] text-zinc-400">2</div>
                <span className="text-xs text-zinc-500 tracking-wide">Route</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[18px] h-[18px] rounded-full border border-zinc-700 bg-zinc-950 flex items-center justify-center text-[9px] text-zinc-400">3</div>
                <span className="text-xs text-zinc-500 tracking-wide">Manifest</span>
              </div>
            </div>
            <button onClick={handleTransmission} className="mt-12 md:mt-0 w-20 py-1.5 bg-red-950/20 border border-red-600/70 text-[11px] font-normal scale-y-110 text-white rounded uppercase tracking-wider hover:bg-red-600 transition-colors">
              ← BACK
            </button>
          </div>

          <div className="w-full md:w-3/4 p-6 md:p-10 bg-black/50 flex flex-col justify-between">
            <div>
              <h3 className={`text-[30px] ${spaceGrotesk.className} font-normal uppercase tracking-tighter text-white`}>Transmission Details</h3>
              <p className={`text-[17px] ${spaceGrotesk.className} text-white font-normal mb-10 tracking-wide`}>Please identify yourself for the expedition log</p>

              <div className="space-y-8 max-w-md">
                
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className={`${spaceGrotesk.className} text-sm text-white w-44 font-light tracking-wide`}>Explorer Designation :</label>
                    <input 
                      type="text" 
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if(e.target.value.trim()) setErrors(prev => ({...prev, name: false}));
                      }}
                      placeholder="Full name" 
                      className={`flex-1 bg-transparent border-b outline-none text-sm pb-1 text-white placeholder:text-zinc-600 ${
                        errors.name ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-red-500 sm:ml-46 mt-1">This destination identification coordinate field cannot be blank.</p>}
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className={`${spaceGrotesk.className} text-sm text-white w-44 font-light tracking-wide`}>✉️ Comm Link :</label>
                    <input 
                      type="email" 
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if(e.target.value.trim()) setErrors(prev => ({...prev, email: false}));
                      }}
                      placeholder="Email Address" 
                      className={`flex-1 bg-transparent border-b outline-none text-sm pb-1 text-white placeholder:text-zinc-600 ${
                        errors.email ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-red-500 sm:ml-46 mt-1">A valid core comm directory link route is required.</p>}
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
  <label className={`${spaceGrotesk.className} text-sm text-white w-44 font-light tracking-wide`}>📞 Priority Frequency :</label>
  <input 
    type="tel" 
    name="phone"
    autoComplete="off" /* Prevents browser autofill panel from forcing the white overlay style here */
    value={phone}
    onChange={handlePhoneChange}
    placeholder="Phone Number" 
    className={`flex-1 bg-transparent border-b outline-none text-sm pb-1 text-white placeholder:text-zinc-600 transition-colors ${
      errors.phone || errors.phoneInvalid ? "border-red-600 focus:border-red-600" : "border-zinc-800 focus:border-red-600"
    }`}
    style={{
      backgroundColor: 'transparent',
      WebkitBackgroundClip: 'text', /* Prevents internal Webkit backgrounds from rendering */
    }}
  />
</div>
                  {errors.phone && <p className="text-[10px] text-red-500 sm:ml-46 mt-1">Secure log transmissions require a priority frequency link line.</p>}
                  {errors.phoneInvalid && <p className="text-[10px] text-red-500 sm:ml-46 mt-1">Priority frequency configuration protocol requires exactly 10 digits.</p>}
                </div>

              </div>
            </div>

            <div className="flex justify-end mt-12">
              <button 
                onClick={handleContinue}
                className="bg-red-600 border border-red-600 px-5 py-2 text-[11px] font-black uppercase tracking-widest rounded hover:bg-transparent transition duration-200 text-white cursor-pointer"
              >
                CONTINUE →
              </button>
            </div>

          </div>
        </div>
      </main>

      <div className="w-full text-zinc-600 text-xs relative z-10">
        <CartFooter />
      </div>

    </div>
  );
}