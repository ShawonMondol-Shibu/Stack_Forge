import ProfileHeader from "@/components/Shared/dashboard/profile/ProfileHeader";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React from "react";
import About from "./About";
import Repositories from "./Repositories";
import Projects from "./Projects";
import Activity from "./Activity";
import Achievements from "./Achievements";
import Notes from "./Notes";
import ProfileStats from "@/components/Shared/dashboard/profile/ProfileStats";
import ContributionActivity from "@/components/Shared/dashboard/profile/ContributionActivity";
import ProfileCompletion from "@/components/Shared/dashboard/profile/ProfileCompletion";
import QuickLinks from "@/components/Shared/dashboard/profile/QuickLinks";

const tabsContent = [
  { page: <About />, value: "about" },
  { page: <Repositories />, value: "repos" },
  { page: <Projects />, value: "projects" },
  { page: <Activity />, value: "activity" },
  { page: <Achievements />, value: "achievements" },
  { page: <Notes />, value: "notes" },
];


export default function Page() {

  return (
    <main
      className={
        "w-full max-w-7xl mx-auto space-y-4 grid grid-cols-1 lg:grid-cols-6 gap-6 items-start justify-between"
      }
    >
      <Tabs className={"gap-4 lg:col-span-4 mx-auto"}>
        <ProfileHeader />
        {tabsContent.map((content, i) => (
          <TabsContent key={i} value={content.value}>
            {content.page}
          </TabsContent>
        ))}
      </Tabs>
      <div className="w-full lg:col-span-2 space-y-4">
        <ProfileCompletion />
        <ProfileStats />
        <ContributionActivity />
        <QuickLinks/>
      </div>
    </main>
  );
}
