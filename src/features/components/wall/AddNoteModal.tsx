"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: string, message: string) => void;
}

export default function AddNoteModal({ isOpen, onClose, onSubmit }: AddNoteModalProps) {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<"username" | "note">("username");

  useEffect(() => {
    if (isOpen) {
      const savedName = localStorage.getItem("communityWallUsername");
      if (savedName) {
        setUsername(savedName);
        setStep("note");
      } else {
        setStep("username");
      }
    }
  }, [isOpen]);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length > 0) {
      localStorage.setItem("communityWallUsername", username.trim());
      setStep("note");
    }
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      onSubmit(username, message.trim());
      setMessage("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {step === "username" ? (
                <div>
                  <h3 className="text-2xl font-bold mb-2 font-['Bebas_Neue'] tracking-wide text-white">Join the Wall</h3>
                  <p className="text-gray-400 text-sm mb-6">Enter a username to start posting.</p>
                  <form onSubmit={handleUsernameSubmit} className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. Innovator99"
                      maxLength={20}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                      required
                    />
                    <button
                      type="submit"
                      disabled={!username.trim()}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
                    >
                      Continue
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold mb-2 font-['Bebas_Neue'] tracking-wide text-white">Share an Idea</h3>
                  <p className="text-gray-400 text-sm mb-6">Posting as <span className="text-red-400 font-semibold">@{username}</span></p>
                  <form onSubmit={handleNoteSubmit} className="flex flex-col gap-4">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What's your idea worth spreading?"
                      maxLength={150}
                      rows={4}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
                      required
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{message.length}/150</span>
                      <button
                        type="submit"
                        disabled={!message.trim()}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors"
                      >
                        Post Note
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
