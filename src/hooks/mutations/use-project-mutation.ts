import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectsService } from "@/services/project.service";
import { queryKeys } from "@/lib/Query-keys";

import type {
  CreateProjectPayload,
  UpdateProjectPayload,
} from "@/lib/types/project-type";
import { toast } from "@/components/ui/toast";
import { useProjectContext } from "@/context/ProjectContext";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { setProjects } = useProjectContext();

  return useMutation({
    mutationFn: (data: CreateProjectPayload) => projectsService.create(data),

    onError: (err) => {
      console.log(err.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.all,
      });
      setProjects((prev) => [...prev, data.data]);
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
  const { setProjects } = useProjectContext();
  
  return useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdateProjectPayload }) =>
        projectsService.update(id, data),
      
      onSuccess: (res, variables) => {
          queryClient.invalidateQueries({
        queryKey: queryKeys.projects.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.getOne(variables.id),
      });

      setProjects((prev) =>
        prev.map((data) => (data.id === res.data.id ? res.data : data)),
      );
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
          const { setProjects } = useProjectContext();

  return useMutation({
    mutationFn: (id: string) => projectsService.delete(id),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.all,
      });
      setProjects(prev=> prev.filter(res=>res.id !== data.data.id))
      toast.add({
        title: data?.message,
      });
    },
  });
};
