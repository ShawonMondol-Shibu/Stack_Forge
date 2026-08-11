import { SidebarLeft, SidebarRight } from "@/components/Shared/dashboard/Sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-8">
      <SidebarLeft />
      <SidebarRight/>
      <section>
      {children}
      </section>
    </main>
  );
}
