export type Project = {
  id: string;
  userId: string;

  name: string;
  description: string | null;

  techStack: string[];

  image: string | null;

  createdAt: string;
  updatedAt: string;
};

export type CreateProjectPayload = {
  name: string;
  description?: string;
  techStack: string[];
  image?: string;
};

export type UpdateProjectPayload = Partial<CreateProjectPayload>;