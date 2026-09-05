export const queryKeys = {
  projects: {
    all: ["all-projects"] as const,
    getOne: (id: string) => ["projects", id] as const,
    update: (id: string) => ["update-project", id] as const,
    delete: (id: string) => ["delete-project", id] as const,
  },

  tasks: {
    all: ["all-tasks"] as const,
    getOne: (id: string) => ["task", id] as const,
    update: (id: string) => ["update-task", id] as const,
    delete: (id: string) => ["delete-task", id] as const,
  },

  skills: {
    all: ["all-skills"] as const,
  },

  techStacks: {
    all: ["all-techstacks"] as const,
  },

  profile: {
    me: ["me"] as const,
    allProfiles: ["all-profiles"] as const,
    profile: (id: string) => ["profile", id] as const,
    update: (id: string) => ["update-profile", id] as const,
  },
};
