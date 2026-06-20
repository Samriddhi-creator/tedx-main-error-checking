import { create } from 'zustand';

interface JourneyStore {
    rulerProgress: number; // 0 to 1
    setRulerProgress: (progress: number) => void;
}

export const useJourneyStore = create<JourneyStore>((set) => ({
    rulerProgress: 0,
    setRulerProgress: (progress) => set({ rulerProgress: progress }),
}));
