import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { ProjectType } from "@/lib/types/project-type";
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { GoRepoForked } from "react-icons/go";

export default function ProjectCard({ project }: { project: ProjectType }) {
  const { techStack } = project;
  const arr = JSON.stringify(techStack).replace("{", "[").replace("}", "]");
  const stacks = JSON.parse(JSON.parse(arr));
  console.log(arr[2]);
  return (
    <Card className={"w-full pt-0"}>
      <div>
        <Image
          src={project.image || "/brain.jpg"}
          alt={"project_image"}
          width={300}
          height={200}
          className={"w-full object-cover"}
        />
      </div>
      <CardContent>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription className={"line-clamp-2"}>
          {project?.description}
        </CardDescription>

        <div className="line-clamp-1 flex items-center gap-1">
          {stacks.map((stack: string) => (
            <Badge key={stack} variant={"outline"}>
              {stack}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className={"gap-4 text-[10px] justify-between"}>
        <div className={"flex items-center gap-2"}>
          <Star size={12} /> {202}
        </div>
        <div className={"flex items-center gap-2"}>
          <GoRepoForked /> {48}
        </div>
        <div className={"flex items-center gap-2"}>
          <Eye size={12} /> {612}
        </div>

        <span>Updated 2d ago</span>
      </CardFooter>
    </Card>
  );
}
