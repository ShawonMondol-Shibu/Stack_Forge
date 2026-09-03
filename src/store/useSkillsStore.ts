import { create } from "zustand";

export interface Skill {
  id?: string;
  userId?: string;
  techStack?: string[];
  description?: string;
  createdAt?: number | Date | undefined;
  updatedAt?: number | Date | undefined;
}

interface SkillsStore {
  skills: Skill;
  setSkills: (skills: Skill) => void;
  updateSkillInStore: (updatedSkill: Skill) => void;
  removeSkillFromStore: (skillId: string) => void;
}

const useSkillsStore = create<SkillsStore>((set) => ({
  skills: [],

  setSkills: (skills) => set({ skills }),
  updateSkillInStore: (updatedSkill) =>
    set((state) => ({
      skills: {
        ...state.skills,
        ...updatedSkill
      }
    })),
  removeSkillFromStore: (skillId) =>
    set((state) => ({
      skills: {
        ...state.skills,
        techStack: state.skills.techStack?.filter((skill) => skill !== skillId),
      }
    })),
}));

export default useSkillsStore;
