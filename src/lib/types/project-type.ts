export type ProjectAuthor = {
  id: string; // user ID (profile ID na)
  name: string;
  image: string | null;
};

export type Project = {
  id: string;
  userId: string;

  name: string;
  description: string | null;

  techStack: string[];

  image: string | null;

  createdAt: string;
  updatedAt: string;

  // Shudhu GET /projects/trending e ashe, tai optional
  totalLikes?: number;
  recentLikes?: number;
  author?: ProjectAuthor;
};

export type CreateProjectPayload = {
  name: string;
  description?: string;
  techStack: string[];
  image?: string;
};

export type UpdateProjectPayload = Partial<CreateProjectPayload>;