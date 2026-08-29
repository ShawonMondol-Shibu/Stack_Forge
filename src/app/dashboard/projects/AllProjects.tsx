"use client";
import ProjectCard from "@/components/Shared/dashboard/project/ProjectCard";
import ProjectCardSkeleton from "@/components/Shared/dashboard/project/ProjectCardSkeleton";
import { Button } from "@/components/ui/button";
import { useProjectContext } from "@/context/ProjectContext";
import { Project } from "@/lib/types/project-type";
import React, { Suspense } from "react";

export default function AllProjects() {
  const { projects, isPending, isError, error } = useProjectContext();

  if (isError) {
    return (
      <div className="p-2 bg-background w-full min-h-[50dvh] rounded-2xl flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-xl capitalize text-destructive">
            {error?.message}
          </span>

          <Button>Retry</Button>
        </div>
      </div>
    );
  }
  return (
    <div
      className={"w-full min-h-[50dvh] grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start"}
    >
      {isPending && (
        <Suspense fallback={null}>
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </Suspense>
      )}
      {projects?.map((project: Project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
