import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Circle, Star } from "lucide-react";
import React from "react";
import { GitHubCalendar } from "react-github-calendar";

export default function GithubActivitiy() {
  return (
    <Card size={"sm"} className={"w-full"}>
      <CardHeader>
        <CardTitle className={"font-bold"}>GitHub Activity</CardTitle>
      </CardHeader>
      <CardContent className={"space-y-4"}>
        <section>
          <GitHubCalendar
            blockSize={8}
            username={"shawonmondol-shibu"}
            colorScheme={"light"}
            showTotalCount
            blockMargin={3}
          />
        </section>
        <section className="grid grid-cols-2 items-start gap-4">
          {/* Pinned Repositories */}
          <div>
            <h2 className={"text-md font-semibold"}>Pinned Repositories</h2>
            <ItemGroup>
              {Array.from({ length: 4 }).map((_, i) => (
                <Item key={i} size={"xs"} className="p-1">
                  <ItemMedia>
                    <Avatar>
                      <AvatarImage src={""} alt={"repository_image"} />
                      <AvatarFallback>repo image</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className={"text-xs"}>StackForge</ItemTitle>
                    <ItemDescription className={"text-xs"}>
                      Next.js - TypeScript
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions className="text-muted-foreground">
                    <Star size={12} /> 232{" "}
                  </ItemActions>
                </Item>
              ))}
            </ItemGroup>
          </div>

          {/* Recent Commits */}
          <div>
            <h2 className={"text-md font-semibold"}>Recent Commits</h2>
            <ItemGroup>
              {Array.from({ length: 5 }).map((_, i) => (
                <Item key={i} size={"xs"} className="p-1">
                  <ItemMedia>
                    <Circle size={8} />
                  </ItemMedia>
                  <ItemContent>
                    <div className="flex items-center justify-between">
                      <ItemTitle className={"text-xs"}>StackForge</ItemTitle>
                      <small className="text-muted-foreground">4h ago</small>
                    </div>
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
