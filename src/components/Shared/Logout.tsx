import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useProfileStore } from "@/store/ProfileStore";
import { useProjectStore } from "@/store/useProjectStore";
import { useTaskStore } from "@/store/TaskStore";
import { useNoteStore } from "@/store/useNoteStore";
import useSkillsStore from "@/store/useSkillsStore";
import { useTechStackStore } from "@/store/TechStackStore";
import useExperienceStore from "@/store/useExperienceStore";
import { useEducationStore } from "@/store/useEducationStore";
import { useFollowStore } from "@/store/useFollowStore";
import { authClient } from "../../lib/auth-client";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const clearUserData = () => {
    useProfileStore.getState().setProfile({});
    useProjectStore.getState().setProjects([]);
    useTaskStore.getState().setTask([]);
    useNoteStore.getState().setNotes([]);
    useSkillsStore.getState().setSkills({});
    useTechStackStore.getState().setTechStack([]);
    useExperienceStore.getState().setExperiences([]);
    useEducationStore.getState().setEducations([]);
    useFollowStore.getState().setFollowing([]);

    useProfileStore.persist.clearStorage();
    useProjectStore.persist.clearStorage();
    useTaskStore.persist.clearStorage();
    useNoteStore.persist.clearStorage();
    useSkillsStore.persist.clearStorage();
    useTechStackStore.persist.clearStorage();
    useExperienceStore.persist.clearStorage();

    queryClient.clear();
  };

  return async () => {
    clearUserData();

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          clearUserData();
          router.replace("/login");
        },
      },
    });
  };
};
