import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress, ProgressValue } from "@/components/ui/progress";
import React from "react";
import { BsTypescript } from "react-icons/bs";

export default function TopTechnologies() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Technologies</CardTitle>
        <CardAction>
          <Button variant={"ghost"} size={"sm"}>
            This year
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={"flex items-center gap-6"}>
            <span className={"flex items-center gap-2"}>
              <BsTypescript className={"text-blue-600 size-5"} />{" "}
              {"TypeScript"}{" "}
            </span>
            <div className="w-full flex items-center justify-center gap-4">
              <div className={"w-full bg-muted-foreground/20 rounded-full"}>
                <div className={"bg-blue-600 p-0.5 w-20 rounded-full"} />
              </div>
              <span>{80}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
