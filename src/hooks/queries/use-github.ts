import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/Query-keys";
import { githubService } from "@/services/github.service";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

// One shared query: the GitHub page and the dashboard/profile cards all use
// this key, so they share a single cached request.
export const useGithubDashboard = () =>
  useQuery({
    queryKey: queryKeys.github.dashboard,
    queryFn: githubService.getDashboard,
    staleTime: STALE_TIME,
  });