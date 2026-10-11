import { toast } from "@/components/ui/toast";
import { queryKeys } from "@/lib/Query-keys";
import type {
  CreateEducationData,
  UpdateEducationData,
} from "@/lib/types/education";
import { educationService } from "@/services/education.service";
import { useEducationStore } from "@/store/useEducationStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const educationMutation = {
  CreateEducation: () => {
    const queryClient = useQueryClient();
    const addEducation = useEducationStore((state) => state.addEducation);

    return useMutation({
      mutationFn: (data: CreateEducationData) => educationService.create(data),
      onError: (error) => {
        toast.add({
          type: "error",
          title: error.message || "Failed to add education",
        });
      },
      onSuccess: (response) => {
        addEducation(response.data);
        void queryClient.invalidateQueries({
          queryKey: queryKeys.educations.me,
        });
        toast.add({
          type: "success",
          title: "Education added successfully",
        });
      },
    });
  },

  UpdateEducation: () => {
    const queryClient = useQueryClient();
    const updateEducation = useEducationStore((state) => state.updateEducation);

    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateEducationData }) =>
        educationService.update(id, data),
      onError: (error) => {
        toast.add({
          type: "error",
          title: error.message || "Failed to update education",
        });
      },
      onSuccess: (response, variables) => {
        updateEducation(response.data);
        void queryClient.invalidateQueries({
          queryKey: queryKeys.educations.me,
        });
        void queryClient.invalidateQueries({
          queryKey: queryKeys.educations.getOne(variables.id),
        });
        toast.add({
          type: "success",
          title: "Education updated successfully",
        });
      },
    });
  },

  DeleteEducation: () => {
    const queryClient = useQueryClient();
    const removeEducation = useEducationStore((state) => state.removeEducation);

    return useMutation({
      mutationFn: (id: string) => educationService.delete(id),
      onError: (error) => {
        toast.add({
          type: "error",
          title: error.message || "Failed to delete education",
        });
      },
      onSuccess: (response, id) => {
        removeEducation(id);
        void queryClient.invalidateQueries({
          queryKey: queryKeys.educations.me,
        });
        void queryClient.invalidateQueries({
          queryKey: queryKeys.educations.getOne(id),
        });
        toast.add({
          type: "success",
          title: response.message || "Education deleted successfully",
        });
      },
    });
  },
};
