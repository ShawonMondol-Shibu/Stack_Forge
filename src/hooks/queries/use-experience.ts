import { queryKeys } from "@/lib/Query-keys";
import { experienceService } from "@/services/experience.service";
import { useQuery } from "@tanstack/react-query";

export const experienceQuery = {
  GetMy: () => {
    return useQuery({
      queryKey: queryKeys.experiences.me,
      queryFn: experienceService.getMy,
      select: (res) => res.data,
    });
  },

  GetByProfile: (id: string) => {
    return useQuery({
      queryKey: queryKeys.experiences.profileExperience(id),
      queryFn: async () => experienceService.getProfileExperiences(id),
      select: (res) => res.data,
    });
  },
};
