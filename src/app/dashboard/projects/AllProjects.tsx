"use client";
import ProjectCard from "@/components/Shared/dashboard/project/ProjectCard";
import ProjectCardSkeleton from "@/components/Shared/dashboard/project/ProjectCardSkeleton";
import { Button } from "@/components/ui/button";
import { useProjectContext } from "@/context/ProjectContext";
import { apiService } from "@/lib/api-routes/apis";
import { ProjectType } from "@/lib/types/project-type";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";

type AllProjectsResponse = {
  data: [];
};

export default function AllProjects() {
  const { projects, setProjects } = useProjectContext();
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["all-projects"],
    queryFn: async () =>
      apiService<AllProjectsResponse>({ endpoint: "/projects" }),
    select: (data) => data.data,
  });

  if (data) {
    setProjects(data);
  }

  if (isError) {
    return (
      <div className="p-2 bg-background w-full h-50 rounded-2xl flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-xl capitalize text-destructive">
            {error.message}
          </span>

          <Button>Retry</Button>
        </div>
      </div>
    );
  }
  console.log(data);
  return (
    <div
      className={"w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start"}
    >
      {isPending && (
        <Suspense fallback={null}>
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </Suspense>
      )}
      {projects?.map((project: ProjectType) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
