import { create } from "zustand";
import type { FollowRecord } from "@/lib/types/follow";

interface FollowStore {
  following: FollowRecord[];
  setFollowing: (following: FollowRecord[]) => void;
  addFollowing: (follow: FollowRecord) => void;
  removeFollowing: (followingId: string) => void;
}

export const useFollowStore = create<FollowStore>()((set) => ({
  following: [],
  setFollowing: (following) => set({ following }),
  addFollowing: (follow) =>
    set((state) => ({
      following: state.following.some(
        (item) => item.followingId === follow.followingId,
      )
        ? state.following
        : [...state.following, follow],
    })),
  removeFollowing: (followingId) =>
    set((state) => ({
      following: state.following.filter(
        (item) => item.followingId !== followingId,
      ),
    })),
}));
