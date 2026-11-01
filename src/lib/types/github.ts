export type GithubProfile = {
  login: string;
  name: string | null;
  avatarUrl: string;
  profileUrl: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  website: string | null;
  publicRepos: number;
  followers: number;
  following: number;
};

export type GithubRepository = {
  id: number;
  name: string;
  fullName: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  issues: number;
  private: boolean;
  fork: boolean;
  topics: string[];
  updatedAt: string;
};

export type GithubActivity = {
  id: string;
  type: string;
  repository: string;
  createdAt: string;
};

export type GithubDashboard = {
  connected: boolean;
  profile: GithubProfile | null;
  repositories: GithubRepository[];
  activity: GithubActivity[];
};
