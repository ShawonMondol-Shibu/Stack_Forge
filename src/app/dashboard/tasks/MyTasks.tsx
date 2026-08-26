"use client";
import TaskCard from "@/components/Shared/dashboard/tasks/TaskCard";
import { ItemGroup } from "@/components/ui/item";
import { useTaskContext } from "@/context/TaskContext";
import React from "react";

export default function MyTasks() {
 const {todoTasks}= useTaskContext()


  return (
    // MY Tasks...
    <section>
      <ItemGroup>
        {todoTasks?.map((task, i) => (
          <TaskCard key={i} data={task}/>
        ))}
      </ItemGroup>
    </section>
  );
}
