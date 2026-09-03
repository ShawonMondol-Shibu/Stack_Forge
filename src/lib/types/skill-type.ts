export type Skill = {
  id: string;
  userId: string;
  techStack?: string[];
  createdAt?: number | Date | undefined;
  updatedAt?: number | Date | undefined;
};

export type CreateSkillPayload = {
  techStack: string[];
};

export type UpdateSkillPayload = Partial<CreateSkillPayload>;