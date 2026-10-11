import { apiService } from "@/lib/api-routes/apis";
import type { ApiResponse } from "@/lib/types/api";
import type {
  CreateEducationData,
  EducationRecord,
  UpdateEducationData,
} from "@/lib/types/education";

export const educationService = {
  create: (data: CreateEducationData) =>
    apiService<ApiResponse<EducationRecord>>({
      endpoint: "/education",
      method: "POST",
      body: data,
    }),

  getMy: () =>
    apiService<ApiResponse<EducationRecord[]>>({ endpoint: "/education" }),

  getByUser: (userId: string) =>
    apiService<ApiResponse<EducationRecord[]>>({
      endpoint: `/education/user/${userId}`,
    }),

  getOne: (id: string) =>
    apiService<ApiResponse<EducationRecord>>({ endpoint: `/education/${id}` }),

  update: (id: string, data: UpdateEducationData) =>
    apiService<ApiResponse<EducationRecord>>({
      endpoint: `/education/${id}`,
      method: "PATCH",
      body: data,
    }),

  delete: (id: string) =>
    apiService<ApiResponse<EducationRecord>>({
      endpoint: `/education/${id}`,
      method: "DELETE",
    }),
};
