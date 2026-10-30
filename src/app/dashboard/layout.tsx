import { NavbarLeft, NavbarRight } from "@/components/Shared/dashboard/Navbar";
// import { ProtectedRoute } from "@/components/Shared/ProtectedRoute";
import { InitialLoad } from "@/hooks/initialLoad";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    {/* <ProtectedRoute> */}
      <InitialLoad />
      <div className="p-4 xl:p-8">
        <nav className="fixed container left-1/2 -translate-x-1/2 z-50 flex gap-4 items-center justify-between px-4 md:px-0">
          <NavbarLeft />
          <NavbarRight />
        </nav>
        <section className="mt-20 container mx-auto">{children}</section>
      </div>
    {/* </ProtectedRoute> */}
    </>
  );
}
