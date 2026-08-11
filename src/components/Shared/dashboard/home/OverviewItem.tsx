import React from "react";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { ArrowUp, LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IconType } from "react-icons";
interface OverviewItemType {
  name: string;
  total: number;
  icon?: LucideIcon | IconType;
}

export default function OverviewItem({ data }: { data: OverviewItemType }) {
  return (
    <Item variant={"outline"} size={"xs"} className={" w-50 shadow-black/5 shadow-lg"}>
      <ItemContent className={"relative"}>
        <small className={"font-medium"}>{data?.name}</small>
        <ItemTitle className={"text-xl font-bold"}>{data?.total}</ItemTitle>
        <span className={"absolute right-0 bg-primary/10 text-primary p-3 rounded-md"}>
          {data?.icon && <data.icon size={16} />}
        </span>
        <Badge
          variant={"secondary"}
          className={"bg-primary/5 text-primary font-bold"}
        >
          <ArrowUp /> 12%
        </Badge>
      </ItemContent>
    </Item>
  );
}
