import { Badge } from "@/components/ui/badge";
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
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PinnedProjects() {
  return (
    <Card className={"w-full gap-2"}>
      <CardHeader>
        <CardTitle>Pinned Projects</CardTitle>
        <CardAction>
          <Button variant={"link"} render={<Link href={""} />}>
            View all
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {Array.from({ length: 3 }).map((_, i) => (
            <Item key={i} size={"xs"} className="p-0">
              <ItemMedia className="w-20 h-10">
                <Image
                  src={"/brain.jpg"}
                  width={60}
                  height={40}
                  alt="project_image"
                  className="w-full object-contain"
                />
              </ItemMedia>
              <ItemContent>
                <div className="flex items-end justify-between">
                  <div>
                    <ItemTitle>Stack Forge</ItemTitle>
                    <ItemDescription>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Error reprehenderit laborum deserunt reiciendis, aut
                      consectetur facilis optio unde. Quibusdam harum illo
                      dolores consequuntur quis necessitatibus fugiat id
                      doloribus quidem tempore?
                    </ItemDescription>
                    <div>
                      <Badge variant={"outline"}>
                        <small>NestJS</small>
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Star size={12} /> {202}
                  </div>
                </div>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
