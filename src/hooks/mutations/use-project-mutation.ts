import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";

import { projectsService } from "@/services/project.service";
import { queryKeys } from "@/lib/Query-keys";
import type { ApiResponse } from "@/lib/types/api";
import type {
  CreateProjectPayload,
  Project,
  UpdateProjectPayload,
} from "@/lib/types/project-type";
import { toast } from "@/components/ui/toast";
import { useProjectStore } from "@/store/useProjectStore";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  // Selector: action gulo stable, tai store bodlale ei hook er component re-render hoy na
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
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.trending,
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
    (state) => state.updateProjectInStore,
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
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.trending,
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
    (state) => state.removeProjectFromStore,
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
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.trending,
      });

      toast.add({
        title: res?.message || "Project deleted successfully",
      });
    },
  });
};

type TrendingCache = ApiResponse<Project[]>;

// Cache e thaka shob trending list e ekta project er like state + count bodlay
const patchTrending = (
  queryClient: QueryClient,
  projectId: string,
  liked: boolean,
) => {
  const delta = liked ? 1 : -1;
  queryClient.setQueriesData<TrendingCache>(
    { queryKey: queryKeys.projects.trending },
    (old) =>
      old && {
        ...old,
        data: old.data.map((p) =>
          p.id === projectId
            ? {
                ...p,
                likedByMe: liked,
                totalLikes: Math.max((p.totalLikes ?? 0) + delta, 0),
                recentLikes: Math.max((p.recentLikes ?? 0) + delta, 0),
              }
            : p,
        ),
      },
  );
};

// Like/unlike er common optimistic logic: button sathe sathe bodlay,
// error hole purono state e ferot jay. Success e refetch kori na,
// tai like dile card trending list e jaygay boshe thake, lafiye ne.
const useLikeMutation = (liked: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      liked ? projectsService.like(id) : projectsService.unlike(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.projects.trending,
      });
      const snapshots = queryClient.getQueriesData<TrendingCache>({
        queryKey: queryKeys.projects.trending,
      });
      patchTrending(queryClient, id, liked);
      return { snapshots };
    },

    onError: (err, _id, context) => {
      context?.snapshots.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
      toast.add({
        type: "error",
        title:
          err.message ||
          (liked ? "Failed to like project" : "Failed to unlike project"),
      });
    },
  });
};

export const useLikeProject = () => useLikeMutation(true);
export const useUnlikeProject = () => useLikeMutation(false);