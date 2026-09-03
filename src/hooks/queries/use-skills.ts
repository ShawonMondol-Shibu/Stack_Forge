import { useQuery } from "@tanstack/react-query";
import { skillService } from "@/services/skill.service";
import { queryKeys } from "@/lib/Query-keys";

export const useSkills = () => {
  return useQuery({
    queryKey: queryKeys.skills.all,
    queryFn: skillService.getMySkills,
    select: (data) => data.data,
  });
};
