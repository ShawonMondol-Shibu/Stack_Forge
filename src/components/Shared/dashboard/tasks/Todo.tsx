"use client"
import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import { motion } from "motion/react"
import React from "react";

export default function Todo() {
  return (
    <div className="space-y-2 border-r-2 pr-2">
      <h3 className="text-sm font-semibold">Todo 3</h3>
      <ItemGroup className="gap-0.5!">
        {Array.from({ length: 5 }).map((_, i) => (
        <motion.div key={i} initial={{translateX:100+i, opacity: 0}} 
        
        animate={{translateX: 0, opacity:1}}>
          <Item key={i} variant={"outline"} size={"xs"} className="p-2 bg-background shadow-background/5 shadow-lg">
            <ItemContent>
              <ItemTitle className="font-normal">
                Fix API rate limit issue
              </ItemTitle>
              <div className="flex items-center justify-between text-xs">
                <Badge variant={"destructive"} className="px-1">
                  <small>

                  High
                  </small>
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
