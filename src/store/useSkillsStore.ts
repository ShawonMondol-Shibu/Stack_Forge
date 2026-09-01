import { create } from "zustand";

export interface Skill {
  id: string;
  name: string;
  description?: string;
}

interface SkillsStore {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  addSkillToStore: (skill: Skill) => void;
  updateSkillInStore: (updatedSkill: Skill) => void;
  removeSkillFromStore: (skillId: string) => void;
}

const useSkillsStore = create<SkillsStore>((set) => ({
  skills: [],
  setSkills: (skills) => set({ skills }),
  addSkillToStore: (skill) =>
    set((state) => ({ skills: [...state.skills, skill] })),
  updateSkillInStore: (updatedSkill) =>
    set((state) => ({
      skills: state.skills.map((skill) =>
        skill.id === updatedSkill.id ? updatedSkill : skill
      ),
    })),
  removeSkillFromStore: (skillId) =>
    set((state) => ({
      skills: state.skills.filter((skill) => skill.id !== skillId),
    })),
}));

export default useSkillsStore;