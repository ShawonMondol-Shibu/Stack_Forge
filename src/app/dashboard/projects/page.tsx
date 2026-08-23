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
import TopTechnologies from "@/components/Shared/dashboard/project/TopTechnologies";
import NewProject from "@/components/Shared/dashboard/project/NewProject";
import CommonFilter from "@/components/Shared/dashboard/CommonFilter";

 const items = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
  ];
  const techStack = [
    { label: "Next.JS", value: "next.js" },
    { label: "Nest.JS", value: "nest.js" },
    { label: "PostgreSQL", value: "postgresql" },
  ];

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
        "w-full container mx-auto grid grid-cols-1 lg:grid-cols-7 gap-6 items-start"
      }
    >
      <Tabs className={"lg:col-span-5 gap-6"}>
        <ProjectHeader />
        <CommonFilter searchPlaceholder="Search projects..." selectPlaceholder="Tech Stack" selectPlaceholder_2="Status" sortPlaceholder="Sort: Recently Updated" selectItems={techStack} selectItems2={items} sortitems={items} />
        {contentsData.map((content, i) => (
          <TabsContent key={i} value={content.value}>
            {" "}
            {content.page}{" "}
          </TabsContent>
        ))}

        <div>
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
        </div>
      </Tabs>

      <div className="lg:col-span-2 space-y-6 lg:top-6 lg:sticky">
        <ProjectOverview />
        <TopTechnologies />
        <NewProject />
      </div>
    </main>
  );
}
