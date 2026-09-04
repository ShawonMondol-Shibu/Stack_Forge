import { TechStackItem } from "@/lib/types/techStack-type";
import { create } from "zustand";

interface techStackStoreType {
  techStacks: TechStackItem[];
  setTechStack: (techStack: TechStackItem[]) => void;
}

export const useTechStackStore = create<techStackStoreType>((set) => ({
  techStacks: [],
  setTechStack: (techStack) => set({ techStacks: techStack }),
}));
