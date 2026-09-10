import NotesHeader from "@/components/Shared/dashboard/notes/NotesHeader";
import NotesSidebar from "@/components/Shared/dashboard/notes/NotesSidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full container mx-auto space-y-6">
      <NotesHeader />

      <section className=" rounded-4xl border grid grid-cols-12 w-full">
        <NotesSidebar className="col-span-2 border-r-0" />

        <div className="col-span-10 border-l w-full min-h-[50vh] ">
          {children}
        </div>
      </section>
    </div>
  );
}
