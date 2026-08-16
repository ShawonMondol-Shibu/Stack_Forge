import { Card } from "@/components/ui/card";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={"h-dvh overflow-hidden grid grid-cols-5 bg-background "}>
      <div className={"overflow-hidden p-8 h-full col-span-2 "}>
        <Card
          className={
            " rounded-lg h-full p-8 flex items-center justify-center"
          }
        >
          {children}
        </Card>
      </div>

      <div className={" h-full w-full "}></div>
    </main>
  );
}
