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
import MotionDiv from "../../MotionDiv";
import { queryKeys } from "@/lib/Query-keys";
import { usePathname } from "next/navigation";

export default function ProjectCard({ project }: { project?: ProjectType }) {
  const { mutate, isPending } = useDeleteProject();
  const pathName = usePathname();

  const { data: techStacks = [] } = useQuery({
    queryKey: queryKeys.techStacks.all,
    queryFn: () =>
      apiService<{ data: TechStackItem[] }>({
        endpoint: "/tech-stack",
      }),
    select: (res) => res.data,
  });

  const projectTechStacks = techStacks.filter((stack) =>
    project?.techStack.includes(stack.id),
  );

  const handleDelete = (id: string) => {
    mutate(id);
  };

  return (
    <Card className="w-full pt-0">
      <MotionDiv>
        <div className="relative">
          <Image
            src={project?.image || "/brain.jpg"}
            alt={project?.name || "project_image"}
            width={300}
            height={200}
            className="w-full object-cover"
          />
          {pathName === "/dashboard/projects" ? (
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
                  onClick={() => handleDelete(project?.id as string)}
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
          ) : null}
        </div>

        <CardContent className="p-2">
          <CardTitle>{project?.name || "Project Name"}</CardTitle>
          <CardDescription className="line-clamp-2">
            {project?.description || "Project Description"}
          </CardDescription>

          <div className="mt-2 flex flex-wrap items-center gap-0.5 line-clamp-2 h-12">
            {projectTechStacks.length > 0 ? (
              projectTechStacks.map((stack) => (
                <Badge key={stack.id} variant="outline" className="gap-0.5 p-1">
                  {stack?.image && (
                    <span className="w-4 h-4">
                      <Image
                        src={stack?.image}
                        alt={stack.name}
                        width={12}
                        height={12}
                        className="w-full object-cover aspect-square"
                      />
                    </span>
                  )}
                  <span>{stack.name}</span>
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">
                No tech stack
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2">
          <div className="flex gap-4 text-[10px] justify-between">
            {pathName === "/dashboard/projects" ? (
              <>
                <div className="flex items-center gap-2">
                  <Star size={12} /> 202
                </div>
                <div className="flex items-center gap-2">
                  <GoRepoForked /> 48
                </div>

                <div className="flex items-center gap-2">
                  <Eye size={12} /> 612
                </div>

                <span className="line-clamp-1">
                  Updated {project?.updatedAt}
                </span>
              </>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-2 items-center justify-between">
            <Button variant={"outline"} size={"sm"}>
              View Project
            </Button>
            <Button
              variant={"outline"}
              size={"sm"}
              className={"text-primary border-primary"}
            >
              View Code
            </Button>
          </div>
        </CardFooter>
      </MotionDiv>
    </Card>
  );
}
