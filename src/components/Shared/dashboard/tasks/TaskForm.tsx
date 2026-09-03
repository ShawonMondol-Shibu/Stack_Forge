"use client";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Toaster } from "@/components/ui/toast";
import React from "react";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "@animateicons/react/lucide";
import { TaskMutation } from "@/hooks/mutations/use-task-mutation";

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

export type formType = z.infer<typeof taskSchema>;


export default function TaskForm() {
const {mutate, isPending} = TaskMutation.useCreateTask()
  

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
          <Button
            type={"submit"}
            size={isPending ? "icon-sm" : "default"}
            disabled={isPending}
          >
            {isPending ? <LoaderIcon /> : "Add Task"}
          </Button>
        </div>
      </div>
      <Toaster />
    </form>
  );
}
