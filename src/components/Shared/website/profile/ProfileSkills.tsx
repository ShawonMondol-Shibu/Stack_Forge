"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { SiNextdotjs } from "react-icons/si";

export default function ProfileSkills() {
  return (
    <Card className=" bg-background">
      <CardHeader>
        <CardTitle className="text-xl">Skills:</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup className="flex flex-row flex-wrap items-center justify-start ">
          {Array.from({ length: 10 }).map((_, i) => (
            <Item
              key={i}
              variant={"outline"}
              size={"xs"}
              className="w-fit hover:shadow-lg transition-all duration-300 ease-in"
            >
              <ItemMedia>
                <SiNextdotjs size={28} />

              </ItemMedia>
              <ItemContent>
                <ItemTitle >Next.JS</ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
