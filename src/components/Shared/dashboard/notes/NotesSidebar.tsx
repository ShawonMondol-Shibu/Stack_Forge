import { Badge } from "@/components/ui/badge";
import React from "react";
import CommonFilter from "../CommonFilter";
import { PinIcon } from "@animateicons/react/lucide";
import { cn } from "@/lib/utils";
import { Item } from "@/components/ui/item";
import Link from "next/link";

export default function NotesSidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("rounded-l-4xl p-2 space-y-4", className)}>
      <CommonFilter searchPlaceholder="Search notes..." />
      <div className="flex flex-col gap-y-2">
        {Array.from({ length: 5 }, (_, i) => (
          <Link key={i} href={`/dashboard/notes/${i}`} className="rounded-2xl">
            <Item
              variant={"outline"}
              className={"rounded-2xl p-2 flex flex-col gap-y-1"}
            >
              <div>
                <span className="flex items-center justify-between gap-2">
                  <h4 className="line-clamp-1 text-base font-semibold">
                    Next.js 16 - key Features
                  </h4>
                  <PinIcon size={16} />
                </span>
                <span className="text-xs text-muted-foreground line-clamp-2">
                  Exploring the new features in Next.js 16 and how they improve
                  proformance...
                </span>
                <div className="flex items-center justify-between">
                  <Badge
                    variant={"default"}
                    className="p-1.5 bg-primary/70"
                  >
                    <small>Web Dev</small>
                  </Badge>
                  <span className="uppercase text-xs text-muted-foreground">
                    10:30 AM
                  </span>
                </div>
              </div>
            </Item>
          </Link>
        ))}
      </div>
    </aside>
  );
}
