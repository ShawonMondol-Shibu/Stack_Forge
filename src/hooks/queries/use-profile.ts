import { queryKeys } from "@/lib/Query-keys";
import { profileService } from "@/services/profile.service";
import { useQuery } from "@tanstack/react-query";

export const profileQuery = {
 GetMyProfile: (enabled = true) =>
  useQuery({
    queryKey: queryKeys.profile.me,
    queryFn: async () => profileService.getMyProfile(),
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5,
    enabled,
  }),
  GetAllProfiles: () => {
    return useQuery({
      queryKey: queryKeys.profile.allProfiles,
      queryFn: async () => profileService.getAllProfiles(),
      select: (data) => data.data,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  },
  GetProfileById: (id: string) => {
    return useQuery({
      queryKey: queryKeys.profile.profile(id),
      queryFn: async () => profileService.getProfileById(id),
      select: (data) => data.data,
      enabled: Boolean(id),
    });
  },
};
