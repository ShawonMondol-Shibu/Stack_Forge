import Footer from "@/components/Shared/website/Footer";
import Navbar from "@/components/Shared/website/Navbar";
import React from "react";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto h-dvh px-6">
      <Navbar />
      <div className="my-10">

      {children}
      </div>
      <Footer />
    </div>
  );
}
