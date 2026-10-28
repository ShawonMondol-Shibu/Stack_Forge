import { useCallback } from "react";
import { queryKeys } from "@/lib/Query-keys";
import { followService } from "@/services/follow.service";
import { useQuery } from "@tanstack/react-query";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const followQuery = {
  // enabled = false dile (logged out user) request jabe na
  GetFollowing: (enabled = true) =>
    useQuery({
      queryKey: queryKeys.follows.following,
      queryFn: () => followService.getFollowing(),
      select: (response) => response.data,
      staleTime: STALE_TIME,
      enabled,
    }),

  GetFollowers: (enabled = true) =>
    useQuery({
      queryKey: queryKeys.follows.followers,
      queryFn: () => followService.getFollowers(),
      select: (response) => response.data,
      staleTime: STALE_TIME,
      enabled,
    }),

  GetUserFollowers: (userId: string) =>
    useQuery({
      queryKey: queryKeys.follows.userFollowers(userId),
      queryFn: () => followService.getUserFollowers(userId),
      select: (response) => response.data,
      staleTime: STALE_TIME,
      enabled: Boolean(userId),
    }),

  GetUserFollowing: (userId: string) =>
    useQuery({
      queryKey: queryKeys.follows.userFollowing(userId),
      queryFn: () => followService.getUserFollowing(userId),
      select: (response) => response.data,
      staleTime: STALE_TIME,
      enabled: Boolean(userId),
    }),
};

// Card er jonno: shudhu true/false return kore, tai following list
// change holeo card tokhon-i re-render hoy jokhon ei user er follow status bodlay.
// Cache GetFollowing er sathe shared, extra request hoy na.
export const useIsFollowing = (targetUserId: string, enabled = true) => {
const select = useCallback(
  (response: Awaited<ReturnType<typeof followService.getFollowing>>) =>
    Boolean(response.data?.some((item) => item.id === targetUserId)),
  [targetUserId],
);

  return useQuery({
    queryKey: queryKeys.follows.following,
    queryFn: () => followService.getFollowing(),
    select,
    staleTime: STALE_TIME,
    enabled: enabled && Boolean(targetUserId),
  });
};