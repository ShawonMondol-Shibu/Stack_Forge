"use client";

import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "@/hooks/queries/use-projects";
import useTechStack from "@/hooks/queries/useTechStack";

export default function ProfileProjects({ id }: { id: string }) {
  const {
    data: allProjects = [],
    isPending,
    isError,
  } = useQuery(getAllProjects());
  const { data: techStacks = [] } = useTechStack();
  const projects = allProjects.filter((project) => project.userId === id);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Projects</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="flex min-h-20 items-center justify-center">
            <LoaderCircle className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <p role="alert" className="text-sm text-destructive">
            Could not load projects.
          </p>
        ) : projects.length ? (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {projects.map((project) => {
              const projectSkills = techStacks.filter((stack) =>
                project.techStack.includes(stack.id),
              );

              return (
                <li key={project.id}>
                  <article className="h-full overflow-hidden rounded-lg border bg-card">
                    <div className="relative aspect-video bg-muted">
                      <Image
                        src={project.image || "/brain.jpg"}
                        alt={`${project.name} project preview`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2 p-3">
                      <h3 className="font-semibold">{project.name}</h3>
                      {project.description && (
                        <CardDescription className="line-clamp-3">
                          {project.description}
                        </CardDescription>
                      )}
                      {projectSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {projectSkills.map((skill) => (
                            <Badge key={skill.id} variant="outline">
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No public projects listed.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
