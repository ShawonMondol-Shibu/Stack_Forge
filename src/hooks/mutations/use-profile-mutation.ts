import { toast } from "@/components/ui/toast";
import { queryKeys } from "@/lib/Query-keys";
import type { UpdateProfileData } from "@/lib/types/profile-type";
import { profileService } from "@/services/profile.service";
import { useProfileStore } from "@/store/ProfileStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  const setProfile = useProfileStore((state) => state.setProfile);

  return useMutation({
    mutationFn: (data: UpdateProfileData) => profileService.createProfile(data),
    onError: (error) => {
      toast.add({
        type: "error",
        title: error.message || "Failed to create profile",
      });
    },
    onSuccess: (response) => {
      setProfile(response.data);
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.me });
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.allProfiles,
      });
      toast.add({
        type: "success",
        title: "Profile created successfully",
      });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setProfile = useProfileStore((state) => state.setProfile);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProfileData }) =>
      profileService.updateProfile(id, data),
    onError: (error) => {
      toast.add({
        type: "error",
        title: error.message || "Failed to update profile",
      });
    },
    onSuccess: (response, variables) => {
      setProfile(response.data);
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.me });
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.profile(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.profile.allProfiles,
      });
      toast.add({
        type: "success",
        title: "Profile updated successfully",
      });
    },
  });
};
