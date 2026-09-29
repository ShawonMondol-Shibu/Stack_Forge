"use client";
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

import { InitialLoad } from "@/lib/initialLoad";

export default function Page() {
  InitialLoad();
  return (
    <main className="space-y-6 w-full container mx-auto ">
      <div
        className={
          "grid md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-12 items-start gap-6"
        }
      >
        <section className="md:col-span-4 lg:col-span-7 xl:col-span-9 space-y-4 w-full">
          <Greetings />
          <QuickActions />
          <Overview />
          <div className="grid xl:grid-cols-2 items-start gap-4">
            <GithubActivitiy />
            <TodaysTask />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 items-start justify-start gap-4">
            <RecentNotes />
            <RecentProjects />
            <ContinueWorking />
            <Feed />
          </div>
        </section>

        <aside
          className={
            "w-full md:col-span-2 lg:col-span-3  xl:col-span-3 grid gap-4 lg:top-6"
          }
        >
          <PortfolioCard />
          <WeeklyProductivity />
          <NextUp />
          <Messages />
        </aside>
      </div>
    </main>
  );
}
