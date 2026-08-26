"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderIcon, PlusIcon } from "@animateicons/react/lucide";
import { z } from "zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiService } from "@/lib/api-routes/apis";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTaskContext } from "@/context/TaskContext";
import { taskType } from "@/lib/types/task-type";

const priorityEnum = ["high", "medium", "low"];
const statusEnum = ["todo", "in_progress", "done"];

const taskSchema = z.object({
  title: z.string().min(2, { message: "Must enter your task title." }),
  priority: z.enum(priorityEnum, {
    message: "Please select priority: high, medium or low.",
  }),
  status: z.enum(statusEnum, {
    message: "Please select status: todo, inprogress or done.",
  }),
});

type formType = z.infer<typeof taskSchema>;

type AddTaskResponse = {
  message: string;
  data: taskType;
};

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
  const { setTasks } = useTaskContext();

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-task"],
    mutationFn: (data: formType) =>
      apiService<AddTaskResponse>({
        endpoint: "/tasks",
        method: "POST",
        body: data,
      }),
    onSuccess: (data) => {
      setTasks((prev) => [...prev, data?.data]);
      toast.add({
        type: "success",
        title: `${data?.message}`,
      });
    },
    onError: (err) => {
      toast.add({
        type: "error",
        title: `${err.message}`,
      });
      console.log(err.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<formType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      priority: "",
      status: "",
    },
  });

  const handleAddTask = (data: formType) => {
    mutate(data);
  };
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

        <form onSubmit={handleSubmit(handleAddTask)}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor={"title"}>Task Title</Label>
              <InputGroup>
                <InputGroupInput
                  {...register("title")}
                  name={"title"}
                  placeholder={"Enter task title..."}
                />
              </InputGroup>
              {errors.title?.message && (
                <p className="text-red-500">{errors.title?.message}</p>
              )}
            </div>

            <div className="flex items-center gap-6 justify-between">
              {/* Priority Field */}
              <div className="space-y-2">
                <Label htmlFor={"priority"}>Priority</Label>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue
                          className={"capitalize"}
                          placeholder="Entery your Priority"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {priorityEnum.map((priority, i) => (
                            <SelectItem
                              key={i}
                              value={priority}
                              className={"capitalize"}
                            >
                              {priority}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.priority?.message && (
                  <p className="text-red-500">{errors.priority?.message}</p>
                )}
              </div>
              {/* Status Field */}
              <div className="space-y-2">
                <Label htmlFor={"status"}>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue
                          className={"capitalize"}
                          placeholder="Entery your status"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {statusEnum.map((priority, i) => (
                            <SelectItem
                              key={i}
                              value={priority}
                              className={"capitalize"}
                            >
                              {priority}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status?.message && (
                  <p className="text-red-500">{errors.status?.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <DialogClose>
                <Button variant={"outline"}>Cancel</Button>{" "}
              </DialogClose>
              <Button type={"submit"} size={isPending ? "icon-sm": "default"} disabled={isPending}>
                {isPending ? <LoaderIcon /> : "Add Task"}
              </Button>
            </div>
          </div>
          <Toaster />
        </form>
      </DialogContent>
    </Dialog>
  );
}
