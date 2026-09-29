import { NavbarLeft, NavbarRight } from "@/components/Shared/dashboard/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-2 md:p-4 lg:p-6 xl-p8">
      <nav className="fixed container left-1/2 -translate-x-1/2 z-50 flex gap-4 items-center justify-between ">
        <NavbarLeft />
        <NavbarRight />
      </nav>
      <section className="mt-20">{children}</section>
    </div>
  );
}
