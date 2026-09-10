"use client";
import { Badge } from "@/components/ui/badge";
import React, { useEffect } from "react";
import CommonFilter from "../CommonFilter";
import { PinIcon } from "@animateicons/react/lucide";
import { cn } from "@/lib/utils";
import { Item } from "@/components/ui/item";
import Link from "next/link";
import { noteQuery } from "@/hooks/queries/use-note";
import { useNoteStore } from "@/store/useNoteStore";

export default function NotesSidebar({ className }: { className?: string }) {
  const { notes, setNotes } = useNoteStore();
  const { data } = noteQuery.GetAll();
  useEffect(() => {
    if (data) {
      setNotes([...data]);
    }
  }, [data, setNotes]);

  return (
    <aside className={cn("rounded-l-4xl p-2 space-y-4", className)}>
      <CommonFilter searchPlaceholder="Search notes..." />
      <div className="flex flex-col gap-y-2">
        {notes?.map((note) => {
          const tagStr = `${note?.tag}`.replace("{", "[").replace("}", "]");
          const tags = JSON.parse(tagStr);
          return (
            <Link
              key={note?.id}
              href={`/dashboard/notes/${note?.id}`}
              className="rounded-2xl"
            >
              <Item
                variant={"outline"}
                className={"rounded-2xl p-2"}
              >
                <div className="space-y-1">
                  <span className="flex items-center justify-between gap-2">
                    <h4 className="line-clamp-1 text-base font-semibold">
                      {note?.title}
                    </h4>
                    <PinIcon size={16} />
                  </span>
                  <span className="text-xs text-muted-foreground line-clamp-2">
                    Exploring the new features in Next.js 16 and how they
                    improve proformance...
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-x-1">

                    {tags?.slice(0,2).map((tag: string) => (
                      <Badge
                      key={tag}
                      variant={"default"}
                      className="p-1.5 bg-primary/70"
                      >
                        <small>{tag}</small>
                      </Badge>
                    ))}
                    </span>
                    <span className="uppercase text-xs text-muted-foreground">
                      10:30 AM
                    </span>
                  </div>
                </div>
              </Item>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
