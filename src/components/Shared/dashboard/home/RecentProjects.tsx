import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { FolderOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RecentProjects() {
  return (
    <Card size={"sm"} className={"w-full gap-1"}>
      <CardHeader>
        <CardTitle className="text-xl">Recent Projects</CardTitle>
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
        <ItemGroup className="gap-0.5!">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-b">
              <Item variant={"default"} size={"xs"} className="p-0 pb-1">
                <ItemMedia>
                  <FolderOpen />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="text-xs">Stack Forge</ItemTitle>
                  <ItemDescription className="text-xs">
                    Developer Platform
                  </ItemDescription>
                  <Badge
                    variant={"outline"}
                    className="p-1 text-muted-foreground"
                  >
                    {" "}
                    <small>Next.js</small>
                  </Badge>
                  <div className="text-xs text-muted-foreground flex items-center justify-between">
                    <span>Updated 2h ago</span>
                    <span className="flex items-center gap-1 ">
                      <Star size={10} /> 232
                    </span>
                  </div>
                </ItemContent>
              </Item>
            </div>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
