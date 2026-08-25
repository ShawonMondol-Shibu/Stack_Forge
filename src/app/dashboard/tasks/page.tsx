import CommonFilter from "@/components/Shared/dashboard/CommonFilter";
import TaskHeader from "@/components/Shared/dashboard/tasks/TaskHeader";
import TaskSummary from "@/components/Shared/dashboard/tasks/TaskSummery";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React from "react";
import MyTasks from "./MyTasks";
import Completed from "./Completed";
import Overdue from "./Overdue";

const techStack = [
  { label: "Next.JS", value: "next.js" },
  { label: "Nest.JS", value: "nest.js" },
  { label: "PostgreSQL", value: "postgresql" },
];

const tabsContent = [
  { page: MyTasks, label: "My Tasks" },
  { page: Completed, label: "Completed" },
  { page: Overdue, label: "Overdue" },
];

export default function Page() {
  return (
    <main className={"w-full container mx-auto grid lg:grid-cols-7 gap-6"}>
      <Tabs className={"lg:col-span-5 gap-6"}>
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

        <div>
          {tabsContent.map((content, i) => (
            <TabsContent key={i} value={content.label}>
              {content?.page && <content.page />}
            </TabsContent>
          ))}
        </div>
      </Tabs>

      <div className="col-span-2">
        <TaskSummary />
      </div>
    </main>
  );
}
