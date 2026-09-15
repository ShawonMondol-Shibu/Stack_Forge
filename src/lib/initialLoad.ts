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
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const InitialLoad = () => {
  const { data: projects } = useQuery(getAllProjects());
  const { data: task } = TaskQuery.GetAllTasks();
  const { data: techStack } = useTechStack();
  const { data: skills } = useSkillsQuery();
  const { setProjects } = useProjectStore();
  const { setTask } = useTaskStore();
  const { setTechStack } = useTechStackStore();
  const { setSkills } = useSkillsStore();
  const { data: notes } = noteQuery.GetAll();
  const { setNotes } = useNoteStore();

  useEffect(() => {
    if (projects) setProjects(projects);

    if (task) setTask(task);

    if (techStack) setTechStack(techStack);

    if (skills) setSkills(skills);

    if (notes) setNotes(notes);
  }, [
    projects,
    setProjects,
    task,
    setTask,
    techStack,
    setTechStack,
    skills,
    setSkills,
    notes,
    setNotes,
  ]);
};
