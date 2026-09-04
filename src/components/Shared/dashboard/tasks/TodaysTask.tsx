'use client'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Todo from "./Todo";
import InProgress from "./InProgress";
import Done from "./Done";
import AddTasks from "./AddTasks";
import { useTaskStore } from "@/store/TaskStore";

export default function TodaysTask() {
  const { completedTasks, inProgressTasks, todoTasks } = useTaskStore();
  return (
    <Card size={"sm"} className={"w-full min-h-60 gap-1"}>
      <CardHeader>
        <CardTitle className="text-xl">Today&apos;s Tasks</CardTitle>
        <CardAction>
          <AddTasks variant={"ghost"} size={'xs'}/>
        </CardAction>
      </CardHeader>
      <CardContent className={"grid grid-cols-3 "}>
        <Todo data={todoTasks} />
        <InProgress data={inProgressTasks} />
        <Done data={completedTasks} />
      </CardContent>
    </Card>
  );
}
