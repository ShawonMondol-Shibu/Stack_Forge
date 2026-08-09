import ContinueWorking from "@/components/dashboard/ContinueWorking";
import Feed from "@/components/dashboard/Feed";
import GithubActivitiy from "@/components/dashboard/github/GithubActivitiy";
import Greetings from "@/components/dashboard/Greetings";
import Messages from "@/components/dashboard/Messages";
import NextUp from "@/components/dashboard/NextUp";
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
