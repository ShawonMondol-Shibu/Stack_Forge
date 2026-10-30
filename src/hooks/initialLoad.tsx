"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import UseSession from "@/components/Shared/UseSession";
import { noteQuery } from "@/hooks/queries/use-note";
import { getAllProjects } from "@/hooks/queries/use-projects";
import { useSkillsQuery } from "@/hooks/queries/use-skills";
import { TaskQuery } from "@/hooks/queries/use-task";
import useTechStack from "@/hooks/queries/useTechStack";
import { useTaskStore } from "@/store/TaskStore";
import { useTechStackStore } from "@/store/TechStackStore";
import { useNoteStore } from "@/store/useNoteStore";
import { useProjectStore } from "@/store/useProjectStore";
import useSkillsStore from "@/store/useSkillsStore";

// Protita query alada effect e store e jay. Ager moto ek effect e shob thakle
// ekta query bodlalei shob store (ar localStorage) abar likha hoto.
function useSyncToStore<T>(data: T | undefined, setter: (value: T) => void) {
  useEffect(() => {
    if (data) setter(data);
  }, [data, setter]);
}

function DashboardDataSync() {
  const { data: projects } = useQuery(getAllProjects());
  const { data: tasks } = TaskQuery.GetAllTasks();
  const { data: techStack } = useTechStack();
  const { data: skills } = useSkillsQuery.GetMySkills();
  const { data: notes } = noteQuery.GetAll();

  // Selector: shudhu setter nei, tai store bodlale ei component re-render hoy na
  const setProjects = useProjectStore((state) => state.setProjects);
  const setTask = useTaskStore((state) => state.setTask);
  const setTechStack = useTechStackStore((state) => state.setTechStack);
  const setSkills = useSkillsStore((state) => state.setSkills);
  const setNotes = useNoteStore((state) => state.setNotes);

  useSyncToStore(projects, setProjects);
  useSyncToStore(tasks, setTask);
  useSyncToStore(techStack, setTechStack);
  useSyncToStore(skills, setSkills);
  useSyncToStore(notes, setNotes);

  return null;
}

// Logged out user er jonno kono request-i jabe na
export function InitialLoad() {
  const { data: session } = UseSession();

  if (!session?.session) return null;
  return <DashboardDataSync />;
}

export default InitialLoad;