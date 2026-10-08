import { toast } from "@/components/ui/toast";
import { queryKeys } from "@/lib/Query-keys";
import { createExperiencePayload, updateExperiencePayload } from "@/lib/types/experience";
import { experienceService } from "@/services/experience.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useExperienceStore from "@/store/useExperienceStore";

export const experienceMutation = {
  CreateExperience: () => {
    const queryClient = useQueryClient();
    const { addExperience } = useExperienceStore();

    return useMutation({
      mutationFn: (data: createExperiencePayload) => experienceService.create(data),

      onError: (err) => {
        toast.add({
          type: "error",
          title: err.message || "Failed to create experience",
        });
      },

      onSuccess: (res) => {
        addExperience(res.data);

        queryClient.invalidateQueries({
          queryKey: queryKeys.experiences.me,
        });

        const id = toast.add({
          type: "success",
          title: "Experience created successfully",
          actionProps: {
            onClick() {
              toast.close(id);
            },
          },
        });
      },
    });
  },

  UpdateExperience: () => {
    const queryClient = useQueryClient();
    const { updateExperienceInStore } = useExperienceStore();
    return useMutation({
      mutationFn: ({ id, data }: { id: string, data: updateExperiencePayload }) => experienceService.update(id, data),

      onError: (err) => {
        toast.add({
          type: "error",
          title: err.message || "Failed to update Experience",
        });
      },

      onSuccess: (res, variables) => {
        updateExperienceInStore(res.data);

        queryClient.invalidateQueries({
          queryKey: queryKeys.experiences.me,
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.experiences.getOne(variables.id),
        });

        toast.add({
          type: "success",
          title: "Experience updated successfully",
        });
      },
    })
  },


  DeleteExperience: () => {
    const queryClient = useQueryClient();
    const { removeExperienceFromStore } = useExperienceStore();

    return useMutation({
      mutationFn: (id: string) => experienceService.delete(id),

      onError: (err) => {
        toast.add({
          type: "error",
          title: err.message || "Failed to delete experience",
        });
      },

      onSuccess: (res, id) => {
        removeExperienceFromStore(id);

        queryClient.invalidateQueries({
          queryKey: queryKeys.experiences.me,
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.experiences.getOne(id),
        });

        toast.add({
          title: res?.message || "Experience deleted successfully",
        });
      },
    });
  },
  
}