import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/ProfileStore";
import { useProjectStore } from "@/store/useProjectStore";
import { useTaskStore } from "@/store/TaskStore";
import { useNoteStore } from "@/store/useNoteStore";
import useSkillsStore from "@/store/useSkillsStore";
import { useTechStackStore } from "@/store/TechStackStore";
import { authClient } from "./auth-client";

export const HandleLogout = () => {
  const router = useRouter();
  const { setProfile } = useProfileStore();
  const { setProjects } = useProjectStore();
  const { setTask } = useTaskStore();
  const { setNotes } = useNoteStore();
  const { setSkills } = useSkillsStore();
  const { setTechStack } = useTechStackStore();

  authClient.signOut();
  setProfile({});
  setProjects([]);
  setTask([]);
  setNotes([]);
  setSkills({});
  setTechStack([]);
  router.push("/login");
};
