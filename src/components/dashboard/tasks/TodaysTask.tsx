import { Button } from "@/components/ui/button";
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

export default function TodaysTask() {
  return (
    <Card size={"sm"} className={"w-full"}>
      <CardHeader>
        <CardTitle>Today&apos;s Tasks</CardTitle>
        <CardAction>
          <Button variant={"ghost"} size={"xs"} className={"text-primary"}>
            + Add Task
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className={"grid grid-cols-3 "}>
        <Todo />
        <InProgress />
        <Done />
      </CardContent>
    </Card>
  );
}
