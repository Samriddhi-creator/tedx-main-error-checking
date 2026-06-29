"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import StickyNote from "@/src/features/components/wall/StickyNote";
import AddNoteModal from "@/src/features/components/wall/AddNoteModal";
import { motion } from "framer-motion";

const PASTEL_COLORS = [
  "#FEF08A", // yellow
  "#FECACA", // pink/red
  "#BFDBFE", // blue
  "#BBF7D0", // green
  "#E9D5FF", // purple
  "#FFDEDA", // salmon
  "#E0E7FF", // indigo
];

interface Note {
  id: string;
  username: string;
  message: string;
  color: string;
  likes: number;
  rotation: number;
}

// Initial mock data
const INITIAL_NOTES: Note[] = [
  {
    id: "1",
    username: "TEDxFan",
    message: "Can't wait for the new theme to unfold! Metamorphosis is exactly what we need right now.",
    color: PASTEL_COLORS[0],
    likes: 12,
    rotation: -2,
  },
  {
    id: "2",
    username: "TechEnthusiast",
    message: "Looking forward to the AI discussions. How will it shape our future?",
    color: PASTEL_COLORS[2],
    likes: 8,
    rotation: 1.5,
  },
  {
    id: "3",
    username: "CreativeSoul",
    message: "Art and technology intersecting... this is where true magic happens! ✨",
    color: PASTEL_COLORS[4],
    likes: 24,
    rotation: -1,
  },
  {
    id: "4",
    username: "StudentDev",
    message: "Hoping to network with amazing innovators this year. See you all there!",
    color: PASTEL_COLORS[3],
    likes: 5,
    rotation: 2.5,
  }
];

export default function CommunityWallPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load notes from local storage or fallback to initial
    const savedNotes = localStorage.getItem("tedxCommunityNotes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        setNotes(INITIAL_NOTES);
      }
    } else {
      setNotes(INITIAL_NOTES);
    }
    setMounted(true);
  }, []);

  // Save notes whenever they change (if mounted)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("tedxCommunityNotes", JSON.stringify(notes));
    }
  }, [notes, mounted]);

  const handleLike = (id: string, isLiking: boolean) => {
    setNotes((prev) => 
      prev.map(note => 
        note.id === id ? { ...note, likes: isLiking ? note.likes + 1 : Math.max(0, note.likes - 1) } : note
      )
    );
  };

  const MAX_NOTES = 50;

  const handleAddNote = (username: string, message: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      username,
      message,
      color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
      likes: 0,
      rotation: (Math.random() * 6) - 3, // random between -3 and +3
    };
    
    // Add to top of the list and cap at MAX_NOTES
    setNotes((prev) => {
      const updatedNotes = [newNote, ...prev];
      if (updatedNotes.length > MAX_NOTES) {
        return updatedNotes.slice(0, MAX_NOTES);
      }
      return updatedNotes;
    });
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <main className="min-h-screen bg-[#111] text-white pt-24 pb-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/30 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <Link href="/events" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
              <ArrowLeft size={16} /> Back to Events
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold font-['Bebas_Neue'] tracking-wide">
              Community <span className="text-red-600">Wall</span>
            </h1>
            <p className="text-gray-400 mt-2 max-w-xl">
              Leave your mark. Share an idea, ask a question, or let us know what you're most excited about.
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
          >
            <Plus size={20} /> Add Note
          </motion.button>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {notes.map((note) => (
            <StickyNote key={note.id} note={note} onLike={handleLike} />
          ))}
        </div>
        
        {notes.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">The wall is empty! Be the first to leave a note.</p>
          </div>
        )}
      </div>

      <AddNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddNote}
      />
    </main>
  );
}
