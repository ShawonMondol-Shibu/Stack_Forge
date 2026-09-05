import { apiService } from "@/lib/api-routes/apis";
import { ApiResponse } from "@/lib/types/api";
import { TechStackItem } from "@/lib/types/techStack-type";

export const techStackService = {
  create: (data: TechStackItem) => {
    return apiService({
      endpoint: "/tech-stacks",
      method: "POST",
      body: data,
    })
  },
  getAll: () => {
    return apiService<ApiResponse<TechStackItem[]>>({
      endpoint: "/tech-stacks",
      method: "GET",
    })
  },

  getById: (id: string) => {
    return apiService<ApiResponse<TechStackItem>>({
      endpoint: `/tech-stacks/${id}`,
      method: "GET",
    })
  },
  update: (id: string, data: TechStackItem) => {
    return apiService<ApiResponse<TechStackItem>>({
      endpoint: `/tech-stacks/${id}`,
      method: "PUT",
      body: data,
    })
  },
  delete: (id: string) => {
    return apiService<ApiResponse<TechStackItem>>({
      endpoint: `/tech-stacks/${id}`,
      method: "DELETE",
    })
  },
}