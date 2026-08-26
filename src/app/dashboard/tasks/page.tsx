import CommonFilter from "@/components/Shared/dashboard/CommonFilter";
import TaskHeader from "@/components/Shared/dashboard/tasks/TaskHeader";
import TaskSummary from "@/components/Shared/dashboard/tasks/TaskSummery";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React from "react";
import MyTasks from "./MyTasks";
import Completed from "./Completed";
import Overdue from "./Overdue";
import StayProductive from "@/components/Shared/dashboard/tasks/StayProductive";

const techStack = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const tabsContent = [
  { page: MyTasks, label: "mytasks" },
  { page: Completed, label: "completed" },
  { page: Overdue, label: "overdue" },
];

export default function Page() {
  return (
    <main className={"w-full container mx-auto grid lg:grid-cols-7 gap-6"}>
      <Tabs className={"lg:col-span-5 gap-6"}>
        <TaskHeader />
        <CommonFilter
          searchPlaceholder="Search Tasks"
          // selectPlaceholder="All Projects"
          selectPlaceholder_2="All Priorities"
          sortPlaceholder="Sort: Due Date"
          // selectItems={techStack}
          selectItems2={techStack}
          sortitems={techStack}
        />

          {tabsContent.map((content, i) => (
            <TabsContent key={i} value={content.label}>
              {content?.page && <content.page />}
            </TabsContent>
          ))}
      </Tabs>

      <div className="lg:col-span-2 space-y-4">
        <TaskSummary />
        <StayProductive/>
      </div>
    </main>
  );
}
