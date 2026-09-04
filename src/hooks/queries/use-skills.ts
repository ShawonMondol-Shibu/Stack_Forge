import { useQuery } from "@tanstack/react-query";
import { skillService } from "@/services/skill.service";
import { queryKeys } from "@/lib/Query-keys";

export const useSkillsQuery = () => {
  return useQuery({
    queryKey: queryKeys.skills.all,
    queryFn: skillService.getMySkills,
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};
