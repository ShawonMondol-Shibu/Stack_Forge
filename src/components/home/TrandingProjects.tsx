import React from "react";
import ProjectCard from "../ProjectCard";
import { ItemGroup } from "../ui/item";

export default function TrandingProjects() {
  return (
    <div className={"space-y-10 mt-20"}>
      <h2 className={"text-2xl font-bold"}>Tranding Projects</h2>
      <ItemGroup className="grid grid-cols-4 gap-4 items-center justify-start ">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProjectCard key={i} />
        ))}
      </ItemGroup>
    </div>
  );
}
