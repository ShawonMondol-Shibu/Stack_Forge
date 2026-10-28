import { toast } from "@/components/ui/toast";
import { queryKeys } from "@/lib/Query-keys";
import type { CreateFollowData } from "@/lib/types/follow";
import { followService } from "@/services/follow.service";
import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";

// Follow/unfollow er por jei query gulo purono hoye jay, shob ek jaygay
const invalidateFollowQueries = (
  queryClient: QueryClient,
  targetUserId: string,
  currentUserId?: string,
) =>
  Promise.all([
    // Ami kake follow kori (list)
    queryClient.invalidateQueries({ queryKey: queryKeys.follows.following }),
    // Target user er follower count
    queryClient.invalidateQueries({
      queryKey: queryKeys.follows.userFollowers(targetUserId),
    }),
    // Amar nijer "Following" count (staleTime er karone eta na dile 5 min purono thake)
    currentUserId
      ? queryClient.invalidateQueries({
          queryKey: queryKeys.follows.userFollowing(currentUserId),
        })
      : undefined,
  ]);

export const followMutation = {
  Follow: (currentUserId?: string) => {
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
        // Toast age, user ke sathe sathe feedback dao
        toast.add({ type: "success", title: "Profile followed" });
        // Await kora hoyeche, tai refetch shesh na howa porjonto mutation pending thake
        await invalidateFollowQueries(
          queryClient,
          variables.followingId,
          currentUserId,
        );
      },
    });
  },

  Unfollow: (currentUserId?: string) => {
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
        toast.add({ type: "success", title: "Profile unfollowed" });
        await invalidateFollowQueries(queryClient, followingId, currentUserId);
      },
    });
  },
};