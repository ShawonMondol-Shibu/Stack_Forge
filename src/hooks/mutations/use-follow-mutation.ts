import { toast } from "@/components/ui/toast";
import { queryKeys } from "@/lib/Query-keys";
import type { CreateFollowData } from "@/lib/types/follow";
import { followService } from "@/services/follow.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const followMutation = {
  Follow: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: CreateFollowData) => followService.follow(data),
      onError: (error) => {
        toast.add({
          type: "error",
          title: error.message || "Could not follow this profile",
        });
      },
      onSuccess: async (_response, variables) => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: queryKeys.follows.following,
          }),
          queryClient.invalidateQueries({
            queryKey: queryKeys.follows.userFollowers(variables.followingId),
          }),
        ]);
        toast.add({ type: "success", title: "Profile followed" });
      },
    });
  },

  Unfollow: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (followingId: string) => followService.unfollow(followingId),
      onError: (error) => {
        toast.add({
          type: "error",
          title: error.message || "Could not unfollow this profile",
        });
      },
      onSuccess: async (_response, followingId) => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: queryKeys.follows.following,
          }),
          queryClient.invalidateQueries({
            queryKey: queryKeys.follows.userFollowers(followingId),
          }),
        ]);
        toast.add({ type: "success", title: "Profile unfollowed" });
      },
    });
  },
};
