import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/Query-keys";
import { taskService } from "@/services/task.service";

export const TaskQuery = {
  GetAllTasks: () => {
    return useQuery({
      queryKey: queryKeys.tasks.all,
      queryFn: async () => taskService.getAll(),
      select: (data) => data.data,
    });
  },

  GetTaskById: (id: string) => {
    return useQuery({
      queryKey: queryKeys.tasks.getOne(id),
      queryFn: async () => taskService.getById(id),
      select: (data) => data.data,
    });
  },
};
