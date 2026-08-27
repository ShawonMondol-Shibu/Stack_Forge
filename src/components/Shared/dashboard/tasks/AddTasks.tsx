"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@animateicons/react/lucide";
import { cn } from "@/lib/utils";
import TaskForm from "./TaskForm";

interface PageType {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "xs";
}

export default function AddTasks({
  className,
  variant = "default",
  size = "default",
}: PageType) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant={variant} size={size} className={cn(className)}>
            <PlusIcon /> New Task{" "}
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-6">
            <span
              className={"p-4 bg-primary/10 text-primary w-fit rounded-2xl"}
            >
              <PlusIcon size={30} />
            </span>
            <div>
              <DialogTitle>New Project</DialogTitle>
              <DialogDescription>
                Create new project to start building amazing things
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <TaskForm />
      </DialogContent>
    </Dialog>
  );
}
