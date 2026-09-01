import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectsService } from "@/services/project.service";
import { queryKeys } from "@/lib/Query-keys";
import type {
  CreateProjectPayload,
  UpdateProjectPayload,
} from "@/lib/types/project-type";
import { toast } from "@/components/ui/toast";
import { useProjectStore } from "@/store/useProjectStore";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const addProject = useProjectStore((state) => state.addProject);

  return useMutation({
    mutationFn: (data: CreateProjectPayload) => projectsService.create(data),

    onError: (err) => {
      toast.add({
        type: "error",
        title: err.message || "Failed to create project",
      });
    },

    onSuccess: (res) => {
      // 1. Update Zustand store synchronously for immediate UI feedback
      addProject(res.data);

      // 2. Invalidate cache to ensure server state consistency
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.all,
      });

      const id = toast.add({
        type: "success",
        title: "Project created successfully",
        actionProps: {
          onClick() {
            toast.close(id);
          },
        },
      });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const updateProjectInStore = useProjectStore(
    (state) => state.updateProjectInStore
  );

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectPayload }) =>
      projectsService.update(id, data),

    onError: (err) => {
      toast.add({
        type: "error",
        title: err.message || "Failed to update project",
      });
    },

    onSuccess: (res, variables) => {
      // 1. Update Zustand store synchronously
      updateProjectInStore(res.data);

      // 2. Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.getOne(variables.id),
      });

      toast.add({
        type: "success",
        title: "Project updated successfully",
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const removeProjectFromStore = useProjectStore(
    (state) => state.removeProjectFromStore
  );

  return useMutation({
    mutationFn: (id: string) => projectsService.delete(id),

    onError: (err) => {
      toast.add({
        type: "error",
        title: err.message || "Failed to delete project",
      });
    },

    onSuccess: (res, id) => {
      // 1. Update Zustand store synchronously
      removeProjectFromStore(id);

      // 2. Invalidate cache
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.all,
      });

      toast.add({
        title: res?.message || "Project deleted successfully",
      });
    },
  });
};