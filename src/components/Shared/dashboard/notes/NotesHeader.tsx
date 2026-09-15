"use client";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemGroup, ItemMedia } from "@/components/ui/item";
import { FilesIcon, PlusIcon } from "@animateicons/react/lucide";
import React from "react";
import Link from "next/link";
import { useNoteStore } from "@/store/useNoteStore";

export default function NotesHeader() {
  const { notes } = useNoteStore();

  const notesHeaderData = [
    { value: notes.length, title: "Total Notes", subTitle: "All your notes" },
  ];
  return (
    <header className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notes</h1>
          <span className="text-sm">
            Capture ideas, learnings and important things.
          </span>
        </div>

        <Link href={"/dashboard/notes/add_note"}>
          <Button>
            <PlusIcon /> New Note
          </Button>
        </Link>
      </div>

      <ItemGroup className="grid grid-cols-4 items-center gap-6">
        {notesHeaderData.map((notesHeader) => (
          <Item key={notesHeader.title} variant={"outline"} className="">
            <ItemMedia className="p-4 bg-primary/20 text-primary rounded-md">
              <FilesIcon size={24} />
            </ItemMedia>
            <ItemContent>
              <span className="text-lg font-bold">{notesHeader?.value}</span>
              <span className="text-xs font-semibold">
                {notesHeader?.title}
              </span>
              <span className="text-xs font-normal">
                {notesHeader?.subTitle}
              </span>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </header>
  );
}
