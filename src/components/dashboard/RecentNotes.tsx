import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { NotebookPen } from "lucide-react";

export default function RecentNotes() {
  return (
    <Card size={"sm"} className={"w-xs bg-transparent shadow-lg"}>
      <CardHeader>
        <CardTitle>Recent Notes</CardTitle>
        <CardAction>
          <Button variant={"ghost"} size={"xs"}>
            {" "}
            + New Note
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div
          className={"flex items-start justify-between text-xs py-2 border-b"}
        >
          <div className={"flex items-center gap-2"}>
            <NotebookPen />
            <div>
              <h3 className={""}>Database Design</h3>
              <p className={"text-muted-foreground"}>ER Diagram and Schema</p>
            </div>
          </div>
          <span>May 8</span>
        </div>
      </CardContent>
    </Card>
  );
}
