import React from "react";
import { ItemGroup } from "../ui/item";
import {
  CalendarDays,
  CheckCircle,
  FolderCode,
  NotebookPen,
  PencilLine,
} from "lucide-react";
import QuickActionItem from "../Shared/QuickActionItem";

export default function QuickActions() {
  const actionData = [
    {
      title: "New Project",
      subtitle: "start something new",
      color: "primary",
      icon: FolderCode,
    },
    {
      title: "New Task",
      subtitle: "Add a new task",
      color: "green-500",
      icon: CheckCircle,
    },
    {
      title: "New Note",
      subtitle: "Write something",
      color: "amber-500",
      icon: NotebookPen,
    },
    {
      title: "New Event",
      subtitle: "Add to calender",
      color: "primary",
      icon: CalendarDays,
    },
    {
      title: "Create Post",
      subtitle: "Share with community",
      color: "amber-500",
      icon: PencilLine,
    },
  ];
  return (
    <section className="space-y-1">
      <h1 className="text-xl font-bold">Quick Actions</h1>
      <ItemGroup className={"grid grid-cols-5 items-center justify-center gap-4"}>
        {actionData.map((data, i) => (
          <QuickActionItem key={i} data={data} />
        ))}
      </ItemGroup>
    </section>
  );
}
