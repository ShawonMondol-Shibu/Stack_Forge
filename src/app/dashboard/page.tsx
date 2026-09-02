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
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "@/hooks/queries/use-projects";

export default function Page() {
  const { data: projects } = useQuery(getAllProjects())
  return (
    <main className="space-y-6 w-full container mx-auto ">
      <div className={"grid grid-cols-10 items-start gap-6"}>
        <div className="col-span-8 space-y-4">
          <Greetings />
          <QuickActions />
          <Overview />
          <div className="grid grid-cols-2 items-start gap-4">
            <GithubActivitiy />
            <TodaysTask />
          </div>

          <div className="grid grid-cols-4 items-start justify-start gap-4">
            <RecentNotes />
            <RecentProjects />
            <ContinueWorking />
            <Feed />
          </div>
          
        </div>

        <aside className={"col-span-2 grid gap-4 lg:sticky lg:top-6"}>
          <PortfolioCard />
          <WeeklyProductivity />
          <NextUp />
          <Messages />
        </aside>
      </div>
    </main>
  );
}
