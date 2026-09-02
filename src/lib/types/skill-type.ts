export type Skill = {
  id: string;
  userId: string;
  techStack: string[];
  createdAt: string;
  updatedAt: string;
};

export type CreateSkillPayload = {
  techStack: string[];
};

export type UpdateSkillPayload = Partial<CreateSkillPayload>;