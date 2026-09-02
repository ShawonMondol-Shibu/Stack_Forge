import { toast } from "@/components/ui/toast";
import { queryKeys } from "@/lib/Query-keys";
import { type CreateSkillPayload } from "@/lib/types/skill-type";
import { skillService } from "@/services/skill.service";
import useSkillsStore from "@/store/useSkillsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  const addSkillToStore = useSkillsStore((state) => state.addSkillToStore);

  return useMutation({
    mutationFn: (data: CreateSkillPayload) => skillService.addSkill(data),

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
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  const updateSkillInStore = useSkillsStore((state) => state.updateSkillInStore);

  return useMutation({
    mutationFn: (data: CreateSkillPayload) => skillService.updateSkill(data),
    onError: (err) => {
      toast.add({
        type: "error",
        title: err.message || "Failed to update skill",
      });
    },
    onSuccess: (res) => {
      updateSkillInStore(res.data);
      queryClient.invalidateQueries({
        queryKey: queryKeys.skills.all,
      });
      toast.add({
        type: "success",
        title: "Skill updated successfully",
      });
    },
  });
};


export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  const removeSkillFromStore = useSkillsStore((state) => state.removeSkillFromStore);

  return useMutation({
    mutationFn: (id: string) => skillService.deleteSkill(id),
    onError: (err) => {
      toast.add({
        type: "error",
        title: err.message || "Failed to delete skill",
      });
    },
    onSuccess: (res) => {
      removeSkillFromStore(res.data.id);
      queryClient.invalidateQueries({
        queryKey: queryKeys.skills.all,
      });
      toast.add({
        type: "success",
        title: "Skill deleted successfully",
      });
    },
  });
};