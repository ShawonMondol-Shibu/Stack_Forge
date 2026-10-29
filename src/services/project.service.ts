import { apiService } from "@/lib/api-routes/apis";

import type { ApiResponse } from "@/lib/types/api";

import type {
  CreateProjectPayload,
  Project,
  UpdateProjectPayload,
} from "@/lib/types/project-type";

export const projectsService = {
  getAll: () => {
    return apiService<ApiResponse<Project[]>>({
      endpoint: "/projects",
    });
  },

  // Public, login lage na
  getTrending: (limit = 10) => {
    return apiService<ApiResponse<Project[]>>({
      endpoint: `/projects/trending?limit=${limit}`,
    });
  },

  getById: (id: string) => {
    return apiService<ApiResponse<Project>>({
      endpoint: `/projects/${id}`,
    });
  },

  create: (data: CreateProjectPayload) => {
    return apiService<ApiResponse<Project>>({
      endpoint: "/projects",
      method: "POST",
      body: data,
    });
  },

  update: (id: string, data: UpdateProjectPayload) => {
    return apiService<ApiResponse<Project>>({
      endpoint: `/projects/${id}`,
      method: "PATCH",
      body: data,
    });
  },

  delete: (id: string) => {
    return apiService<ApiResponse<{ id: string }>>({
      endpoint: `/projects/${id}`,
      method: "DELETE",
    });
  },

  like: (id: string) => {
    return apiService<ApiResponse<{ id: string }>>({
      endpoint: `/projects/${id}/like`,
      method: "POST",
    });
  },

  unlike: (id: string) => {
    return apiService<ApiResponse<{ id: string }>>({
      endpoint: `/projects/${id}/like`,
      method: "DELETE",
    });
  },
};