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
import { toast } from "@/components/ui/toast";
import { apiService } from "@/lib/api-routes/apis";
import { ProjectType } from "@/lib/types/project-type";
import { useMutation } from "@tanstack/react-query";
import { Edit, Eye, Star } from "lucide-react";
import { MenuIcon, Trash } from "@animateicons/react/lucide";
import Image from "next/image";
import React from "react";
import { GoRepoForked } from "react-icons/go";

export default function ProjectCard({ project }: { project: ProjectType }) {
  const { techStack } = project;
  const arr = JSON.stringify(techStack).replace("{", "[").replace("}", "]");
  const stacks = JSON.parse(JSON.parse(arr));
  console.log(arr[2]);

  const mutation = useMutation({
    mutationFn: (id:string) => apiService({endpoint:`/projects/${id}`, method: "DELETE"}),
    onSuccess: (data: { message: string }) => {
      toast.add({
        title: data.message,
      });
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };
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
        <Popover>
          <PopoverTrigger
            render={<Button size={"icon-sm"} />}
            className={"absolute top-4 right-4"}
          >
            {" "}
            <MenuIcon />{" "}
          </PopoverTrigger>
          <PopoverContent align="end" className={"p-2 w-fit gap-2"}>
            <Button variant={"outline"} size={"sm"}>
              {" "}
              <Edit /> edit
            </Button>
            <Button
              variant={"destructive"}
              size={"sm"}
              onClick={() => handleDelete(project.id)}
            >
              <Trash/>
              delelet
            </Button>
          </PopoverContent>
        </Popover>
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
