// "use client"
import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import { taskType } from "@/lib/types/task-type";
import { motion } from "motion/react";
import React from "react";

export default function Todo({ data }: { data: taskType[] }) {
  return (
    <div className="space-y-2 border-r-2 pr-2">
      <h3 className="text-sm font-semibold">Todo {data?.length}</h3>
      <ItemGroup className="gap-0.5!">
        {data.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ translateX: 100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
          >
            <Item
              variant={"outline"}
              size={"xs"}
              className="p-2 bg-background shadow-background/5 shadow-lg"
            >
              <ItemContent>
                <ItemTitle className="font-normal line-clamp-1">
                  {todo.title}
                </ItemTitle>
                <div className="flex items-center justify-between text-xs">
                  <Badge variant={"destructive"} className="px-1">
                    <small>{todo.priority}</small>
                  </Badge>
                  <span className="text-red-500">May 28</span>
                </div>
              </ItemContent>
            </Item>
          </motion.div>
        ))}
      </ItemGroup>
    </div>
  );
}
