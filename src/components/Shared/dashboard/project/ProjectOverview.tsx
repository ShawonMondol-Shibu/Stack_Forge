"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjectContext } from "@/context/ProjectContext";
import React from "react";

export default function ProjectOverview() {
  const { projects } = useProjectContext();
  const totalProjects = projects.length;
  const overviewData = [
    { title: "total projects", value: totalProjects },
    { title: "live", value: totalProjects },
    { title: "in progress", value: totalProjects },
    { title: "achived", value: totalProjects },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={"flex items-center justify-between"}>
          {overviewData.map((overview, i) => (
            <div
              key={i}
              className={
                "flex flex-col items-start min-w-16 bg-primary/10 text-primary p-2 rounded-xl capitalize"
              }
            >
              <strong className={"text-base"}>{overview.value}</strong>
              <small>{overview.title}</small>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
