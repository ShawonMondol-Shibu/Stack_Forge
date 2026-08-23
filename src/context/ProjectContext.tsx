"use client";
import { ProjectType } from "@/lib/types/project-type";
import React, { createContext, type Dispatch, type SetStateAction, useContext, useState } from "react";

type ProjectContextValue = {
    projects: ProjectType[],
    setProjects: Dispatch<SetStateAction<ProjectType[]>>,
}
const defaultValue = {
    projects: [],
    setProjects: ()=> {},
}
export const ProjectContext = createContext<ProjectContextValue>(defaultValue);

export default function ProjectContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
