"use client";
import React from "react";
import {
  CalendarDays,
  CheckCircle,
  FolderCode,
  NotebookPen,
  PencilLine,
} from "lucide-react";
import QuickActionItem from "./QuickActionItem";
import { ItemGroup } from "@/components/ui/item";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProjectForm from "../project/ProjectForm";
import TaskForm from "../tasks/TaskForm";

export default function QuickActions() {
  const actionData = [
    {
      title: "New Project",
      subtitle: "start something new",
      color: "primary",
      icon: FolderCode,
      content: <ProjectForm/>
    },
    {
      title: "New Task",
      subtitle: "Add a new task",
      color: "green-500",
      icon: CheckCircle,
      content: <TaskForm/>
    },
    {
      title: "New Note",
      subtitle: "Write something",
      color: "amber-500",
      icon: NotebookPen,
      content: null
    },
    {
      title: "New Event",
      subtitle: "Add to calender",
      color: "primary",
      icon: CalendarDays,
      content: null
    },
    {
      title: "Create Post",
      subtitle: "Share with community",
      color: "amber-500",
      icon: PencilLine,
      content: null
    },
  ];
  return (
    <section className="space-y-1">
      <h1 className="text-xl font-bold">Quick Actions</h1>
      <ItemGroup
        className={"grid grid-cols-5 items-center justify-center gap-4"}
      >
        {actionData.map((data, i) => (
          <Dialog key={i}>
            <DialogTrigger>
              <QuickActionItem key={i} data={data} />
            </DialogTrigger>
            <DialogContent>
              {data?.content || "Upcomeing very soon..."}
            </DialogContent>
          </Dialog>
        ))}
      </ItemGroup>
    </section>
  );
}
