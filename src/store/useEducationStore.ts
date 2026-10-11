import { create } from "zustand";
import type { EducationRecord } from "@/lib/types/education";

interface EducationStore {
  educations: EducationRecord[];
  setEducations: (educations: EducationRecord[]) => void;
  addEducation: (education: EducationRecord) => void;
  updateEducation: (education: EducationRecord) => void;
  removeEducation: (educationId: string) => void;
}

export const useEducationStore = create<EducationStore>()((set) => ({
  educations: [],
  setEducations: (educations) => set({ educations }),
  addEducation: (education) =>
    set((state) => ({ educations: [...state.educations, education] })),
  updateEducation: (updatedEducation) =>
    set((state) => ({
      educations: state.educations.map((education) =>
        education.id === updatedEducation.id ? updatedEducation : education,
      ),
    })),
  removeEducation: (educationId) =>
    set((state) => ({
      educations: state.educations.filter(
        (education) => education.id !== educationId,
      ),
    })),
}));
