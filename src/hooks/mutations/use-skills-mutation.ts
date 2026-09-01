import useSkillsStore from "@/store/useSkillsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  const addSkillToStore = useSkillsStore((state) => state.addSkillToStore);

  return useMutation({
    mutationFn: (data: CreateSkillPayload) => skillsService.create(data),

    onError: (err) => {
      toast.add({
        type: "error",
        title: err.message || "Failed to create skill",
      });
    },

    onSuccess: (res) => {
      // 1. Update Zustand store synchronously
      addSkillToStore(res.data);

      // 2. Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.skills.all,
      });

      toast.add({
        type: "success",
        title: "Skill created successfully",
      });
    },
  });
}