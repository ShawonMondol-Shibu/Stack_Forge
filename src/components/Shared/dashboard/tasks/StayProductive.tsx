import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { FaClipboardList } from "react-icons/fa";
import AddTasks from "./AddTasks";

export default function StayProductive() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6 items-center justify-center">
        <div className="flex items-center gap-6">
          <FaClipboardList size={80} className="text-primary"/>
          <span>
            <CardTitle>Stay Productive!</CardTitle>
            <CardDescription>
              Break down tasks, track progress, and achieve your goals.
            </CardDescription>
          </span>
        </div>
        <AddTasks/>
      </CardContent>
    </Card>
  );
}
