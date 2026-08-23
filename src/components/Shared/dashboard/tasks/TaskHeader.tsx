'use client'
/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FolderOpen,
  LayoutGrid,
  List,
} from "lucide-react";
import React from "react";
import AddTasks from "./AddTasks";

export default function TaskHeader() {
  const triggersData = [
    { label: "My Tasks", value: "mytasks" },
    { label: "Completed", value: "completed" },
    { label: "Over Due", value: "overdue" },
  ];
  return (
    <header className="space-y-4 w-full border-b">
      <div className="flex items-center justify-between">
        <div className={"flex items-center gap-2 text-3xl font-bold"}>
          <span className={"p-2 bg-primary/20 rounded-md text-primary"}>
            <FolderOpen size={30} />
          </span>
          <h1>Tasks</h1>
        </div>

        <div className="flex items-center gap-6">
          <ButtonGroup>
            <Button variant={"default"} size={"icon-sm"}>
              <LayoutGrid />{" "}
            </Button>
            <Button variant={"outline"} size={"icon-sm"}>
              <List />{" "}
            </Button>
          </ButtonGroup>
<AddTasks/>
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
              <small>{0}</small>
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>


    </header>
  );
}
