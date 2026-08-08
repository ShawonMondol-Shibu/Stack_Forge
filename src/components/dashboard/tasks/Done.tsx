import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import { CheckCircle } from "lucide-react";
import React from "react";

export default function Done() {
  return (
    <div className="space-y-2 pl-2">
      <h3 className="text-sm font-semibold">Todo 3</h3>
      <ItemGroup>
        <Item variant={"default"} size={"xs"} className="p-2">
          <ItemContent>
            <ItemTitle className="font-normal">
              Setup Project
            </ItemTitle>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">May 28</span>
              <Button
                variant={"secondary"}
                size={"icon-xs"}
                render={<CheckCircle  />}
                className={"text-green-600 size-4 "}
              />
            </div>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  );
}
