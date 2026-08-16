"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { ArrowRight, Circle, CircleCheck } from "lucide-react";
import React from "react";

export default function ProfileCompletion() {
  const completion = [
    { name: "Basic Information", complete: true },
    { name: "Profile Photo", complete: true },
    { name: "About Me", complete: true },
    { name: "Skills", complete: false },
    { name: "Social Links", complete: false },
  ];

  const percentage = 40;

  return (
    <Card className="gap-1">
      <CardHeader>
        <CardTitle>Profile Completion</CardTitle>
        <CardAction>
          <Button size={"xs"}>Edit</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-6">
        <CircularProgress percentage={percentage} />
<CardDescription className="text-xl">
    Almost there! Complete your profile to get discovered
</CardDescription>
        </div>
        <ul>
          {completion.map((complete, i) => (
            <li key={i} className={"flex items-center gap-2"}>
              {complete.complete === true ? (
                <CircleCheck size={16} className="fill-primary text-accent" />
              ) : (
                <Circle size={14} />
              )}

              <span>{complete.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <CardAction>
          <Button variant={"link"} size={"xs"}>
            Complete your profile <ArrowRight />
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}

