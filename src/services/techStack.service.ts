import { apiService } from "@/lib/api-routes/apis";
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
    return apiService({
      endpoint: "/tech-stacks",
      method: "GET",
    })
  },

  getById: (id: string) => {
    return apiService({
      endpoint: `/tech-stacks/${id}`,
      method: "GET",
    })
  },
  update: (id: string, data: TechStackItem) => {
    return apiService({
      endpoint: `/tech-stacks/${id}`,
      method: "PUT",
      body: data,
    })
  },
  delete: (id: string) => {
    return apiService({
      endpoint: `/tech-stacks/${id}`,
      method: "DELETE",
    })
  },
}