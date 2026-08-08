import GithubActivitiy from "@/components/dashboard/github/GithubActivitiy";
import Greetings from "@/components/dashboard/Greetings";
import Overview from "@/components/dashboard/Overview";
import PortfolioCard from "@/components/dashboard/portfolio/PortfolioCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentNotes from "@/components/dashboard/RecentNotes";
import RecentProjects from "@/components/dashboard/RecentProjects";
import TodaysTask from "@/components/dashboard/tasks/TodaysTask";
import WeeklyProductivity from "@/components/dashboard/WeeklyProductivity";
import React from "react";

export default function Page() {
  return (
    <main className="space-y-6 ">
      <div className={"flex items-start gap-6 justify-between"}>
        <div className="space-y-4">
          <Greetings/>
          <QuickActions />
          <Overview />
          <div className="grid grid-cols-2 items-start gap-4">
            <GithubActivitiy />
            <TodaysTask />
          </div>
        </div>
        <aside className={"grid gap-4"}>
          <PortfolioCard />
          <WeeklyProductivity/>
        </aside>
      </div>


      <div className="flex  items-start gap-4">
        <RecentNotes/>
        <RecentProjects/>
      </div>
    </main>
  );
}
