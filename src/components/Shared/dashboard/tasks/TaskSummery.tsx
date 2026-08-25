import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CircleCheckIcon,
  ClockIcon,
  ShoppingBagIcon,
  CalendarIcon,
} from "@animateicons/react/lucide";
import React from "react";

const summaryData = [
  { icon: ShoppingBagIcon, title: "Total Tasks", value: 24 },
  { icon: CircleCheckIcon, title: "Completed", value: 16 },
  { icon: ClockIcon, title: "Overdue", value: 3 },
  { icon: CalendarIcon, title: "This Week", value: 5 },
];

export default function TaskSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {summaryData.map((summary, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-primary/10 p-4 w-full rounded-xl "
          >
            <summary.icon size={30} className={"text-primary"} />
            <div className="flex flex-col">
              <span className="text-lg text-primary font-semibold">
                {summary.value}
              </span>
              <span className="capitalize text-xs">{summary.title}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
