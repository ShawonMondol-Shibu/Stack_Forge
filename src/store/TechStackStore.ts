import { TechStackItem } from "@/lib/types/techStack-type";
import { create } from "zustand";

interface techStackStoreType {
  techStack: TechStackItem[];
  setTechStack: (techStack: TechStackItem[]) => void;
}

export const useTechStackStore = create<techStackStoreType>((set) => ({
  techStack: [],
  setTechStack: (techStack) => set({ techStack: techStack }),
}));
