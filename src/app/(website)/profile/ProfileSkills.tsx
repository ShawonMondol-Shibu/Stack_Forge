'use client'
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { SiNestjs, SiNextdotjs } from "react-icons/si";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

export default function ProfileSkills() {
  return (
    <Card className=" bg-white">
      <CardHeader>
        <CardTitle className="text-xl">Skills:</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup className="grid grid-cols-4 items-center justify-start ">
          {
            Array.from({length:10}).map((_,i)=>(
          <Item key={i} variant={"outline"} className="hover:shadow-lg transition-all duration-300 ease-in" >
            <ItemContent>
              <SiNextdotjs size={50} />
              <ItemTitle>NextJS</ItemTitle>
            </ItemContent>
          </Item>

            ))
          }
          <Item variant={"outline"}>
            <ItemHeader>
              <SiNestjs size={50} />
            </ItemHeader>
            <ItemContent>
              <Progress value={50}>
                <ProgressLabel>NestJS</ProgressLabel>
                <ProgressValue />
              </Progress>
            </ItemContent>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
