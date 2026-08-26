"use client";
import TaskCard from "@/components/Shared/dashboard/tasks/TaskCard";
import { ItemGroup } from "@/components/ui/item";
import { useTaskContext } from "@/context/TaskContext";
import { apiService } from "@/lib/api-routes/apis";
import { taskType } from "@/lib/types/task-type";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function MyTasks() {
 const {tasks}= useTaskContext()


  return (
    // MY Tasks...
    <section>
      <ItemGroup>
        {tasks?.map((task, i) => (
          <TaskCard key={i} data={task}/>
        ))}
      </ItemGroup>
    </section>
  );
}
