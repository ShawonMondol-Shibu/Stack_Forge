"use client"
import React from "react";
import { ItemGroup } from "@/components/ui/item";
import ProjectCard from "../../dashboard/project/ProjectCard";
// import { useProjectStore } from "@/store/useProjectStore";

export default function TrandingProjects() {
  // const { projects } = useProjectStore()
  return (
    <div className={"space-y-10 mt-20"}>
      <h2 className={"text-3xl font-bold border-l-4 border-primary px-4"}>Tranding Projects</h2>
      <ItemGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-center justify-start ">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProjectCard key={i} />
        ))}
      </ItemGroup>
    </div>
  );
}
