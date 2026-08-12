import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Pencil } from "lucide-react";
import React from "react";
import { SiNestjs } from "react-icons/si";

export default function Skills() {
  return (
    <Card className={"gap-0 min-h-64"}>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardAction>
          <Button size={"icon-sm"}>
            <Pencil />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <div className="flex flex-row flex-wrap items-center gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Item
                key={i}
                variant={"outline"}
                size={"xs"}
                className={"w-fit p-2"}
              >
                <ItemMedia>
                  <SiNestjs />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>NestJS</ItemTitle>
                </ItemContent>
              </Item>
            ))}
          </div>
        <Button variant={"link"} size={"xs"}>
            View all skills
        </Button>
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
