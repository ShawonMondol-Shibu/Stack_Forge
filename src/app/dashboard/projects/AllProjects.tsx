"use client";
import ProjectCard from "@/components/Shared/dashboard/project/ProjectCard";
import { apiService } from "@/lib/api-routes/apis";
import { ProjectType } from "@/lib/types/project-type";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function AllProjects() {
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["all-projects"],
    queryFn: () =>  apiService("projects"),
  });

   if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  console.log(data)
  return (
    <div
      className={"w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start"}
    >
      {data.data.map((project:ProjectType) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
