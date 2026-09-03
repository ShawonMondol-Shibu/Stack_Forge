import { toast } from "@/components/ui/toast";
import { queryKeys } from "@/lib/Query-keys";
import { UpdateSkillPayload, type CreateSkillPayload } from "@/lib/types/skill-type";
import { skillService } from "@/services/skill.service";
import useSkillsStore from "@/store/useSkillsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  const {setSkills} = useSkillsStore();

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
      setSkills(res.data);

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
    mutationFn: ({id, data}: {id: string, data: UpdateSkillPayload}) => skillService.updateSkill(id, data),
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
    onSuccess: (res, id) => {
      removeSkillFromStore(id);
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