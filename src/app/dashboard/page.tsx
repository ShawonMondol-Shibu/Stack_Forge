import Overview from "@/components/dashboard/Overview";
import PortfolioCard from "@/components/dashboard/portfolio/PortfolioCard";
import QuickActions from "@/components/dashboard/QuickActions";
import React from "react";

export default function Page() {
  return (
    <main>
      <div className={"flex items-start gap-6"}>
        <div className="space-y-4">
        <QuickActions />
<Overview/>
        </div>
        <aside className={"w-sm "}>
          <PortfolioCard />
        </aside>
      </div>
    </main>
  );
}
