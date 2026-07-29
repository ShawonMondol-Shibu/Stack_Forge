import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={"h-dvh overflow-hidden grid grid-cols-5 bg-gray-200 "}>
      <div className={"overflow-hidden p-8 h-full col-span-2 "}>
        <div
          className={
            "bg-white/80 rounded-lg h-full p-8 flex items-center justify-center"
          }
        >
          {children}
        </div>
      </div>

      <div className={" h-full w-full "}></div>
    </main>
  );
}
