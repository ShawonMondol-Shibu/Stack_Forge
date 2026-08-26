// "use client"
import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import { taskType } from "@/lib/types/task-type";
import React from "react";

export default function InProgress({ data }: { data: taskType[] }) {
  return (
    <div className="space-y-2 border-r-2 px-2">
      <h3 className="text-sm font-semibold">In Progress {data?.length}</h3>
      <ItemGroup>
        {data?.map((task) => (
          <Item
            key={task.id}
            variant={"outline"}
            size={"xs"}
            className={"p-2 bg-background shadow-background/5 shadow-lg"}
          >
            <ItemContent>
              <ItemTitle className="font-normal line-clamp-1">{task.title}</ItemTitle>
              <div className="flex items-center justify-between text-xs">
                <Badge variant={"destructive"} className={"px-1"}>
                  {" "}
                  <small>{task.priority}</small>{" "}
                </Badge>
                {/* <span className="text-red-500">May 28</span> */}
              </div>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
