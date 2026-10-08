import { apiService } from "@/lib/api-routes/apis";
import { ApiResponse } from "@/lib/types/api";
import Experience, {
  createExperiencePayload,
  updateExperiencePayload,
} from "@/lib/types/experience";

export const experienceService = {
  create: (data: createExperiencePayload) => {
    return apiService<ApiResponse<Experience>>({
      endpoint: "/experiences",
      method: "POST",
      body: data,
    });
  },

  getMy: () => {
    return apiService<ApiResponse<Experience[]>>({ endpoint: "/experiences" });
  },

  getProfileExperiences: (profileId: string) => {
    return apiService<ApiResponse<Experience[]>>({ endpoint: `/experiences/profile/${profileId}` });
  },

  update: (id: string, data: updateExperiencePayload) => {
    return apiService<ApiResponse<Experience>>({
      endpoint: `/experiences/${id}`,
      method: "PATCH",
      body: data,
    });
  },

  delete: (id: string) => {
    return apiService<ApiResponse<Experience>>({ endpoint: `/experiences/${id}` });
  },
};
