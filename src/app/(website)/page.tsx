import FeaturedDevelopers from "@/components/home/FeaturedDevelopers";
import Header from "@/components/home/Header";
import TrandingProjects from "@/components/home/TrandingProjects";
import Newsletter from "@/components/home/Newsletter";
import React from "react";
import SuccessStories from "@/components/home/SuccessStories";

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
