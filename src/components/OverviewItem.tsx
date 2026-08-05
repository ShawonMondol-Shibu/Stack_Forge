import React from "react";
import { Item, ItemContent, ItemTitle } from "./ui/item";
import { ArrowUp, Folder } from "lucide-react";
import { Badge } from "./ui/badge";

export default function OverviewItem() {
  return (
    <Item variant={"outline"} className={"bg-white w-60"}>
      <ItemContent className={"relative"}>
        <small className={"text-muted-foreground"}>Projects</small>
        <ItemTitle className={"text-xl font-bold"}>24</ItemTitle>
        <span className={"absolute right-0 bg-green-500/20 p-3 rounded-md"}>
          <Folder />
        </span>
        <Badge
          variant={"secondary"}
          className={"bg-green-500/5 text-green-600 font-bold"}
        >
          <ArrowUp /> 12%
        </Badge>
      </ItemContent>
    </Item>
  );
}
