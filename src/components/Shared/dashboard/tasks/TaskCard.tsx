import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  EllipsisVerticalIcon,
  Pencil,
  Trash,
} from "@animateicons/react/lucide";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { taskType } from "@/lib/types/task-type";
import { useMutation } from "@tanstack/react-query";
import { apiService } from "@/lib/api-routes/apis";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export default function TaskCard({ data }: { data: taskType }) {
  const { title, priority, status, id, createdAt } = data;
  const { mutate } = useMutation({
    mutationKey: ["delete-task"],
    mutationFn: (id: string) =>
      apiService({ endpoint: `/tasks/${id}`, method: "DELETE" }),
    onSuccess: () => {
      toast.add({
        type: "success",
        title: "Task deleted successfully.",
      });
    },
    onError: (err) => {
      toast.add({
        type: "error",
        title: `${err.message}`,
      });
    },
  });

  const date = new Intl.DateTimeFormat("en-us", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(`${createdAt}`));

  return (
    <Item variant={"muted"} size={"xs"} className="w-full">
      <ItemContent>
        <div className="flex w-full items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <Checkbox />
            <ItemTitle>{title}</ItemTitle>
          </span>
          <Badge
            className={cn(
              priority == "high"
                ? "bg-destructive/16 text-destructive"
                : priority == "medium"
                  ? "bg-yellow-500/16 text-yellow-500"
                  : priority == "low"
                    ? "bg-green-500/16 text-green-500"
                    : null,
              "font-bold",
            )}
          >
            {priority}
          </Badge>
          <Badge variant={"outline"}>{status}</Badge>
          <span>
            <Calendar size={14} /> {date}
          </span>

          <ItemActions>
            <Popover>
              <PopoverTrigger>
                <EllipsisVerticalIcon />
              </PopoverTrigger>
              <PopoverContent align="end" className={"w-fit p-1.5 gap-0"}>
                <Button size={"xs"}>
                  <Pencil /> Edit
                </Button>
                <Button size={"xs"} onClick={() => mutate(id)}>
                  <Trash /> Delete
                </Button>
              </PopoverContent>
            </Popover>
          </ItemActions>
        </div>
      </ItemContent>
    </Item>
  );
}
