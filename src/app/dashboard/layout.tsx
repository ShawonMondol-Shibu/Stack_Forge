import { NavbarLeft, NavbarRight } from "@/components/Shared/dashboard/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8">
      <nav className="flex gap-4 items-center justify-between mb-4">
        <NavbarLeft />
        <NavbarRight />
      </nav>
      <section>{children}</section>
    </div>
  );
}
