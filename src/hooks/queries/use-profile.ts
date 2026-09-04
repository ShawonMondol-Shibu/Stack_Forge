import { apiService } from "@/lib/api-routes/apis";
import { queryKeys } from "@/lib/Query-keys";
import { ApiResponse } from "@/lib/types/api";
import { UserProfile } from "@/lib/types/profile-type";
import { useQuery } from "@tanstack/react-query";

export const profileQuery = {
  GetProfile: () => {
    return useQuery({
      queryKey: queryKeys.profile.me,
      queryFn: async () =>
        apiService<ApiResponse<UserProfile>>({ endpoint: "/profile" }),
      select: (data) => data.data,
    });
  },
  GetProfileById: (id: string) => {
    return useQuery({
      queryKey: queryKeys.profile.profile(id),
      queryFn: async () =>
        apiService<ApiResponse<UserProfile>>({ endpoint: `/profile/${id}` }),
      select: (data) => data.data,
    });
  },
};
