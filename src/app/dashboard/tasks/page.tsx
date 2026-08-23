import CommonFilter from "@/components/Shared/dashboard/CommonFilter";
import TaskHeader from "@/components/Shared/dashboard/tasks/TaskHeader";
import TaskSummary from "@/components/Shared/dashboard/tasks/TaskSummery";
import { Tabs } from "@/components/ui/tabs";
import React from "react";

const techStack = [
  { label: "Next.JS", value: "next.js" },
  { label: "Nest.JS", value: "nest.js" },
  { label: "PostgreSQL", value: "postgresql" },
];

export default function Page() {
  return (
    <main className={"w-full container mx-auto grid lg:grid-cols-7 gap-6"}>
      <Tabs className={"lg:col-span-5"}>
        <TaskHeader />
        <CommonFilter
          searchPlaceholder="Search Tasks"
          selectPlaceholder="All Projects"
          selectPlaceholder_2="All Priorities"
          sortPlaceholder="Sort: Due Date"
          selectItems={techStack}
          selectItems2={techStack}
          sortitems={techStack}
        />
      </Tabs>

      <div className="col-span-2">
        <TaskSummary/>
      </div>
    </main>
  );
}
