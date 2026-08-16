import ProjectFilter from "@/components/Shared/dashboard/project/ProjectFilter";
import ProjectHeader from "@/components/Shared/dashboard/project/ProjectHeader";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React from "react";
import AllProjects from "./AllProjects";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProjectOverview from "@/components/Shared/dashboard/project/ProjectOverview";

export default function Page() {
  const contentsData = [
    { page: <AllProjects />, value: "allProjects" },
    { page: "Personal", value: "personal" },
    { page: "Collaborative", value: "collaborative" },
    { page: "Open Sourse", value: "openSourse" },
    { page: "Archived", value: "archived" },
  ];
  return (
    <main
      className={
        "w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-7 gap-4 items-start"
      }
    >
      <Tabs className={"lg:col-span-5 gap-6"}>
        <ProjectHeader />
        <ProjectFilter />
        {contentsData.map((content, i) => (
          <TabsContent key={i} value={content.value}>
            {" "}
            {content.page}{" "}
          </TabsContent>
        ))}

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Tabs>

      <div className="lg:col-span-2">

        <ProjectOverview/>
      </div>
    </main>
  );
}
