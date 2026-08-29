"use client";
import { getAllProjects } from "@/hooks/queries/use-projects";
import { apiService } from "@/lib/api-routes/apis";
import { Project as ProjectType } from "@/lib/types/project-type";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, type Dispatch, type SetStateAction, useContext, useEffect, useState } from "react";

type ProjectContextType = {
    projects: ProjectType[],
    setProjects: Dispatch<SetStateAction<ProjectType[]>>,
    isError: boolean,
    isPending: boolean,
    error: Error | null
}


const defaultValue = {
    projects: [],
    setProjects: ()=> {},
    isError: false,
    isPending: true,
    error: null,
}
export const ProjectContext = createContext<ProjectContextType>(defaultValue);

export default function ProjectContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projects, setProjects] = useState<ProjectType[]>([]);

 const { data, isError, isPending, error } = useQuery({
  ...getAllProjects(),
  select: (data)=> setProjects(data.data) 
 });


  return (
    <ProjectContext.Provider value={{ projects, setProjects, isError, isPending, error }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectContext = () => {
  return useContext(ProjectContext);
};
