import { HomeCarousel } from "@/components/home/HomeCarousel";
import React from "react";

export default function Page() {
  return (
    <main
      className={
        "w-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-10 py-10"
      }
    >
      <header>
        <div
          className={
            "w-full max-w-4xl mx-auto flex  items-center justify-center gap-10 py-10"
          }
        >
          <div className={"flex flex-col gap-4 items-start justify-start"}>
            <h1 className={"text-xl"}>Welcome to Stack Forge</h1>
            <p className={"text-7xl uppercase font-semibold"}>Top <span className={"text-primary"}>Developers</span></p>
            <p className={"text-4xl"}>in Stack forge</p>
            <p>Build Your Portfolio, Track Your Progress, and Connect with Developers Worldwide</p>
          </div>
          <HomeCarousel />
        </div>
      </header>
    </main>
  );
}
