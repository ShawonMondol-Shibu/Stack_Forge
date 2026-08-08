import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import React from "react";

export default function Todo() {
  return (
    <div className="space-y-2 border-r-2 pr-2">
      <h3 className="text-sm font-semibold">Todo 3</h3>
      <ItemGroup className="gap-0.5!">
        {Array.from({ length: 5 }).map((_, i) => (
          <Item key={i} variant={"outline"} size={"xs"} className="p-2">
            <ItemContent>
              <ItemTitle className="font-normal">
                Fix API rate limit issue
              </ItemTitle>
              <div className="flex items-center justify-between text-xs">
                <Badge variant={"destructive"} className="text-xs!">
                  High
                </Badge>
                <span className="text-red-500">May 28</span>
              </div>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
