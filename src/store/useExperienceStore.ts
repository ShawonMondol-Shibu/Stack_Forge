import { create } from "zustand";
import { persist } from "zustand/middleware";
import type Experience from "@/lib/types/experience";

interface ExperienceStore {
  experiences: Experience[];
  setExperiences: (experiences: Experience[]) => void;
  addExperience: (experience: Experience) => void;
  updateExperienceInStore: (experience: Experience) => void;
  removeExperienceFromStore: (experienceId: string) => void;
}

const useExperienceStore = create<ExperienceStore>()(
  persist(
    (set) => ({
      experiences: [],

      setExperiences: (experiences) => set({ experiences }),

      addExperience: (experience) =>
        set((state) => ({
          experiences: [...state.experiences, experience],
        })),

      updateExperienceInStore: (updatedExperience) =>
        set((state) => ({
          experiences: state.experiences.map((experience) =>
            experience.id === updatedExperience.id
              ? updatedExperience
              : experience,
          ),
        })),

      removeExperienceFromStore: (experienceId) =>
        set((state) => ({
          experiences: state.experiences.filter(
            (experience) => experience.id !== experienceId,
          ),
        })),
    }),
    {
      name: "stackforge-experiences",
    },
  ),
);

export default useExperienceStore;