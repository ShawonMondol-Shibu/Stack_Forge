import FeaturedDevelopers from "@/components/Shared/website/home/FeaturedDevelopers";
import Header from "@/components/Shared/website/home/Header";
import Newsletter from "@/components/Shared/website/home/Newsletter";
import SuccessStories from "@/components/Shared/website/home/SuccessStories";
import TrandingProjects from "@/components/Shared/website/home/TrandingProjects";
import React from "react";

export default function Page() {
  return (
    <main
      className={
        "w-full max-w-4xl mx-auto flex flex-col items-center  gap-10 py-10"
      }
    >
      <Header />
      <FeaturedDevelopers />
      <TrandingProjects />
      <SuccessStories />
      <Newsletter />
    </main>
  );
}
