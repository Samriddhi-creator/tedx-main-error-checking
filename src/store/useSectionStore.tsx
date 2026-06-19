import { create } from "zustand";

type Section = "home" | "about" | "closing";

interface SectionStore {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export const useSectionStore = create<SectionStore>((set) => ({
  activeSection: "home",

  setActiveSection: (section) =>
    set({ activeSection: section }),
}));