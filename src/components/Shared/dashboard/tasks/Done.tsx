import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import { taskType } from "@/lib/types/task-type";
import { CheckCircle } from "lucide-react";
import React from "react";

export default function Done({data}:{data:taskType[]}) {

  return (
    <div className="space-y-2 pl-2">
      <h3 className="text-sm font-semibold">Done {data?.length}</h3>
      <ItemGroup>
        {data.map((task, i) => (
          <Item
            key={i}
            variant={"default"}
            size={"xs"}
            className="p-2 bg-background shadow-black/5 shadow-lg"
          >
            <ItemContent>
              <ItemTitle className="font-normal line-clamp-1">{task.title}</ItemTitle>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">May 28</span>
                <Button
                  variant={"secondary"}
                  size={"icon-xs"}
                  render={<CheckCircle />}
                  className={"text-green-600 size-4 "}
                />
              </div>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
