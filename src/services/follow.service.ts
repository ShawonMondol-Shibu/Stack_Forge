import { apiService } from "@/lib/api-routes/apis";
import type { ApiResponse } from "@/lib/types/api";
import type { CreateFollowData, FollowRecord } from "@/lib/types/follow";

export const followService = {
  follow: (data: CreateFollowData) =>
    apiService<ApiResponse<FollowRecord>>({
      endpoint: "/follows",
      method: "POST",
      body: data,
    }),

  getFollowing: () =>
    apiService<ApiResponse<FollowRecord[]>>({ endpoint: "/follows" }),

  getFollowers: () =>
    apiService<ApiResponse<FollowRecord[]>>({ endpoint: "/follows/followers" }),

  getUserFollowers: (userId: string) =>
    apiService<ApiResponse<FollowRecord[]>>({
      endpoint: `/follows/${encodeURIComponent(userId)}/followers`,
    }),

  getUserFollowing: (userId: string) =>
    apiService<ApiResponse<FollowRecord[]>>({
      endpoint: `/follows/${encodeURIComponent(userId)}/following`,
    }),

  unfollow: (followingId: string) =>
    apiService<ApiResponse<FollowRecord>>({
      endpoint: `/follows/${encodeURIComponent(followingId)}`,
      method: "DELETE",
    }),
};
