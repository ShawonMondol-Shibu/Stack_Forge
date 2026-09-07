import { apiService } from "@/lib/api-routes/apis";
import { ApiResponse } from "@/lib/types/api";
import {
  UpdateSkillPayload,
  type CreateSkillPayload,
  type Skill,
} from "@/lib/types/skill-type";

export const skillService = {
  addSkill: (data: CreateSkillPayload) => {
    return apiService<ApiResponse<Skill>>({
      endpoint: "/skills",
      method: "POST",
      body: data,
    });
  },

  getMySkills: () => {
    return apiService<ApiResponse<Skill>>({ endpoint: "/skills" });
  },

  updateSkill: (id: string, data: UpdateSkillPayload) => {
    return apiService<ApiResponse<Skill>>({
      endpoint: `/skills/${id}`,
      method: "PATCH",
      body: data,
    });
  },

  deleteSkill: (id: string) => {
    return apiService<ApiResponse<void>>({
      endpoint: `/skills/${id}`,
      method: "DELETE",
    });
  },
};
