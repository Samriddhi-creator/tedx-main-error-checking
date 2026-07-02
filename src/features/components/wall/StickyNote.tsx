"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface StickyNoteProps {
  note: {
    id: string;
    username: string;
    message: string;
    color: string;
    likes: number;
    rotation: number;
  };
  onLike: (id: string, isLiking: boolean) => void;
}

export default function StickyNote({ note, onLike }: StickyNoteProps) {
  const [isLiked, setIsLiked] = useState(false);

  // Check for holographic rare keywords
  const isRare = note.message.toLowerCase().includes("metamorphosis") || 
                 note.message.toLowerCase().includes("future") || 
                 note.message.toLowerCase().includes("iitp");

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    onLike(note.id, !isLiked);
  };

  // Gamification: Scale up slightly based on likes (max 1.1 scale)
  const dynamicScale = Math.min(1 + (note.likes * 0.015), 1.15);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: dynamicScale, y: 0, rotate: note.rotation }}
      whileHover={{ scale: dynamicScale + 0.05, rotate: 0, zIndex: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative p-6 rounded-lg shadow-lg flex flex-col justify-between break-inside-avoid mb-6 cursor-pointer overflow-hidden group`}
      style={{ backgroundColor: note.color, color: "#1a1a1a" }}
    >
      {/* Holographic Rare Effect Overlay */}
      {isRare && (
        <div className="absolute inset-0 opacity-40 mix-blend-color-dodge pointer-events-none bg-[linear-gradient(125deg,#ff0080,#ff8c00,#40e0d0,#ff0080)] bg-[length:200%_200%] animate-[gradient_3s_ease_infinite]" />
      )}

      {/* Tape effect on top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm shadow-sm rotate-2 z-10" />
      
      <p className="font-['Inter'] text-lg leading-relaxed mb-6 whitespace-pre-wrap font-medium relative z-10">
        {note.message}
      </p>
      
      <div className="flex items-center justify-between border-t border-black/10 pt-3 mt-auto relative z-10">
        <span className="font-bold text-sm">@{note.username}</span>
        
        <button 
          onClick={(e) => { e.stopPropagation(); handleToggleLike(); }}
          className={`flex items-center gap-1 text-sm font-semibold transition-colors ${isLiked ? "text-red-600" : "text-black/60 hover:text-red-600"}`}
        >
          <motion.div 
            whileTap={{ scale: 1.5 }}
            animate={isLiked ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
          </motion.div>
          {note.likes}
        </button>
      </div>
    </motion.div>
  );
}
