import Navbar from "@/components/dashboard/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-8">
      <Navbar />
      {children}
    </div>
  );
}
