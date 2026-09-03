"use client";
import React from "react";
import {
  CheckCircle,
  Eye,
  FolderOpen,
  SquareCheckBig,
  UsersRound,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { ItemGroup } from "@/components/ui/item";
import OverviewItem from "../home/OverviewItem";
import { useProjectStore } from "@/store/useProjectStore";
import { useTaskStore } from "@/store/TaskStore";

export default function Overview() {
  const {projects}= useProjectStore()
  const {tasks, completedTasks} = useTaskStore()
  const overViewData = [
    { name: "Projects", total: projects.length, icon: FolderOpen },
    { name: "Repositories", total: 18, icon: FaGithub },
    { name: "Tasks", total: tasks.length, icon: CheckCircle },
    { name: "Portfolio Views", total: 1200, icon: Eye },
    { name: "Followers", total: 128, icon: UsersRound },
    { name: "Completed Tasks", total: completedTasks.length, icon: SquareCheckBig },
  ];
  return (
    <section className={"space-y-1"}>
      <h1 className={"text-xl font-bold"}>Overview</h1>
      <ItemGroup className="grid grid-cols-6 gap-4!">
        {overViewData.map((data, i) => (
          <OverviewItem key={i} data={data} />
        ))}
      </ItemGroup>
    </section>
  );
}
