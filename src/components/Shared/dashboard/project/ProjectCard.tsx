"use client";

import React, { memo, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Edit, Star } from "lucide-react";
import {
  LoaderIcon,
  MenuIcon,
  Pin,
  PinOff,
  Trash,
} from "@animateicons/react/lucide";
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
import {
  useDeleteProject,
  useUpdateProject,
} from "@/hooks/mutations/use-project-mutation";
import useTechStack from "@/hooks/queries/useTechStack";
import { cn } from "@/lib/utils";
import MotionDiv from "../../MotionDiv";
import EditProjectDialog from "./EditProjectDialog"; // path adjust koro

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

// "github.com/x" likhleo kaj kore, ar link na thakle null (button disabled hoy)
const toExternalUrl = (value?: string | null) => {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

type ProjectCardProps = {
  project?: ProjectType;
  /** Edit/delete/pin dekhabe kina. Na dile path (/dashboard/projects) dekhe thik hoy. */
  isOwner?: boolean;
  /** Dile like button dekhabe. Parent session check ar mutation handle kore. */
  onToggleLike?: (project: ProjectType) => void;
};

function ProjectCard({ project, isOwner, onToggleLike }: ProjectCardProps) {
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const { mutate: updateProject, isPending: isPinning } = useUpdateProject();
  const pathName = usePathname();
  const isOwnerView = isOwner ?? pathName === "/dashboard/projects";

  // Popover ar Dialog alada state: Dialog popover er bahire, nahole popover
  // bondho holei dialog unmount hoye jeto
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const { data: techStacks } = useTechStack();

  const projectTechStacks = useMemo(() => {
    const ids = new Set(project?.techStack ?? []);
    return (techStacks ?? []).filter((stack) => ids.has(stack.id));
  }, [techStacks, project?.techStack]);

  const totalLikes = project?.totalLikes;
  const recentLikes = project?.recentLikes ?? 0;
  const liked = Boolean(project?.likedByMe);
  const author = project?.author;
  const updatedAt = formatDate(project?.updatedAt);
  const liveUrl = toExternalUrl(project?.liveLink);
  const githubUrl = toExternalUrl(project?.githubLink);

  const handlePin = () => {
    if (!project?.id) return;
    updateProject({ id: project.id, data: { pin: !project.pin } });
  };

  const handleEdit = () => {
    setMenuOpen(false);
    setEditOpen(true);
  };

  return (
    <Card className="w-full pt-0">
      <MotionDiv>
        <div className="relative">
          {isOwnerView ? (
            <Button
              variant="secondary"
              size="icon-sm"
              className="absolute top-4 left-4 z-10"
              onClick={handlePin}
              disabled={isPinning || !project?.id}
              aria-label={project?.pin ? "Unpin project" : "Pin project"}
            >
              {project?.pin ? (
                <PinOff size={16} />
              ) : (
                <Pin size={16} className="text-muted-foreground" />
              )}
            </Button>
          ) : null}

          <Image
            src={project?.image || "/brain.jpg"}
            alt={project?.name || "project_image"}
            width={300}
            height={200}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
            className="h-44 w-full object-cover"
          />

          {isOwnerView ? (
            <Popover open={menuOpen} onOpenChange={setMenuOpen}>
              <PopoverTrigger
                render={<Button size="icon-sm" />}
                className="absolute top-4 right-4"
              >
                <MenuIcon />
              </PopoverTrigger>

              <PopoverContent align="end" className="p-2 w-fit gap-2">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit />
                  edit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isDeleting || !project?.id}
                  onClick={() => project?.id && deleteProject(project.id)}
                >
                  {isDeleting ? (
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
                <AvatarImage
                  src={author.image || "/default-avatar.png"}
                  alt=""
                />
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
          {totalLikes !== undefined || (isOwnerView && updatedAt) ? (
            <div className="flex w-full flex-wrap items-center justify-between gap-2 text-[10px] text-muted-foreground">
              {totalLikes !== undefined ? (
                <div className="flex items-center gap-1">
                  {onToggleLike && project ? (
                    <button
                      type="button"
                      onClick={() => onToggleLike(project)}
                      aria-pressed={liked}
                      aria-label={liked ? "Unlike project" : "Like project"}
                      className="rounded-full p-1 transition-colors hover:bg-accent focus-visible:outline-2"
                    >
                      <Star
                        size={14}
                        className={cn(liked && "fill-primary text-primary")}
                      />
                    </button>
                  ) : (
                    <Star size={12} />
                  )}
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
            {liveUrl ? (
              <Button
                variant="outline"
                size="sm"
                render={
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer" />
                }
              >
                View Project
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                View Project
              </Button>
            )}
            {githubUrl ? (
              <Button
                variant="outline"
                size="sm"
                className="text-primary border-primary"
                render={
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                View Code
              </Button>
            ) : (
              <Button variant="outline" size="sm" disabled>
                View Code
              </Button>
            )}
          </div>
        </CardFooter>
      </MotionDiv>

      {/* Shudhu owner er jonno, ar open na hole content mount-i hoy na */}
      {isOwnerView && project ? (
        <EditProjectDialog
          project={project}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      ) : null}
    </Card>
  );
}

export default memo(ProjectCard);