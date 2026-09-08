"use client";
import MotionDiv from "@/components/Shared/MotionDiv";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil } from "@animateicons/react/lucide";
import React from "react";

export default function NoteDetails({ id }: { id: string }) {
  return (
      <Card className={"rounded-l-none w-full col-span-10 shadow-none border-0"}>
        <MotionDiv>
      <CardHeader>
        <div className="flex items-center gap-x-4">
          <CardTitle>Next.js 16 - key Features {id} </CardTitle>
          <Button
            variant={"ghost"}
            size={"icon-sm"}
            className={"text-muted-foreground"}
          >
            <Pencil />
          </Button>
        </div>
        <span className="space-x-4">
          <Badge className="p-1.5">
            {/* <small> */}
            WebDev
            {/* </small> */}
          </Badge>
          <Badge variant={"outline"} className="p-1.5">
            {" "}
            Add tags...
          </Badge>
        </span>
        <CardAction>
          <Button>Delete</Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
        accusantium omnis perferendis fuga esse obcaecati tenetur similique
        dolores, tempore est magni impedit labore voluptates dolor quam saepe.
        Dolores, sequi dolorem.
      </CardContent>
    </MotionDiv>
    </Card>

  );
}
