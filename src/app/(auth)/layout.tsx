import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={"h-dvh overflow-hidden grid grid-cols-2 bg-gray-200 "}>
      <div className={"overflow-hidden p-8 h-full "}>
        <div
          className={
            "bg-white/80 rounded-lg h-full p-8 flex items-center justify-center bg-[url('/brain.jpg')] bg-no-repeat bg-center bg-contain"
          }
        >
          {children}
        </div>
      </div>

      <div className={" h-full w-full "}></div>
    </main>
  );
}
