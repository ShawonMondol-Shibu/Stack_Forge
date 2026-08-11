import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder } from "lucide-react";
import { Progress, ProgressLabel } from "@/components/ui/progress";

export default function ContinueWorking() {
  return (
    <Card size={"sm"} className={"w-xs gap-2"}>
      <CardHeader>
        <CardTitle className="text-xl">Continue Working</CardTitle>
      </CardHeader>
      <CardContent>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={"flex items-start justify-between text-xs pb-2"}
          >
            <div className={"flex items-center gap-2"}>
              <span className="bg-primary/16 p-1.5 rounded">
                <Folder size={16} className="" />
              </span>
              <div>
                <h3 className={"font-semibold"}>Database Design</h3>
                <Progress value={50} className={""}>
                  <ProgressLabel className={"text-xs font-normal"}>
                    ER Diagram and Schema
                  </ProgressLabel>
                </Progress>
              </div>
            </div>
            <span>Continue</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
