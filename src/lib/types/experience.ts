export default interface Experience {
  id: string;
  profileId: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
}

export type createExperiencePayload = Pick<
  Experience,
  "company" | "position" | "startDate"
> &
  Partial<Pick<Experience, "description" | "endDate" | "isCurrent">>;

export type updateExperiencePayload = Partial<
  Omit<Experience, "id" | "profileId">
>;