"use client";
/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import AddTasks from "./AddTasks";
import {
  FolderOpenIcon,
  LayoutGridIcon,
  ListIcon,
} from "@animateicons/react/lucide";
import { useTaskStore } from "@/store/TaskStore";

export default function TaskHeader() {
  const { tasks, completedTasks } = useTaskStore();
  const triggersData = [
    { label: "My Tasks", value: "mytasks", count: tasks.length },
    { label: "Completed", value: "completed", count: completedTasks.length },
    { label: "Over Due", value: "overdue", count: 0 },
  ];
  return (
    <header className="space-y-4 w-full border-b">
      <div className="flex items-center justify-between">
        <div className={"flex items-center gap-2 text-3xl font-bold"}>
          <span className={"px-2 pt-2 bg-primary/20 rounded-md text-primary"}>
            <FolderOpenIcon size={30} />
          </span>
          <h1>Tasks</h1>
        </div>

        <div className="flex items-center gap-6">
          <ButtonGroup>
            <Button variant={"default"} size={"icon-sm"}>
              <LayoutGridIcon />{" "}
            </Button>
            <Button variant={"outline"} size={"icon-sm"}>
              <ListIcon />{" "}
            </Button>
          </ButtonGroup>
          <AddTasks />
        </div>
      </div>

      <div>
        <p className="text-base text-muted-foreground">
          Organize your work and get things done.
        </p>
      </div>

      <TabsList variant={"line"}>
        {triggersData.map((trigger, i) => (
          <TabsTrigger key={i} value={trigger.value}>
            {trigger.label}
            <Button variant={"outline"} size={"icon-xs"}>
              {" "}
              <small>{trigger?.count}</small>
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>
    </header>
  );
}
