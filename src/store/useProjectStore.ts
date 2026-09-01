import { create } from "zustand";
import { Project as ProjectType } from "@/lib/types/project-type";

interface ProjectStoreType {
  projects: ProjectType[];
  setProjects: (projects: ProjectType[]) => void;
  addProject: (project: ProjectType) => void;
  updateProjectInStore: (project: ProjectType) => void;
  removeProjectFromStore: (projectId: string) => void;
}

export const useProjectStore = create<ProjectStoreType>((set) => ({
  projects: [],

  setProjects: (projects) => set({ projects }),

  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),

  updateProjectInStore: (updatedProject) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === updatedProject.id ? updatedProject : p,
      ),
    })),

  removeProjectFromStore: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== projectId),
    })),
}));
