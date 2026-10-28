"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "@animateicons/react/lucide";
import { getAllProjects } from "@/hooks/queries/use-projects";
import { useQuery } from "@tanstack/react-query";
import useTechStack from "@/hooks/queries/useTechStack";
import { Badge } from "@/components/ui/badge";

export default function FeaturedProjects({
  userId,
  isReadOnly = false,
}: {
  userId?: string;
  isReadOnly?: boolean;
}) {
  const {
    data: projects = [],
    isPending,
    isError,
  } = useQuery(getAllProjects());
  const { data: techStacks = [] } = useTechStack();
  const userProjects = userId
    ? projects.filter((project) => project.userId === userId)
    : projects;
  const featuredProjects = [...userProjects]
    .sort(
      (first, second) =>
        new Date(second.updatedAt).getTime() -
        new Date(first.updatedAt).getTime(),
    )
    .slice(0, 4);

  return (
    <section className="w-full space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-primary">
            Selected work
          </p>
          <h2 className="mt-1 text-2xl font-semibold">Projects</h2>
        </div>
        {!isReadOnly && (
          <Link
            href="/dashboard/projects"
            className="flex items-center gap-1 text-xs font-medium text-primary"
          >
            View all Projects <ArrowRight size={14} />
          </Link>
        )}
      </div>
      {isPending ? (
        <div className="grid gap-4 sm:grid-cols-4">
          {[0, 1,2,3].map((item) => (
            <div
              key={item}
              className="aspect-[1.35] animate-pulse rounded-md bg-muted"
            />
          ))}
        </div>
      ) : isError ? (
        <p role="alert" className="text-sm text-destructive">
          Could not load projects.
        </p>
      ) : featuredProjects.length ? (
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-4">
          {featuredProjects.map((project, index) => {
            const projectSkills = techStacks.filter((stack) =>
              project.techStack.includes(stack.id),
            );

            return (
              <article
                key={project.id}
                className="group min-w-0 overflow-hidden rounded-md border border-border/70 bg-card transition-colors hover:border-primary/50"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/brain.jpg"}
                    alt={`${project.name} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                  <span className="absolute left-3 top-3 bg-background/90 px-2 py-1 text-xs font-medium">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="space-y-2 p-3">
                  <div>
                    <h3 className="text-base font-semibold">{project.name}</h3>
                    {project.description && (
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground sm:text-sm">
                        {project.description}
                      </p>
                    )}
                  </div>
                  {projectSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {projectSkills.map((skill) => (
                        <Badge key={skill.id} variant="outline">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="border-y border-border/70 py-6 text-sm text-muted-foreground">
          No projects published yet.
        </p>
      )}
    </section>
  );
}
