import React from "react";
import { Item, ItemContent, ItemTitle } from "./ui/item";
import { ArrowUp } from "lucide-react";
import { Badge } from "./ui/badge";
interface OverviewItemType {
  name: string;
  total: number;
  icon?: ()=> React.JSX.Element;
}

export default function OverviewItem({ data }: { data: OverviewItemType }) {
  return (
    <Item variant={"outline"} size={"xs"} className={"bg-white w-50 "}>
      <ItemContent className={"relative"}>
        <small className={"text-muted-foreground"}>{data?.name}</small>
        <ItemTitle className={"text-xl font-bold"}>{data?.total}</ItemTitle>
        <span className={"absolute right-0 bg-green-500/10 p-3 rounded-md"}>
          {data?.icon && <data.icon />}
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
