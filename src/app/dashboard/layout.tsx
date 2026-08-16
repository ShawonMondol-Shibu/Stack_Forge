import { NavbarLeft, NavbarRight } from "@/components/Shared/dashboard/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8">
      <NavbarLeft />
      <NavbarRight/>
      <section>
      {children}
      </section>
    </div>
  );
}
