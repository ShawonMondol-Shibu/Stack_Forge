export type Skill = {
  id: string;
  userId: string;
  techStack: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateSkillPayload = {
  name: string[];
};

export type UpdateSkillPayload = Partial<CreateSkillPayload>;