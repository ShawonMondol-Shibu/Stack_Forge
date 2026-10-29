"use client";

import React, { memo, useMemo } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Edit, Star } from "lucide-react";
import { LoaderIcon, MenuIcon, Trash } from "@animateicons/react/lucide";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useDeleteProject } from "@/hooks/mutations/use-project-mutation";
import useTechStack from "@/hooks/queries/useTechStack";
import MotionDiv from "../../MotionDiv";

// Module level e ekbar-i banano hoy
const compactNumber = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

const formatDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : dateFormatter.format(date);
};

function ProjectCard({ project }: { project?: ProjectType }) {
  const { mutate, isPending } = useDeleteProject();
  const pathName = usePathname();
  const isOwnerView = pathName === "/dashboard/projects";

  // Tech stack list shob card e same, tai ekta shared hook (ekbar-i request, cache shared)
  const { data: techStacks } = useTechStack();

  const projectTechStacks = useMemo(() => {
    const ids = new Set(project?.techStack ?? []);
    return (techStacks ?? []).filter((stack) => ids.has(stack.id));
  }, [techStacks, project?.techStack]);

  // Trending API theke ashe; dashboard er normal list e na-o thakte pare
  const totalLikes = project?.totalLikes;
  const recentLikes = project?.recentLikes ?? 0;
  const author = project?.author;
  const updatedAt = formatDate(project?.updatedAt);

  return (
    <Card className="w-full pt-0">
      <MotionDiv>
        <div className="relative">
          <Image
            src={project?.image || "/brain.jpg"}
            alt={project?.name || "project_image"}
            width={300}
            height={200}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
            className="h-44 w-full object-cover"
          />
          {isOwnerView ? (
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
                  disabled={isPending || !project?.id}
                  onClick={() => project?.id && mutate(project.id)}
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
          {author ? (
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Avatar size="sm">
                <AvatarImage src={author.image || "/default-avatar.png"} alt="" />
                <AvatarFallback>
                  {author.name?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
              <span className="truncate capitalize">{author.name}</span>
            </div>
          ) : null}

          <CardTitle>{project?.name || "Project Name"}</CardTitle>
          <CardDescription className="line-clamp-2">
            {project?.description || "Project Description"}
          </CardDescription>

          <div className="mt-2 flex h-12 flex-wrap items-center gap-0.5 overflow-hidden">
            {projectTechStacks.length > 0 ? (
              projectTechStacks.map((stack) => (
                <Badge key={stack.id} variant="outline" className="gap-0.5 p-1">
                  {stack.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={stack.image}
                      alt={stack.name}
                      width={12}
                      height={12}
                      loading="lazy"
                      decoding="async"
                      className="size-3 object-cover"
                    />
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
          {/* Fake number (202/48/612) soriye real data dekhano hoyeche */}
          {totalLikes !== undefined || updatedAt ? (
            <div className="flex w-full flex-wrap items-center justify-between gap-2 text-[10px] text-muted-foreground">
              {totalLikes !== undefined ? (
                <div className="flex items-center gap-1">
                  <Star size={12} />
                  <span>{compactNumber.format(totalLikes)}</span>
                  {recentLikes > 0 ? (
                    <span className="text-primary">
                      +{compactNumber.format(recentLikes)} this week
                    </span>
                  ) : null}
                </div>
              ) : (
                <span />
              )}
              {isOwnerView && updatedAt ? (
                <span className="line-clamp-1">Updated {updatedAt}</span>
              ) : null}
            </div>
          ) : null}

          <div className="grid grid-cols-2 gap-2 items-center justify-between">
            <Button variant="outline" size="sm">
              View Project
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-primary border-primary"
            >
              View Code
            </Button>
          </div>
        </CardFooter>
      </MotionDiv>
    </Card>
  );
}

export default memo(ProjectCard);