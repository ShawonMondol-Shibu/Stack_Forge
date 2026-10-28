import { useCallback } from "react";
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

// Store gulo persist kora (localStorage e save hoy)
const persistedStores = [
  useProfileStore,
  useProjectStore,
  useTaskStore,
  useNoteStore,
  useSkillsStore,
  useTechStackStore,
  useExperienceStore,
];

const resetStores = () => {
  useProfileStore.getState().setProfile({});
  useProjectStore.getState().setProjects([]);
  useTaskStore.getState().setTask([]);
  useNoteStore.getState().setNotes([]);
  useSkillsStore.getState().setSkills({});
  useTechStackStore.getState().setTechStack([]);
  useExperienceStore.getState().setExperiences([]);
  useEducationStore.getState().setEducations([]);
  useFollowStore.getState().setFollowing([]);

  // State reset er por storage clear, jate empty value rewrite hoye na thake
  persistedStores.forEach((store) => store.persist.clearStorage());
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useCallback(async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // Sign out successful hole-i data muchbe, ekbar-i
          resetStores();
          queryClient.clear();
          router.replace("/login");
          router.refresh(); // server component cache o refresh
        },
      },
    });
  }, [router, queryClient]);
};