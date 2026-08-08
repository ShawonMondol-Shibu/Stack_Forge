import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "../ui/item";
import { FolderOpen } from "lucide-react";
import { Badge } from "../ui/badge";

export default function RecentProjects() {
  return (
    <Card size={"sm"} className={"w-xs bg-transparent shadow-lg "}>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
        <CardAction>
          <Button
            variant={"link"}
            size={"xs"}
            render={<Link href={"/dashboard/projects"} />}
          >
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <Item variant={"outline"} size={"xs"}>
            <ItemMedia>
              <FolderOpen />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Stack Forge</ItemTitle>
              <ItemDescription>Developer Platform</ItemDescription>
<Badge variant={"outline"} className="p-1 text-xs!">Next.JS</Badge>
            </ItemContent>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
