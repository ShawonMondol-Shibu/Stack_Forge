import { TechStackItem } from "@/lib/types/techStack-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface techStackStoreType {
  techStacks: TechStackItem[];
  setTechStack: (techStack: TechStackItem[]) => void;
}

export const useTechStackStore = create<techStackStoreType>()(
  persist(
    (set) => ({
      techStacks: [],
      setTechStack: (techStack) => set({ techStacks: techStack }),
    }),
    { name: "stackforge-techStack" },
  ),
);
