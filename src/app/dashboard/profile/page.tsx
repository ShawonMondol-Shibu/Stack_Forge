import ProfileHeader from "@/components/Shared/dashboard/profile/ProfileHeader";
import React from "react";
import About from "./About";

import ProfileStats from "@/components/Shared/dashboard/profile/ProfileStats";
import ContributionActivity from "@/components/Shared/dashboard/profile/ContributionActivity";
import ProfileCompletion from "@/components/Shared/dashboard/profile/ProfileCompletion";
import QuickLinks from "@/components/Shared/dashboard/profile/QuickLinks";

export default function Page() {
  return (
    <main
      className={
        "w-full container mx-auto space-y-4 grid grid-cols-1 lg:grid-cols-6 gap-6 items-start justify-between"
      }
    >
      <section className={"space-y-2 lg:col-span-4 mx-auto w-full"}>
        <ProfileHeader />
        <About />
      </section>

      <aside className="w-full lg:col-span-2 space-y-4 sticky lg:top-6">
        <ProfileCompletion />
        <ProfileStats />
        <ContributionActivity />
        <QuickLinks />
      </aside>
    </main>
  );
}
