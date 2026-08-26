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
import { useTaskContext } from "@/context/TaskContext";

export default function TodaysTask() {
  const {todoTasks, inProgressTasks, completedTasks} = useTaskContext()
  return (
    <Card size={"sm"} className={"w-full gap-1"}>
      <CardHeader>
        <CardTitle className="text-xl">Today&apos;s Tasks</CardTitle>
        <CardAction>
          <AddTasks variant={"ghost"} size={'xs'}/>
        </CardAction>
      </CardHeader>
      <CardContent className={"grid grid-cols-3 "}>
        <Todo data={todoTasks}/>
        <InProgress data={inProgressTasks} />
        <Done data={completedTasks} />
      </CardContent>
    </Card>
  );
}
