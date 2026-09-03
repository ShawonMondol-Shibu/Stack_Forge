"use client";
import TaskCard from "@/components/Shared/dashboard/tasks/TaskCard";
import { ItemGroup } from "@/components/ui/item";
import { useTaskStore } from "@/store/TaskStore";
import React from "react";

export default function MyTasks() {
  const { tasks } = useTaskStore();

  return (
    // MY Tasks...
    <section>
      <ItemGroup>
        {tasks?.map((task, i) => (
          <TaskCard key={i} data={task} />
        ))}
      </ItemGroup>
    </section>
  );
}
