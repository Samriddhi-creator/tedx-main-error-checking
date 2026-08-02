"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, X, MessageSquareQuote } from "lucide-react";
import {
  getMemories,
  createMemory,
  likeMemory,
  unlikeMemory,
} from "@/services/memory.services";
import { Memory as BackendMemory } from "@/types/memory";

export type RoleCategory = "organizer" | "coordinator" | "subcoordinator";

export interface Memory {
  id: string;
  author: string;
  role: string;
  roleCategory: RoleCategory;
  quote: string;
  likes: number;
  rotation: number;
}

const ROLE_FILTERS = [
  { id: "all", label: "All" },
  { id: "organizer", label: "Organizer" },
  { id: "coordinator", label: "Coordinator" },
  { id: "subcoordinator", label: "Subcoordinator" },
];

const CATEGORY_TO_BACKEND: Record<RoleCategory, BackendMemory["roleCategory"]> = {
  organizer: "Organizer",
  coordinator: "Coordinator",
  subcoordinator: "Subcoordinator",
};

const rotationFromId = (id: string): number => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 1000;
  }
  return (hash / 1000) * 5 - 2.5;
};

const mapToUI = (mem: BackendMemory): Memory => ({
  id: mem._id,
  author: mem.name,
  role: mem.roleCategory,
  roleCategory: mem.roleCategory.toLowerCase() as RoleCategory,
  quote: mem.memoryText,
  likes: mem.likes,
  rotation: rotationFromId(mem._id),
});

const LIKED_IDS_STORAGE_KEY = "tedx_ki_liked_ids";

