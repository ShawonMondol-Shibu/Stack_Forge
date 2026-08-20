import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";

export default function RecentNotes() {
  return (
    <Card size={"sm"} className={"w-full gap-1"}>
      <CardHeader>
        <CardTitle className="text-xl">Recent Notes</CardTitle>
        <CardAction>
          <Button variant={"ghost"} size={"xs"} className={"text-primary"}>
            {" "}
            + New Note
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {
          Array.from({length: 3}).map((_,i)=>(
        <div key={i} 
          className={"flex items-start justify-between text-xs py-2 border-b"}
        >
          <div className={"flex items-center gap-2"}>
            <span className="bg-primary/16 p-1.5 rounded">

            <NotebookPen size={16} className=""/>
            </span>
            <div>
              <h3 className={""}>Database Design</h3>
              <p className={"text-muted-foreground"}>ER Diagram and Schema</p>
            </div>
          </div>
          <span>May 8</span>
        </div>

          ))  
        }
      </CardContent>
    </Card>
  );
}
