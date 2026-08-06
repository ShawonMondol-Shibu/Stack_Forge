import React from "react";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "./ui/item";
import { LucideIcon } from "lucide-react";
import MotionDiv from "./MotionDiv";
import { cn } from "@/lib/utils";

type ItemActionType = {
  title?: string;
  subtitle?: string;
  color?: string;
  icon?: LucideIcon;
};

export default function QuickActionItem({ data }: { data: ItemActionType }) {
  return (
    <MotionDiv>
      <Item variant={"outline"} size={"xs"} className="w-60 bg-white ">
        <ItemMedia className={`bg-${data.color}/20 p-3 rounded-md`}>
          {data?.icon && <data.icon className={cn(`text-${data.color}`)} />}
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{data.title}</ItemTitle>
          <ItemDescription className="text-muted-foreground">{data.subtitle}</ItemDescription>
        </ItemContent>
      </Item>
    </MotionDiv>
  );
}
