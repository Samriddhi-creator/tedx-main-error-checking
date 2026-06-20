"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ArrowRight, Compass } from "lucide-react";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import { useRouter } from "next/navigation"; 

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function CartMain() {
    const router = useRouter();
  const [items, setItems] = useState([
    {
      id: 1,
      name: "TEDx IIT Patna Pass",
      description: "GENERAL ACCESS",
      price: 20, 
      quantity: 0,
      size: null, 
    },
    {
      id: 2,
      name: "TEDx Hoodie",
      description: "EXPLORER BLACK",
      size: "L",
      price: 10, 
      quantity: 0,
    },
    {
      id: 3,
      name: "TEDx T-Shirt",
      description: "DRAGON WARRIOR",
      size: "M",
      price: 10, 
      quantity: 0,
    },
  ]);

  const incrementQuantity = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 0 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: 0 } : item
      )
    );
  };

  const updateItemSize = (id: number, selectedSize: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, size: selectedSize } : item
      )
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  const convenienceFee = subtotal > 0 ? 2.50 : 0.00;
  const tax = subtotal > 0 ? 2.50 : 0.00;
  const grandTotal = subtotal + convenienceFee + tax;

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  return (
    
    <div className="w-full mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
      

      
      {/* LEFT COLUMN */}
      <div className="md:col-span-2 flex flex-col">
        <header className="mb-8 flex flex-col gap-0">
          <h1 className={`${bebasNeue.className} text-[70px] tracking-wide uppercase text-white leading-none`}>
            Your Expedition Kit
          </h1>
          <p className={`${spaceGrotesk.className} text-xl text-zinc-400 tracking-wider leading-tight mt-2`}>
            Items collected for your journey
          </p>
        </header>

        <div className="flex flex-row items-center gap-4 w-full mb-6">
          <h2 className={`${bebasNeue.className} text-2xl tracking-widest text-red-600 uppercase whitespace-nowrap`}>
            Items in your kit
          </h2>
          <hr className="flex-grow border-t-[1.5px] border-red-600/80 opacity-90" />
        </div>

        {/* Dynamic Cart Items List */}
        <div className="flex flex-col gap-4 mb-8">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-row items-center justify-between bg-[#181818] border border-zinc-800/50 rounded-xl p-4 backdrop-blur-sm transition-all duration-200 hover:scale-[1.01] hover:border-zinc-700/80 hover:bg-zinc-900/60"
            >
              <div className="flex flex-row items-center gap-5">
                <div className={`${bebasNeue.className} w-28 h-20 bg-zinc-900/50 border border-white rounded-lg flex items-center justify-center text-[20px] text-zinc-400 font-bold uppercase tracking-wider`}>
                  Image
                </div>
                
                <div className="flex flex-col">
                  <h3 className={`${spaceGrotesk.className} ml-5 text-[20px] font-semibold tracking-wide`}>
                    {item.name}
                  </h3>
                  <p className={`${bebasNeue.className} ml-5 text-sm text-zinc-400 tracking-wide mt-0.5`}>
                    {item.description}
                  </p>
                  
                  {item.size !== null && (
                    <div className="text-[11px] ml-5 text-zinc-400 mt-2 flex items-center gap-2 font-medium">
                      <span>SIZE:</span>
                      <select 
                        value={item.size}
                        onChange={(e) => updateItemSize(item.id, e.target.value)}
                        className={`${bebasNeue.className} bg-zinc-950/80 border border-zinc-700 text-white rounded px-2 py-0.5 text-[12px] font-bold tracking-wider outline-none focus:border-red-600 cursor-pointer transition-colors`}
                      >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls & Price Allocation Columns */}
              <div className="flex flex-row items-center gap-8">
                <div className="flex flex-col items-center gap-0.5">
                  <span className={`${spaceGrotesk.className} text-[13px] text-white font-lighter tracking-wide`}>Quantity</span>
                  <div className="flex items-center border border-white rounded bg-zinc-950/40 text-[11px] font-mono px-1">
                    
                  <button onClick={() => decrementQuantity(item.id)} className="p-1 text-white hover:text-white cursor-pointer"><Minus size={10} /></button>
                    <span className="px-2 font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => incrementQuantity(item.id)} className="p-1 text-white hover:text-white cursor-pointer"><Plus size={10} /></button>
                  </div>
                </div>

                <span className={`${spaceGrotesk.className} font-bold text-xl tracking-wide text-red-600 w-14 text-right`}>
                  ${item.price}
                </span>

               
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Action Links */}
        <div className="flex flex-row items-center justify-between">
          <button onClick={() => router.push('/')} className={`${spaceGrotesk.className} text-[20px] scale-y-135 font-bold uppercase tracking-wider flex items-center gap-2 text-white hover:text-red-500 transition-colors group`}>
            <span className="text-red-600 group-hover:-translate-x-1 font-bold transition-transform">←</span> Continue Exploring
          </button>
          
       <div className="flex flex-col md:flex-row items-center gap-4 text-base sm:text-[20px] font-bold tracking-widest mt-16 md:mt-28 text-gray-200 uppercase">
  <span className="hover:text-white cursor-pointer">Explore</span>
  <span className="hidden md:inline text-neutral-600">•</span> 
  <span className="hover:text-white cursor-pointer">Discover</span>
  <span className="hidden md:inline text-neutral-600">•</span> 
  <span className="hover:text-white cursor-pointer">Inspire</span>
</div>
        </div>
      </div>

      {/* RIGHT COLUMN: Journey Summary Panel */}
      <div className="md:col-span-1 md:mt-29 mt-10">
        <div className="bg-black border-[1.5px] border-[#FE1212] rounded-[24px] p-3 pt-5 flex flex-col shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-row justify-between items-center border-b border-red-950/40 pb-4 mb-6">
            <h2 className={`${bebasNeue.className} text-[30px] tracking-wide text-[#C30000] uppercase`}>
              Journey Summary
            </h2>
            <Compass size={16} className="text-red-600" />
          </div>

          <div className={`${spaceGrotesk.className} flex flex-col gap-4 text-xs font-lighter tracking-wide text-white`}>
            <div className="flex justify-between">
              <span className="text-[19px] font-lighter">Subtotal ({totalItemsCount} items)</span>
              <span className="text-[19px] font-lighter text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-lighter text-[19px] flex items-center gap-1">Convenience Fee </span>
              <span className="text-[19px] font-lighter text-white">${convenienceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-b border-red-950/40 pb-4">
              <span className="font-lighter text-white text-[19px] flex items-center gap-1">Tax </span>
              <span className="text-[19px] font-lighter text-white">${tax.toFixed(2)}</span>
            </div>
          </div>

          <div>
            <label className={`${spaceGrotesk.className} text-[19px] scale-y-150 font-lighter font-bold text-[#C30000] uppercase tracking-tighter block mb-0 mt-4`}>
              Expedition Code
            </label>
            <div className="relative flex items-center mt-2">
              <input 
                type="text" 
                placeholder="Enter code" 
                className="w-full bg-transparent border border-zinc-800 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-red-600 font-medium tracking-wide text-white placeholder-gray-500 text-[14px]"
              />
              <button className="absolute right-3 text-zinc-500 hover:text-red-600 transition-colors">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-baseline border-t border-zinc-900 mt-6 pt-4">
            <span className={`${spaceGrotesk.className} text-[20px] font-lighter uppercase tracking-wider text-white`}>Total</span>
            <span className={`${spaceGrotesk.className} text-[20px] font-lighter font-mono text-white`}>${grandTotal.toFixed(2)}</span>
          </div>

          <Link 
            href={subtotal > 0 ? "/checkoutp1" : "#"} 
            className={`w-full text-white text-[20px] font-bold text-xs uppercase tracking-widest mt-3 py-3.5 rounded-lg flex items-center justify-center gap-2 mb-6 shadow-lg transition-all ${
              subtotal > 0 
                ? "bg-[#B90000] hover:opacity-90 active:scale-[0.99] shadow-red-950/20" 
                : "bg-zinc-800 border border-zinc-700 text-zinc-500 cursor-not-allowed opacity-50 shadow-none"
            }`}
          >
            Proceed to Checkout <span className="text-sm">→</span>
          </Link>

          <div className={`${spaceGrotesk.className} text-[18px] font-lighter flex items-center justify-center gap-1 text-white tracking-wide border-b border-red-950/20 pb-6 mb-2`}>
            <span>Your journey is safe with us !</span>
            <div className="w-10 ml-2 h-10 object-contain" style={{ 
              backgroundImage: "url('/shield.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat"
            }}></div>
          </div>
          <hr className="border-[#FD0A0A] w-full mb-4 mt-0" />

          <div className="flex flex-row items-center gap-3 bg-zinc-950/30 p-2.5 rounded-xl border border-zinc-900/40">
            <div className="w-12 h-12 object-contain" 
              style={{ 
                backgroundImage: "url('/image 15.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat"
              }}
            />
            <div className="flex flex-col text-[9px] font-mono tracking-tighter text-white">
              <div className="flex gap-4">
                <span className={`${spaceGrotesk.className} text-[16px] font-lighter ml-2 text-white uppercase tracking-normal`}>Origin</span>
                <div className={`${spaceGrotesk.className} text-[14px] font-lighter`}>
                  <p>LAT &nbsp;25°32'0.18" N</p>
                  <p>LONG 84°51'16.08" E</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}