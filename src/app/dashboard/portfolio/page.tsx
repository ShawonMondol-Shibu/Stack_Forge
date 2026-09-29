import FeaturedProjects from "@/components/Shared/dashboard/portfolio/FeaturedProjects";
import PortfolioHeader from "@/components/Shared/dashboard/portfolio/PortfolioHeader";
import React from "react";

export default function Page() {
  return (
    <main>
      <div className={"grid grid-cols-12 gap-6"}>
        <div className={"col-span-9"}>
          <PortfolioHeader />
          <section>
            <FeaturedProjects />
          </section>
        </div>
        <aside className="border col-span-3">

        </aside>
      </div>
    </main>
  );
}
