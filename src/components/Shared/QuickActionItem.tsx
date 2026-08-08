import React from "react";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "../ui/item";
import { LucideIcon } from "lucide-react";
import MotionDiv from "../Shared/MotionDiv";
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
      <Item variant={"outline"} size={"xs"} className="w-60 shadow-black/5 shadow-lg">
        <ItemMedia className={`bg-primary/10 p-3 rounded-md`}>
          {data?.icon && <data.icon size={16} className={cn(`text-primary`)} />}
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{data.title}</ItemTitle>
          <ItemDescription className="text-muted-foreground">{data.subtitle}</ItemDescription>
        </ItemContent>
      </Item>
    </MotionDiv>
  );
}
