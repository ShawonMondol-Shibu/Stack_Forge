import { toast } from "@/components/ui/toast";
import { queryKeys } from "@/lib/Query-keys";
import { CreateTaskPayload, UpdateTaskPayload } from "@/lib/types/task-type";
import { taskService } from "@/services/task.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const TaskMutation = {
  useCreateTask: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: CreateTaskPayload) => taskService.create(data),

      onError: (err) => {
        toast.add({
          type: "error",
          title: err.message || "Failed to create task",
        });
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.tasks.all,
        });
        toast.add({
          type: "success",
          title: "Task created successfully",
        });
      },
    });
  },

  useUpdateTask: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateTaskPayload }) =>
        taskService.update(id, data),

      onError: (err) => {
        toast.add({
          type: "error",
          title: err.message || "Failed to update task",
        });
      },

      onSuccess: (res, variables) => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.tasks.all,
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.tasks.getOne(variables.id),
        });
        toast.add({
          type: "success",
          title: "Task updated successfully",
        });
      },
    });
  },

  useDeleteTask: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => taskService.delete(id),

      onError: (err) => {
        toast.add({
          type: "error",
          title: err.message || "Failed to delete task",
        });
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.tasks.all,
        });
        toast.add({
          type: "success",
          title: "Task deleted successfully",
        });
      },
    });
  },
};
