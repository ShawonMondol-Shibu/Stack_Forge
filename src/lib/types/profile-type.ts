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
  viewCount?: number | null;
  viewedProfile?: string[];
  availability?: AvailabilityStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  fullName: string;
  headline?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatarUrl?: string;
  coverUrl?: string;
  availability: AvailabilityStatus;
}
