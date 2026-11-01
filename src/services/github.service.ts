import { apiService } from "@/lib/api-routes/apis";
import type { GithubDashboard } from "@/lib/types/github";

export const githubService = {
  getDashboard: () => {
    return apiService<GithubDashboard>({
      endpoint: "/github/dashboard",
    });
  },
};
