'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskStore } from "@/store/TaskStore";
import {
  CircleCheckIcon,
  ClockIcon,
  ShoppingBagIcon,
  CalendarIcon,
} from "@animateicons/react/lucide";
import React from "react";


export default function TaskSummary() {
  const {tasks, completedTasks, inProgressTasks}= useTaskStore()
  const summaryData = [
    { icon: ShoppingBagIcon, title: "Total Tasks", value: tasks.length },
    { icon: CircleCheckIcon, title: "Completed", value: completedTasks.length },
    { icon: ClockIcon, title: "Overdue", value: inProgressTasks.length },
    { icon: CalendarIcon, title: "This Week", value: tasks.length },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {summaryData.map((summary, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-primary/10 p-4 w-full rounded-xl "
          >
            <summary.icon size={30} className={"text-primary"} />
            <div className="flex flex-col">
              <span className="text-lg text-primary font-semibold">
                {summary.value}
              </span>
              <span className="capitalize text-xs">{summary.title}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
