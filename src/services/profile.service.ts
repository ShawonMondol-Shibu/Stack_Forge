import { apiService } from "@/lib/api-routes/apis";
import { ApiResponse } from "@/lib/types/api";
import { UpdateProfileData, UserProfile } from "@/lib/types/profile-type";

export const profileService = {
  getMyProfile: () => {
    return apiService<ApiResponse<UserProfile>>({
      endpoint: "/profile",
    });
  },
  getAllProfiles: () => {
    return apiService<ApiResponse<UserProfile[]>>({
      endpoint: "/profile/all",
    });
  },
  getProfileById: (id: string) => {
    return apiService<ApiResponse<UserProfile>>({
      endpoint: `/profile/${id}`,
    });
  },
  updateProfile: (id: string, data: UpdateProfileData) => {
    return apiService<ApiResponse<UserProfile>>({
      endpoint: `/profile/${id}`,
      method: "PATCH",
      body: data,
    });
  },
};