export default function WallOfMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Memory Form State
  const [newAuthor, setNewAuthor] = useState("");
  const [newRoleCategory, setNewRoleCategory] =
    useState<RoleCategory>("organizer");
  const [newQuote, setNewQuote] = useState("");

  const fetchMemoriesData = async () => {
    try {
      setLoading(true);
      const data = await getMemories();
      setMemories(data.map(mapToUI));
      setError(null);
    } catch (e) {
      console.error("Failed to fetch memories", e);
      setError("Couldn't load memories right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);

    const savedLikes = localStorage.getItem(LIKED_IDS_STORAGE_KEY);
    if (savedLikes) {
      try {
        setLikedIds(JSON.parse(savedLikes));
      } catch (e) {
        console.error("Failed to parse liked ids", e);
      }
    }

    fetchMemoriesData();
  }, []);

  const persistLikedIds = (updated: Record<string, boolean>) => {
    setLikedIds(updated);
    localStorage.setItem(LIKED_IDS_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleLike = async (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const isLiked = likedIds[id];

    const optimisticDelta = isLiked ? -1 : 1;
    setMemories((prev) =>
      prev.map((mem) =>
        mem.id === id ? { ...mem, likes: Math.max(0, mem.likes + optimisticDelta) } : mem
      )
    );
    if (selectedMemory && selectedMemory.id === id) {
      setSelectedMemory((prev) =>
        prev ? { ...prev, likes: Math.max(0, prev.likes + optimisticDelta) } : prev
      );
    }
    persistLikedIds({ ...likedIds, [id]: !isLiked });

    try {
      const updatedBackendMem = isLiked
        ? await unlikeMemory(id)
        : await likeMemory(id);
      const trueLikes: number = updatedBackendMem.likes;

      setMemories((prev) =>
        prev.map((mem) => (mem.id === id ? { ...mem, likes: trueLikes } : mem))
      );
      if (selectedMemory && selectedMemory.id === id) {
        setSelectedMemory((prev) =>
          prev ? { ...prev, likes: trueLikes } : prev
        );
      }
    } catch (err) {
      console.error("Failed to update like", err);
      setMemories((prev) =>
        prev.map((mem) =>
          mem.id === id ? { ...mem, likes: Math.max(0, mem.likes - optimisticDelta) } : mem
        )
      );
      if (selectedMemory && selectedMemory.id === id) {
        setSelectedMemory((prev) =>
          prev ? { ...prev, likes: Math.max(0, prev.likes - optimisticDelta) } : prev
        );
      }
      persistLikedIds({ ...likedIds, [id]: isLiked });
    }
  };

  const handleAddMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuote.trim() || !newAuthor.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const created = await createMemory({
        name: newAuthor.trim(),
        roleCategory: CATEGORY_TO_BACKEND[newRoleCategory],
        memoryText: newQuote.trim(),
      });

      setMemories((prev) => [mapToUI(created), ...prev]);
      setNewAuthor("");
      setNewQuote("");
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Failed to create memory", err);
      setError("Couldn't pin your memory right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMemories = memories.filter(
    (mem) => activeFilter === "all" || mem.roleCategory === activeFilter
  );

  if (!mounted) return null;

  const MAX_PREVIEW_LEN = 130;

  return (
    <section className="w-full mb-24 px-4 sm:px-8">
      {/* Header Banner */}
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="font-bebas text-[45px] sm:text-[70px] md:text-[85px] lg:text-[105px] tracking-wide uppercase text-white drop-shadow-[0_4px_20px_rgba(235,0,40,0.5)] leading-none">
          Wall of <span className="text-[#EB0028]">Memories</span>
        </h1>
        <p className="font-space text-gray-300 max-w-3xl text-base sm:text-xl md:text-2xl mt-4 leading-relaxed">
          Glance back at the moments, stories, and kaleidoscopic fragments of TEDxIIT Patna 2025.
        </p>

        {/* Role Filters & Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
          {ROLE_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`py-2 px-5 rounded-full font-medium text-xs sm:text-sm md:text-base transition-all duration-200 cursor-pointer ${
                activeFilter === filter.id
                  ? "bg-[#EB0028] text-white shadow-[0_0_15px_rgba(235,0,40,0.4)]"
                  : "bg-zinc-900/80 text-gray-400 hover:text-white border border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {filter.label}
            </button>
          ))}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="ml-2 inline-flex items-center gap-2 bg-white text-black hover:bg-red-600 hover:text-white font-bold py-2.5 px-6 rounded-full transition-colors duration-200 cursor-pointer text-xs sm:text-sm md:text-base"
          >
            <Plus className="w-4 h-4" />
            <span>Pin a Memory</span>
          </button>
        </div>
      </div>

      {/* Loading / Error / Empty States */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <p className="font-space text-gray-400 animate-pulse text-base">
            Loading memories from server...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="flex justify-center items-center py-12">
          <p className="font-space text-red-400 text-base">{error}</p>
        </div>
      )}

      {!loading && !error && filteredMemories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-[#EB0028]/35 rounded-2xl max-w-3xl mx-auto bg-[#181314]/50 my-6">
          <p className="font-bebas text-2xl sm:text-3xl tracking-wide text-white mb-2">
            No Memories Pinned Yet
          </p>
          <p className="font-space text-gray-400 text-sm sm:text-base max-w-md">
            Be the first to share a moment, quote, or story from TEDxIIT Patna 2025!
          </p>
        </div>
      )}

      {/* Polaroid Memories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-7xl mx-auto py-4">
        <AnimatePresence mode="popLayout">
          {filteredMemories.map((mem) => {
            const isLiked = !!likedIds[mem.id];
            const isTruncated = mem.quote.length > MAX_PREVIEW_LEN;
            const quoteDisplay = isTruncated
              ? mem.quote.slice(0, MAX_PREVIEW_LEN) + "..."
              : mem.quote;

            return (
              <motion.div
                key={mem.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
                transition={{ duration: 0.3 }}
                style={{ rotate: `${mem.rotation}deg` }}
                onClick={() => setSelectedMemory(mem)}
                className="group relative flex flex-col justify-between bg-[#181314] hover:bg-[#201718] border-[2px] border-[#EB0028]/35 hover:border-[#EB0028] rounded-2xl p-7 shadow-[0_10px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_12px_40px_rgba(235,0,40,0.25)] transition-all duration-300 cursor-pointer"
              >
                {/* Visual Pin / Tape top center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-[#EB0028] rounded-sm transition-colors" />

                {/* Memory Quote */}
                <div className="my-4 pt-2">
                  <p className="font-space text-white/90 text-base sm:text-lg leading-relaxed italic">
                    &ldquo;{quoteDisplay}&rdquo;
                  </p>
                  {isTruncated && (
                    <span className="inline-block mt-2 text-xs font-semibold text-red-500 hover:text-red-400 underline transition-colors">
                      Read more →
                    </span>
                  )}
                </div>

                {/* Footer: Author, Role & Like Counter */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800/80">
                  <div className="flex flex-col">
                    <span className="font-semibold text-white text-base">
                      {mem.author}
                    </span>
                    <span className="text-xs sm:text-sm text-red-400 font-medium uppercase tracking-wide">
                      {mem.role}
                    </span>
                  </div>

                  {/* Like Counter */}
                  <button
                    type="button"
                    onClick={(e) => handleLike(mem.id, e)}
                    className="inline-flex items-center gap-1.5 p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isLiked ? "fill-red-500 text-red-500 scale-110" : ""
                      }`}
                    />
                    <span
                      className={`text-sm font-bold ${
                        isLiked ? "text-red-500" : "text-gray-400"
                      }`}
                    >
                      {mem.likes}
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Full Memory Dialog Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <div
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#161213] border-2 border-[#EB0028] rounded-3xl p-6 sm:p-8 md:p-10 my-auto"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <MessageSquareQuote className="w-8 h-8 text-[#EB0028]" />
                <span className="text-xs sm:text-sm font-bold text-red-500 uppercase tracking-widest bg-red-600/20 px-3 py-1 rounded-full border border-red-500/30">
                  {selectedMemory.role}
                </span>
              </div>

              <div className="my-6">
                <p className="font-space text-white text-lg sm:text-2xl leading-relaxed italic">
                  &ldquo;{selectedMemory.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-800">
                <div>
                  <h4 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                    {selectedMemory.author}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-space">
                    TEDxIIT Patna 2025 Edition
                  </p>
                </div>

                {/* Like button in modal */}
                <button
                  type="button"
                  onClick={(e) => handleLike(selectedMemory.id, e)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 hover:border-red-500 text-gray-300 hover:text-red-500 transition-all cursor-pointer"
                >
                  <Heart
                    className={`w-6 h-6 transition-transform duration-200 ${
                      likedIds[selectedMemory.id]
                        ? "fill-red-500 text-red-500 scale-110"
                        : ""
                    }`}
                  />
                  <span
                    className={`text-lg font-bold ${
                      likedIds[selectedMemory.id]
                        ? "text-red-500"
                        : "text-gray-300"
                    }`}
                  >
                    {selectedMemory.likes}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Memory Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-zinc-950 border border-red-600/40 rounded-2xl p-6 sm:p-8 my-auto"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-bebas text-3xl uppercase tracking-wide text-white mb-1">
                Pin a <span className="text-[#EB0028]">Memory</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-6 font-space">
                Share your favorite moment from TEDxIIT Patna 2025.
              </p>

              <form onSubmit={handleAddMemory} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Role Category *
                  </label>
                  <select
                    value={newRoleCategory}
                    onChange={(e) =>
                      setNewRoleCategory(e.target.value as RoleCategory)
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                  >
                    <option value="organizer">Organizer</option>
                    <option value="coordinator">Coordinator</option>
                    <option value="subcoordinator">Subcoordinator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Your Memory *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the moment, story, or feeling that stayed with you..."
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3.5 text-white text-sm focus:outline-none focus:border-red-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 rounded-lg text-sm font-bold bg-[#EB0028] hover:bg-red-600 text-white transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Pinning…" : "Pin Memory"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}