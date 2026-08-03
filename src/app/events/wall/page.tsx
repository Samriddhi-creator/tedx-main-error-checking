"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import StickyNote from "@/src/features/components/wall/StickyNote";
import AddNoteModal from "@/src/features/components/wall/AddNoteModal";
import { motion } from "framer-motion";
import {
  getCommunityWallNotes,
  createCommunityWallNote,
  likeCommunityWallNote,
  unlikeCommunityWallNote,
} from "@/services/communityWall.services";
import { CommunityWallNoteBackend } from "@/types/communityWall";

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

const mapToUI = (note: CommunityWallNoteBackend): Note => ({
  id: note._id,
  username: note.username,
  message: note.message,
  color: note.color || PASTEL_COLORS[0],
  likes: note.likes || 0,
  rotation: typeof note.rotation === "number" ? note.rotation : 0,
});

const LIKED_IDS_STORAGE_KEY = "tedx_cw_liked_ids";

export default function CommunityWallPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [savedUsername, setSavedUsername] = useState<string | null>(null);
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);
  const [hasPosted, setHasPosted] = useState<boolean>(false);
  const [sort, setSort] = useState<"new" | "top">("new");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  const sortedNotes = useMemo(() => [
    ...notes.filter(note => savedNoteId ? note.id === savedNoteId : (savedUsername && note.username === savedUsername)),
    ...[...notes.filter(note => savedNoteId ? note.id !== savedNoteId : (!savedUsername || note.username !== savedUsername))]
      .sort((a, b) => sort === "top" ? b.likes - a.likes : 0),
  ], [notes, sort, savedUsername, savedNoteId]);
  const visibleNotes = sortedNotes.slice(0, visibleCount);

  const fetchNotesData = useCallback(async (sortOrder: "new" | "top") => {
    try {
      setLoading(true);
      const data = await getCommunityWallNotes(sortOrder);
      setNotes(data.map(mapToUI));
      setError(null);
    } catch (e) {
      console.error("Failed to fetch notes from server", e);
      setError("Couldn't load notes from server right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setSavedUsername(localStorage.getItem("communityWallUsername"));
    setSavedNoteId(localStorage.getItem("communityWallNoteId"));
    setHasPosted(!!localStorage.getItem("communityWallHasPosted"));

    const savedLikes = localStorage.getItem(LIKED_IDS_STORAGE_KEY);
    if (savedLikes) {
      try {
        setLikedIds(JSON.parse(savedLikes));
      } catch (e) {
        console.error("Failed to parse liked ids", e);
      }
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchNotesData(sort);
    }
  }, [sort, mounted, fetchNotesData]);

  const handleLike = async (id: string, isLiking: boolean) => {
    setNotes((prev) =>
      prev.map(note =>
        note.id === id ? { ...note, likes: isLiking ? note.likes + 1 : Math.max(0, note.likes - 1) } : note
      )
    );
    const updatedLikedIds = { ...likedIds, [id]: isLiking };
    setLikedIds(updatedLikedIds);
    localStorage.setItem(LIKED_IDS_STORAGE_KEY, JSON.stringify(updatedLikedIds));

    try {
      const updatedNote = isLiking
        ? await likeCommunityWallNote(id)
        : await unlikeCommunityWallNote(id);
      
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? { ...note, likes: updatedNote.likes } : note))
      );
    } catch (err) {
      console.error("Failed to update like on server", err);
      setNotes((prev) =>
        prev.map(note =>
          note.id === id ? { ...note, likes: isLiking ? Math.max(0, note.likes - 1) : note.likes + 1 } : note
        )
      );
      const revertedLikedIds = { ...likedIds, [id]: !isLiking };
      setLikedIds(revertedLikedIds);
      localStorage.setItem(LIKED_IDS_STORAGE_KEY, JSON.stringify(revertedLikedIds));
    }
  };

  const MAX_NOTES = 50;
  const handleDeleteNote = () => {
    setNotes(prev =>
      prev.filter(note => (savedNoteId ? note.id !== savedNoteId : note.username !== savedUsername))
    );
    localStorage.removeItem("communityWallHasPosted");
    localStorage.removeItem("communityWallUsername");
    localStorage.removeItem("communityWallNoteId");
    setSavedUsername(null);
    setSavedNoteId(null);
    setHasPosted(false);
    setShowDeleteConfirm(false);
  };

  const handleAddNote = async (username: string, message: string) => {
    try {
      const createdBackend = await createCommunityWallNote({
        username,
        message,
        color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
        rotation: (Math.random() * 6) - 3,
      });

      const newNote: Note = mapToUI(createdBackend);

      localStorage.setItem("communityWallUsername", username);
      localStorage.setItem("communityWallHasPosted", "true");
      localStorage.setItem("communityWallNoteId", newNote.id);
      setSavedUsername(username);
      setSavedNoteId(newNote.id);
      setHasPosted(true);

      setNotes((prev) => {
        const updatedNotes = [newNote, ...prev];
        if (updatedNotes.length > MAX_NOTES) {
          return updatedNotes.slice(0, MAX_NOTES);
        }
        return updatedNotes;
      });
    } catch (err) {
      console.error("Failed to post note to server", err);
      const newNote: Note = {
        id: Date.now().toString(),
        username,
        message,
        color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
        likes: 0,
        rotation: (Math.random() * 6) - 3,
      };

      localStorage.setItem("communityWallUsername", username);
      localStorage.setItem("communityWallHasPosted", "true");
      localStorage.setItem("communityWallNoteId", newNote.id);
      setSavedUsername(username);
      setSavedNoteId(newNote.id);
      setHasPosted(true);

      setNotes((prev) => {
        const updatedNotes = [newNote, ...prev];
        if (updatedNotes.length > MAX_NOTES) {
          return updatedNotes.slice(0, MAX_NOTES);
        }
        return updatedNotes;
      });
    }
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <main className="min-h-screen bg-[#111] text-white pt-15 pb-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
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
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setSort("new")}
                className={`text-sm sm:text-base font-semibold py-2 px-6 rounded-full transition-all duration-300 cursor-pointer ${sort === "new" ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] scale-105" : "bg-zinc-800/80 border border-zinc-700/60 text-gray-300 hover:bg-zinc-700 hover:text-white"}`}
              >
                New
              </button>
              <button
                onClick={() => setSort("top")}
                className={`text-sm sm:text-base font-semibold py-2 px-6 rounded-full transition-all duration-300 cursor-pointer ${sort === "top" ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] scale-105" : "bg-zinc-800/80 border border-zinc-700/60 text-gray-300 hover:bg-zinc-700 hover:text-white"}`}
              >
                Top
              </button>
            </div>
            <p className="text-gray-400 mt-2 max-w-xl">
              Leave your mark. Share an idea, ask a question, or let us know what you're most excited about.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
            >
              <Plus size={20} /> Add Note
            </motion.button>
            {hasPosted && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-zinc-800 hover:bg-red-900/50 border border-zinc-700 hover:border-red-700 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-all"
              >
                <Trash2 size={20} /> Delete My Note
              </motion.button>
            )}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 sm:gap-6 space-y-3 sm:space-y-6">
          {visibleNotes.map((note) => (
            <StickyNote
              key={note.id}
              note={note}
              onLike={handleLike}
              isPinned={savedNoteId ? note.id === savedNoteId : (savedUsername !== null && note.username === savedUsername)}
              isLiked={!!likedIds[note.id]}
            />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <p className="font-['Space_Grotesk'] text-gray-400 animate-pulse text-lg">
              Loading notes from server...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="flex justify-center items-center py-20">
            <p className="font-['Space_Grotesk'] text-red-400 text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && notes.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">The wall is empty! Be the first to leave a note.</p>
          </div>
        )}

        {!loading && notes.length > visibleCount && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount(v => v + 20)}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              Load More
            </button>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full text-center"
            >
              <h3 className="text-xl font-bold font-['Bebas_Neue'] tracking-wide mb-2">Delete your note?</h3>
              <p className="text-gray-400 text-sm mb-6">You can post a new one after deleting.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteNote}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}

        <AddNoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddNote}
        />
      </div>
    </main>
  );
}
