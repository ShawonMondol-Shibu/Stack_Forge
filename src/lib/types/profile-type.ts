export type AvailabilityStatus = "open" | "busy" | "unavailable";

export interface UserProfile {
  id?: string;
  userId?: string;
  fullName?: string;
  headline?: string | null;
  bio?: string | null;
  location?: string | null;
  website?: string | null;
  avatarUrl?: string | null;
  coverUrl?: string | null;
  availability?: AvailabilityStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileData { profile: Partial<Omit<UserProfile, "id" | "userId" | "createdAt" | "updatedAt">> }