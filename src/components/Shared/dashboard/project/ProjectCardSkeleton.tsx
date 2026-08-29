import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ProjectCardSkeleton() {
  return (
    <Card className={"w-full pt-0 bg-bacground"}>
      <Skeleton className={"w-full h-40 object-cover"} />

      <div className="p-2 space-y-4">
        <Skeleton className="p-1.5 w-50" />
        <Skeleton className="p-1" />
        <Skeleton className="p-1" />

        <div className="line-clamp-1 flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="px-4 py-2"></Skeleton>
          ))}
        </div>
      </div>
      <div className={"flex gap-4 justify-between p-2"}>
        <Skeleton className={"p-2 w-10"} />
        <Skeleton className={"p-2 w-10"} />
        <Skeleton className={"p-2 w-10"} />
        <Skeleton className={"p-2 w-20"} />
      </div>
    </Card>
  );
}
