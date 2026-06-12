"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import CartFooter from "./footet"; 
import bgImg from "./background.png"; 
import CartNavbar from "./CartNavbar"; 
import { Bebas_Neue, Space_Grotesk } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Checkoutp3() {
  const router = useRouter();

  const [explorerData, setExplorerData] = useState({ name: "Loading...", email: "Loading...", phone: "Loading..." });
  const [dropPoint, setDropPoint] = useState({ line1: "Loading...", line2: "", isOutCampus: false });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedName = localStorage.getItem("explorer_name") || "Not provided";
    const savedEmail = localStorage.getItem("explorer_email") || "Not provided";
    const savedPhone = localStorage.getItem("explorer_phone") || "Not provided";
    setExplorerData({ name: savedName, email: savedEmail, phone: savedPhone });

    const savedLocationType = localStorage.getItem("location_type") || "in-campus";
    if (savedLocationType === "out-campus") {
      const address = localStorage.getItem("out_address") || "Address Unspecified";
      const city = localStorage.getItem("out_city") || "";
      const state = localStorage.getItem("out_state") || "";
      const postal = localStorage.getItem("out_postal") || "";
      
      setDropPoint({
        line1: address,
        line2: `${city}${city && state ? ", " : ""}${state} ${postal}`.trim(),
        isOutCampus: true
      });
    } else {
      const sector = localStorage.getItem("hostel_sector") || "N/A";
      const room = localStorage.getItem("room_coordinate") || "N/A";
      setDropPoint({
        line1: `Sector: ${sector}`,
        line2: `Room: ${room}`,
        isOutCampus: false
      });
    }

    try {
      const savedCart = localStorage.getItem("cart_items");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart) as CartItem[];
        const filteredCart = parsedCart.filter(item => item.quantity > 0);
        setCartItems(filteredCart);
      }
    } catch (err) {
      console.error("Failed to parse cart local storage", err);
    }
  }, []);

  const handleTransmission = () => {
    localStorage.clear();
    router.push("/cart");
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const platformFee = subtotal > 0 ? 5.00 : 0.00;
  const discount = subtotal > 0 ? 10.00 : 0.00; 
  const grandTotal = Math.max(0, subtotal + platformFee - discount);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-red-600 flex flex-col justify-between">
      
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
   
      <div className="w-full relative z-20">
        <CartNavbar />
      </div>

      <main className="max-w-4xl w-full mx-auto border border-red-950/80 bg-black/85 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl shadow-red-950/10 relative z-10 my-12">
        
        <div className="flex justify-between items-center px-6 py-4 border-b border-red-950/50">
          <div>
            <p className="text-[10px] uppercase text-zinc-500 tracking-widest font-bold">Checkout Protocol</p>
            <h2 className={`text-xl font-semibold scale-y-125 ${spaceGrotesk.className} tracking-tighter text-white mt-0.5 uppercase`}>IDENTIFY EXPLORER</h2>
          </div>
          <Link href="/cart">
            <button className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 uppercase tracking-wide group transition-colors">
              <span className="text-red-600 font-bold group-hover:scale-110 transition-transform">✕</span> Abort
            </button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row min-h-[450px]">
          
          <div className="w-full md:w-1/4 p-6 border-b md:border-b-0 md:border-r border-red-950/50 flex flex-col justify-between bg-black/40 relative">
            <div className="space-y-6 relative">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Progress</p>
              
              <div className="flex items-center gap-3">
                <span className="text-red-600 text-[10px] font-bold">✓</span>
                <span className="text-xs text-zinc-500 tracking-wide font-normal">Coordinates</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-red-600 text-[10px] font-bold">✓</span>
                <span className="text-xs text-zinc-500 tracking-wide font-normal">Route</span>
              </div>

              <div className="flex items-center gap-3 pl-0.5">
                <div className="w-2.5 h-2.5 bg-red-600 transform rotate-45 shadow-md shadow-red-500/50"></div>
                <span className="text-xs font-semibold text-white tracking-wide">Manifest</span>
              </div>
            </div>

            <Link href="/checkoutp2">
              <button className="mt-12 md:mt-0 w-24 py-1.5 bg-red-950/20 border border-red-600/70 text-[11px] font-bold text-white rounded uppercase tracking-wider hover:bg-red-600 transition-colors">
                ← BACK
              </button>
            </Link>
          </div>

          <div className="w-full md:w-3/4 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className={`text-[26px] ${spaceGrotesk.className} font-bold uppercase tracking-wider text-white`}>
                Final Manifest Review
              </h3>
              <p className="text-xs text-zinc-400 mt-1 mb-6 tracking-wide font-normal">
                Verify your coordinates and expedition kit before initiating secure transmission
              </p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-[#141414] border border-zinc-800/60 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">Explorer Data 👤</span>
                      <Link href="/checkoutp1" className="text-[9px] text-zinc-600 hover:text-red-500 uppercase tracking-widest font-bold">Edit</Link>
                    </div>
                    <div className="space-y-1 text-xs text-zinc-400/80 font-mono">
                      <p><span className="text-zinc-600 font-sans">Name:</span> {explorerData.name}</p>
                      <p><span className="text-zinc-600 font-sans">Email:</span> {explorerData.email}</p>
                      <p><span className="text-zinc-600 font-sans">Phone:</span> {explorerData.phone}</p>
                    </div>
                  </div>

                  <div className="bg-[#141414] border border-zinc-800/60 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">Drop Point 📍</span>
                      <Link href="/checkoutp2" className="text-[9px] text-zinc-600 hover:text-red-500 uppercase tracking-widest font-bold">Edit</Link>
                    </div>
                    <div className="space-y-1 text-xs text-zinc-400/80 font-mono break-words">
                      <p>{dropPoint.line1}</p>
                      {dropPoint.line2 && <p>{dropPoint.line2}</p>}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 bg-[#141414] border border-zinc-800/60 p-4 rounded-xl h-full flex flex-col justify-between min-h-[250px]">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase block mb-3 pb-1 border-b border-zinc-900">
                      Your Expedition Kit
                    </span>
                    
                    <div className="space-y-2 text-xs font-mono text-zinc-400/80 max-h-[110px] overflow-y-auto pr-1 mb-4">
                      {cartItems.length === 0 ? (
                        <p className="text-zinc-600 italic">No items found in kit.</p>
                      ) : (
                        cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <span className="truncate max-w-[160px]">{item.name} <span className="text-[10px] text-zinc-600 font-sans">x{item.quantity}</span></span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="space-y-1.5 text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-900/60">
                      <div className="flex justify-between"><span>Items Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span>Platform Fee</span><span>${platformFee.toFixed(2)}</span></div>
                      <div className="flex justify-between text-red-500"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-baseline pt-4 border-t border-zinc-800 mt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Total</span>
                    <span className="text-xl font-black font-mono text-white">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button 
                onClick={handleTransmission}
                className="bg-red-600 border border-red-600 px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded shadow-md shadow-red-900/40 hover:bg-transparent transition duration-200 text-white cursor-pointer"
              >
                Initiate Transmission
              </button>
            </div>

          </div>
        </div>
      </main>

      <div className="w-full text-zinc-600 text-xs relative z-10 mt-auto">
        <CartFooter />
      </div>

    </div>
  );
}