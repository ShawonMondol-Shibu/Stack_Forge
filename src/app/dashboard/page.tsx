import ContinueWorking from "@/components/Shared/dashboard/home/ContinueWorking";
import Feed from "@/components/Shared/dashboard/home/Feed";
import GithubActivitiy from "@/components/Shared/dashboard/github/GithubActivitiy";
import Greetings from "@/components/Shared/dashboard/home/Greetings";
import Messages from "@/components/Shared/dashboard/home/Messages";
import NextUp from "@/components/Shared/dashboard/home/NextUp";
import Overview from "@/components/Shared/dashboard/home/Overview";
import PortfolioCard from "@/components/Shared/dashboard/portfolio/PortfolioCard";
import QuickActions from "@/components/Shared/dashboard/home/QuickActions";
import RecentNotes from "@/components/Shared/dashboard/home/RecentNotes";
import RecentProjects from "@/components/Shared/dashboard/home/RecentProjects";
import TodaysTask from "@/components/Shared/dashboard/tasks/TodaysTask";
import WeeklyProductivity from "@/components/Shared/dashboard/WeeklyProductivity";
import React from "react";

export default function Page() {
  return (
    <main className="space-y-6 ">
      <div className={"flex items-start gap-6 justify-center"}>
        <div className="space-y-4">
          <Greetings />
          <QuickActions />
          <Overview />
          <div className="grid grid-cols-2 items-start gap-4">
            <GithubActivitiy />
            <TodaysTask />
          </div>

          <div className="flex flex-wrap items-start justify-start gap-4">
            <RecentNotes />
            <RecentProjects />
            <ContinueWorking />
            <Feed />
          </div>
          
        </div>

        <aside className={"grid gap-4"}>
          <PortfolioCard />
          <WeeklyProductivity />
          <NextUp />
          <Messages />
        </aside>
      </div>
    </main>
  );
}
