import { queryKeys } from "@/lib/Query-keys";
import { followService } from "@/services/follow.service";
import { useQuery } from "@tanstack/react-query";

export const followQuery = {
  GetFollowing: () =>
    useQuery({
      queryKey: queryKeys.follows.following,
      queryFn: followService.getFollowing,
      select: (response) => response.data,
    }),

  GetFollowers: () =>
    useQuery({
      queryKey: queryKeys.follows.followers,
      queryFn: followService.getFollowers,
      select: (response) => response.data,
    }),

  GetUserFollowers: (userId: string) =>
    useQuery({
      queryKey: queryKeys.follows.userFollowers(userId),
      queryFn: () => followService.getUserFollowers(userId),
      select: (response) => response.data,
      enabled: Boolean(userId),
    }),

  GetUserFollowing: (userId: string) =>
    useQuery({
      queryKey: queryKeys.follows.userFollowing(userId),
      queryFn: () => followService.getUserFollowing(userId),
      select: (response) => response.data,
      enabled: Boolean(userId),
    }),
};
