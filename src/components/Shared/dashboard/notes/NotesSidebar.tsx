"use client";
import { Badge } from "@/components/ui/badge";
import React, { useMemo, useState } from "react";
import CommonFilter from "../CommonFilter";
import { PinIcon } from "@animateicons/react/lucide";
import { cn } from "@/lib/utils";
import { Item } from "@/components/ui/item";
import Link from "next/link";
import { noteQuery } from "@/hooks/queries/use-note";
import { usePathname } from "next/navigation";

export default function NotesSidebar({ className }: { className?: string }) {
  const { data } = noteQuery.GetAll();
  const [search, setSearch] = useState<string>("");
  const pathName = usePathname();

  const handleFilter = (value?: string) => {
    setSearch(value as string);
  };

  const filteredNotes = useMemo(() => {
    const notes = data ?? [];
    const query = search.trim().toLowerCase();

    if (!query) return notes;

    return notes.filter((note) =>
      JSON.stringify(note).toLowerCase().includes(query),
    );
  }, [data, search]);

  return (
    <aside className={cn("rounded-l-4xl p-2 space-y-4", className)}>
      {/* Common Filter */}
      <CommonFilter
        searchPlaceholder="Search notes..."
        handleFilter={handleFilter}
        isNote={true}
      />
      <div className="flex flex-col gap-y-2">pl
        {filteredNotes?.map((note) => {
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
                className={cn(
                  "rounded-2xl p-2",
                  pathName.includes(note?.id as string)
                    ? "border-primary"
                    : " border-transparent",
                )}
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
                      {tags?.slice(0, 2).map((tag: string) => (
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
