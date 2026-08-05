import Navbar from "@/components/dashboard/Sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <section className="p-8">
      {children}
      </section>
    </main>
  );
}
