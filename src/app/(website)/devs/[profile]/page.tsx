import ProfileEducations from "@/components/Shared/website/profile/ProfileEducations";
import ProfileExperience from "@/components/Shared/website/profile/ProfileExperience";
import ProfileGithub from "@/components/Shared/website/profile/ProfileGithub";
import ProfilePage from "@/components/Shared/website/profile/ProfilePage";
import ProfileProjects from "@/components/Shared/website/profile/ProfileProjects";
import ProfileSkills from "@/components/Shared/website/profile/ProfileSkills";
import React from "react";

export default function Page() {
  return (
    <main className={"py-10 px-4 md:px-8 grid justify-center"}>
      <div className={"w-full max-w-4xl space-y-10"}>
        <ProfilePage />
        <ProfileSkills />
        <ProfileEducations />
        <ProfileExperience />
        <ProfileProjects />
        <ProfileGithub />
      </div>
    </main>
  );
}
