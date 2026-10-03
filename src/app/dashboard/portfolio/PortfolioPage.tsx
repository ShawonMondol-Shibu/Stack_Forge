import FeaturedProjects from "@/components/Shared/dashboard/portfolio/FeaturedProjects";
import PortfolioExperience from "@/components/Shared/dashboard/portfolio/PortfolioExperience";
import PortfolioHeader from "@/components/Shared/dashboard/portfolio/PortfolioHeader";
import Skills from "@/components/Shared/dashboard/profile/about/Skills";
import React from "react";

export default function PortfolioPage() {
  return (
    <main>
      <div className={"grid  gap-6"}>
        <div className={"col-span-9 space-y-6"}>
          <PortfolioHeader />
          <section>
            <FeaturedProjects />
          </section>
          <section
            className={
              "w-full grid grid-cols-1 md:grid-cols-2 items-start justify-center gap-4"
            }
          >
            <Skills />
            <PortfolioExperience />
          </section>
        </div>
        {/* <aside className="border col-span-3">

        </aside> */}
      </div>
    </main>
  );
}
