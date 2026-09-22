import React from "react";
import ProjectCard from "@/components/Shared/website/ProjectCard";
import { ItemGroup } from "@/components/ui/item";

export default function TrandingProjects() {
  return (
    <div className={"space-y-10 mt-20"}>
      <h2 className={"text-3xl font-bold border-l-4 border-primary px-4"}>Tranding Projects</h2>
      <ItemGroup className="grid grid-cols-4 gap-6 items-center justify-start ">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProjectCard key={i} />
        ))}
      </ItemGroup>
    </div>
  );
}
