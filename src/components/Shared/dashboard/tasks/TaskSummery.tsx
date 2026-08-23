import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBagIcon } from "@animateicons/react/lucide";
import React from "react";

export default function TaskSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-4 bg-primary/20 p-4 w-full rounded-xl ">
          <ShoppingBagIcon size={30} className="text-primary" />
          <div className="flex flex-col">
            <span className="text-lg text-primary font-semibold">24</span>
            <span className="capitalize text-xs">Total Tasks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
