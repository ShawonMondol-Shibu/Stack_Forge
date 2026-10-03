import PortfolioPage from "@/app/dashboard/portfolio/PortfolioPage";
import PortfolioExperience from "@/components/Shared/dashboard/portfolio/PortfolioExperience";
import PortfolioHeader from "@/components/Shared/dashboard/portfolio/PortfolioHeader";
import Skills from "@/components/Shared/dashboard/profile/about/Skills";
import ProfileEducations from "@/components/Shared/website/profile/ProfileEducations";
import ProfileExperience from "@/components/Shared/website/profile/ProfileExperience";
import ProfileGithub from "@/components/Shared/website/profile/ProfileGithub";
import ProfilePage from "@/components/Shared/website/profile/ProfilePage";
import ProfileProjects from "@/components/Shared/website/profile/ProfileProjects";
import ProfileSkills from "@/components/Shared/website/profile/ProfileSkills";
import React from "react";

export default async function Page({params}: { params : Promise<{id:string}>}) {
  const {id} = await params;
  return (
    <main className={" px-4"}>
      <PortfolioPage />
    </main>
  );
}

