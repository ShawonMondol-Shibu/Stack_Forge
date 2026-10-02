"use client";
import React from "react";
import ProjectCard from "../project/ProjectCard";
import { useProjectStore } from "@/store/useProjectStore";
import Link from "next/link";
import { ArrowRight } from "@animateicons/react/lucide";

export default function FeaturedProjects() {
  const { projects } = useProjectStore();
  return (
    <section className={"w-full flex flex-col items-start justify-start gap-4"}>
      <span className="w-full flex items-center justify-between">
        <h2 className={"text-lg font-semibold"}>Featured Projects</h2>
        <Link
          href={""}
          className={"text-xs font-medium text-primary flex items-center gap-1"}
        >
          View all Projects <ArrowRight size={14} />{" "}
        </Link>
      </span>
      <div
        className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center md:items-start justify-center md:justify-start gap-4"
        }
      >
        {projects.slice(0, 4).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
