import { apiService } from "@/lib/api-routes/apis";
import { ApiResponse } from "@/lib/types/api";
import { CreateTaskPayload, taskType, UpdateTaskPayload } from "@/lib/types/task-type";

export const taskService = {
  getAll: () => {
    return apiService<ApiResponse<taskType[]>>({
      endpoint: "/tasks",
    });
  },

  getById: (id: string) => {
    return apiService<ApiResponse<taskType>>({
      endpoint: `/tasks/${id}`,
    });
  },

  create: (data: CreateTaskPayload) => {
    return apiService<ApiResponse<taskType>>({
      endpoint: "/tasks",
      method: "POST",
      body: data,
    });
  },

  update: (id: string, data: UpdateTaskPayload) => {
    return apiService<ApiResponse<taskType>>({
      endpoint: `/tasks/${id}`,
      method: "PATCH",
      body: data,
    });
  },

  delete: (id: string) => {
    return apiService<ApiResponse<{ id: string }>>({
      endpoint: `/tasks/${id}`,
      method: "DELETE",
    });
  },
};
