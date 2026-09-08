import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemGroup, ItemMedia } from "@/components/ui/item";
import { FilesIcon, Plus } from "@animateicons/react/lucide";
import React from "react";

export default function NotesHeader() {
  return (
    <header className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notes</h1>
          <span className="text-sm">
            Capture ideas, learnings and important things.
          </span>
        </div>
        <Button>
        <Plus/> New Note
        </Button>
      </div>

      <ItemGroup className="grid grid-cols-4 items-center gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Item key={i} variant={"outline"} className="">
            <ItemMedia className="p-2 bg-primary/20 rounded-md">
              <FilesIcon size={24} />
            </ItemMedia>
            <ItemContent>
              <span className="text-lg font-bold">48</span>
              <span className="text-xs font-semibold">Total Notes</span>
              <span className="text-xs font-normal">All your notes</span>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </header>
  );
}
