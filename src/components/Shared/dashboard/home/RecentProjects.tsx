"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { FolderOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useProjectContext } from "@/context/ProjectContext";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/lib/api-routes/apis";
import { TechStackItem } from "@/lib/types/techStack-type";

export default function RecentProjects() {
  const { projects } = useProjectContext();
  const { data: techStacks = [] } = useQuery({
    queryKey: ["techstacks"],
    queryFn: () =>
      apiService<{ data: TechStackItem[] }>({
        endpoint: "/tech-stack",
      }),
    select: (res) => res.data,
  });

  return (
    <Card size={"sm"} className={"w-full gap-1"}>
      <CardHeader>
        <CardTitle className="text-xl">Recent Projects</CardTitle>
        <CardAction>
          <Button
            variant={"link"}
            size={"xs"}
            render={<Link href={"/dashboard/projects"} />}
          >
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-0.5!">
          {projects.slice(0, 3).map((project, i) => {
            const projectTechStacks = techStacks.filter((stack) =>
              project.techStack.includes(stack.id),
            );
            return (
              <div key={i} className="border-b">
                <Item variant={"default"} size={"xs"} className="p-0 pb-1">
                  <ItemMedia>
                    {project?.image ? (
                      <Image
                        src={project?.image || ""}
                        alt={project.name}
                        width={60}
                        height={60}
                        className="rounded"
                      />
                    ) : (
                      <FolderOpen />
                    )}
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="text-xs">{project.name}</ItemTitle>
                    <ItemDescription className="text-xs">
                      {project.description}
                    </ItemDescription>

                    <div className="flex flex-wrap flex-row items-center line-clamp-1">
                      {projectTechStacks.length > 0 ? (
                        projectTechStacks.map((stack) => (
                          <Badge
                            key={stack.id}
                            variant="outline"
                            className="gap-2 p-1 text-muted-foreground "
                          >
                            {stack?.image && (
                              <Image
                                src={stack?.image}
                                alt={stack.name}
                                width={12}
                                height={12}
                              />
                            )}
                            <small>{stack.name}</small>
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          No tech stack
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center justify-between">
                      <span>Updated 2h ago</span>
                      <span className="flex items-center gap-1 ">
                        <Star size={10} /> 232
                      </span>
                    </div>
                  </ItemContent>
                </Item>
              </div>
            );
          })}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
