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
import AddProject from "./AddProject";

export default function ProjectHeader() {
  const triggersData = [
    { label: "All Projects", value: "allProjects" },
    { label: "Personal", value: "personal" },
    { label: "Collaborative", value: "collaborative" },
    { label: "Open Sourse", value: "openSourse" },
    { label: "Archived", value: "archived" },
  ];
  return (
    <header className="space-y-4 w-full border-b">
      <div className="flex items-center justify-between">
        <div className={"flex items-center gap-2 text-3xl font-bold"}>
          <span className={"p-2 bg-primary/20 rounded-md text-primary"}>
            <FolderOpen size={30} />
          </span>
          <h1>Projects</h1>
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

          <AddProject/>
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold">Build. Ship. Improve. Repeat.</h3>
        <p className="text-base text-muted-foreground">
          All the project you've built, collaborated on, or contributed to.{" "}
          <br /> Track progress, manage deployments, and showcase your work{" "}
        </p>
      </div>

      <TabsList variant={"line"}>
        {triggersData.map((trigger, i) => (
          <TabsTrigger key={i} value={trigger.value}>
            {trigger.label}
            <Button variant={"outline"} size={"icon-xs"}>
              {" "}
              <small>{i}</small>
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>
    </header>
  );
}
