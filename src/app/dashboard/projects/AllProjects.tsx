"use client";
import ProjectCard from "@/components/Shared/dashboard/project/ProjectCard";
import { useProjectContext } from "@/context/ProjectContext";
import { apiService } from "@/lib/api-routes/apis";
import { ProjectType } from "@/lib/types/project-type";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function AllProjects() {
  const { projects, setProjects } = useProjectContext();
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["all-projects"],
    queryFn: async () => apiService({ endpoint: "/projects" }),
    select: (data) => data.data,
  });

  if (data) {
    setProjects(data);
  }

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  console.log(data);
  return (
    <div
      className={"w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start"}
    >
      {projects?.map((project: ProjectType) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
