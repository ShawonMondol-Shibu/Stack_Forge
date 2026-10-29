"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import UseSession from "@/components/Shared/UseSession";
import {
  useLikeProject,
  useUnlikeProject,
} from "@/hooks/mutations/use-project-mutation";
import type { Project } from "@/lib/types/project-type";
import { getTrendingProjects } from "@/hooks/queries/use-projects";
import ProjectCard from "../ProjectCard";

const SKELETON_COUNT = 4;

function ProjectSkeleton() {
  return (
    <div className="w-full animate-pulse overflow-hidden rounded-xl border">
      <div className="h-44 w-full bg-muted" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-2/3 rounded bg-muted" />
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-4/5 rounded bg-muted" />
      </div>
    </div>
  );
}

export default function TrendingProjects({ limit = 8 }: { limit?: number }) {
  const router = useRouter();
  const { data: session } = UseSession();
  const isLoggedIn = Boolean(session?.user?.id);

  const { data: projects, isPending, isError } = useQuery(
    getTrendingProjects(limit),
  );
  const { mutate: like } = useLikeProject();
  const { mutate: unlike } = useUnlikeProject();

  // Stable reference, tai memo kora ProjectCard gulo osoyoojon re-render hoy na
  const handleToggleLike = useCallback(
    (project: Project) => {
      if (!isLoggedIn) {
        router.push("/login");
        return;
      }
      if (project.likedByMe) {
        unlike(project.id);
      } else {
        like(project.id);
      }
    },
    [isLoggedIn, router, like, unlike],
  );

  const gridClass = "grid gap-4 sm:grid-cols-2 lg:grid-cols-4";

  if (isPending) {
    return (
      <div className={gridClass}>
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-8 text-center text-sm text-destructive">
        Could not load trending projects.
      </p>
    );
  }

  if (!projects?.length) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No projects yet.
      </p>
    );
  }

  return (
    <div className={gridClass}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isOwner={false}
          onToggleLike={handleToggleLike}
        />
      ))}
    </div>
  );
}