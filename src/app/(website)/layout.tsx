import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
