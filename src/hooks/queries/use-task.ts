import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/lib/api-routes/apis";
import { taskType } from "@/lib/types/task-type";
import { ApiResponse } from "@/lib/types/api";
import { queryKeys } from "@/lib/Query-keys";

export const TaskQuery = {
  GetAllTasks: () => {
    return useQuery({
      queryKey: queryKeys.tasks.all,
      queryFn: async () =>
        apiService<ApiResponse<taskType[]>>({ endpoint: "/tasks" }),
      select: (data) => data.data,
    });
  },

  GetTaskById: (id: string) => {
    return useQuery({
      queryKey: queryKeys.tasks.getOne(id),
      queryFn: async () =>
        apiService<ApiResponse<taskType>>({ endpoint: `/tasks/${id}` }),
      select: (data) => data.data,
    });
  },
};
