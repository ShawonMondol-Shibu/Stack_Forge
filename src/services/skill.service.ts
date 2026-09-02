import { apiService } from "@/lib/api-routes/apis";
import { ApiResponse } from "@/lib/types/api";
import { type CreateSkillPayload, type Skill } from "@/lib/types/skill-type";

export const skillService = {
  getMySkills: () => {
    return apiService<ApiResponse<Skill>>({ endpoint: "/skills" });
  },

  addSkill: (data: CreateSkillPayload) => {
    return apiService<ApiResponse<Skill>>({
      endpoint: "/skills",
      method: "POST",
      body: data,
    });
  },

  updateSkill: (data: Skill) => {
    return apiService<Skill>({
      endpoint: `/skills/${data.id}`,
      method: "PUT",
      body: data,
    });
  },

  deleteSkill: (id: string) => {
    return apiService({ endpoint: `/skills/${id}`, method: "DELETE" });
  },
};
