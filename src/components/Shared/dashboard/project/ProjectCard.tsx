"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Project as ProjectType } from "@/lib/types/project-type";
import { Edit, Eye, Star } from "lucide-react";
import { LoaderIcon, MenuIcon, Trash } from "@animateicons/react/lucide";
import Image from "next/image";
import React from "react";
import { GoRepoForked } from "react-icons/go";
import { useDeleteProject } from "@/hooks/mutations/use-project-mutation";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/lib/api-routes/apis";
import { TechStackItem } from "@/lib/types/techStack-type";

export default function ProjectCard({ project }: { project: ProjectType }) {
  const { mutate, isPending } = useDeleteProject();

  const { data: techStacks = [] } = useQuery({
    queryKey: ["techstacks"],
    queryFn: () =>
      apiService<{ data: TechStackItem[] }>({
        endpoint: "/tech-stack",
      }),
    select: (res) => res.data,
  });

  const projectTechStacks = techStacks.filter((stack) =>
    project.techStack.includes(stack.id),
  );

  const handleDelete = (id: string) => {
    mutate(id);
  };

  return (
    <Card className="w-full pt-0">
      <div className="relative">
        <Image
          src={project.image || "/brain.jpg"}
          alt={project.name}
          width={300}
          height={200}
          className="w-full object-cover"
        />

        <Popover>
          <PopoverTrigger
            render={<Button size="icon-sm" />}
            className="absolute top-4 right-4"
          >
            <MenuIcon />
          </PopoverTrigger>

          <PopoverContent align="end" className="p-2 w-fit gap-2">
            <Button variant="outline" size="sm">
              <Edit />
              edit
            </Button>

            <Button
              variant="destructive"
              size="sm"
              disabled={isPending}
              onClick={() => handleDelete(project.id)}
            >
              {isPending ? (
                <LoaderIcon />
              ) : (
                <>
                  <Trash />
                  delete
                </>
              )}
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <CardContent>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {projectTechStacks.length > 0 ? (
            projectTechStacks.map((stack) => (
              <Badge key={stack.id} variant="outline" className="gap-2">
                {stack?.image && (
                  <Image
                    src={stack?.image}
                    alt={stack.name}
                    width={12}
                    height={12}
                  />
                )}
                {stack.name}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">No tech stack</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="gap-4 text-[10px] justify-between">
        <div className="flex items-center gap-2">
          <Star size={12} /> 202
        </div>
        <div className="flex items-center gap-2">
          <GoRepoForked /> 48
        </div>
        <div className="flex items-center gap-2">
          <Eye size={12} /> 612
        </div>

        <span>Updated 2d ago</span>
      </CardFooter>
    </Card>
  );
}
