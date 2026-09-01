import { create } from "zustand";
import { UserProfile } from "@/lib/types/profile-type";

export interface ProfileStoreType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
}

const initialProfile: UserProfile = {
  id: "",
  userId: "",
  fullName: "",
  headline: "",
  bio: "",
  location: "",
  website: "",
  avatarUrl: "",
  coverUrl: null,
  availability: "open",
  createdAt: "",
  updatedAt: "",
};

export const useProfileStore = create<ProfileStoreType>((set) => ({
  profile: initialProfile,
  setProfile: (profile) => set({ profile }),
}));