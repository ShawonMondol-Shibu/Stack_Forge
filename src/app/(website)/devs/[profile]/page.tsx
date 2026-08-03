import React from "react";
import ProfilePage from "../../../../components/profile/ProfilePage";
import ProfileSkills from "../../../../components/profile/ProfileSkills";
import ProfileEducations from "../../../../components/profile/ProfileEducations";
import ProfileExperience from "../../../../components/profile/ProfileExperience";
import ProfileProjects from "../../../../components/profile/ProfileProjects";
import ProfileGithub from "../../../../components/profile/ProfileGithub";

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
