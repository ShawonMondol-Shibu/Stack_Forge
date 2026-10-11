export const EDUCATION_TYPES = [
  "degree",
  "diploma",
  "certificate",
  "bootcamp",
  "training",
  "other",
] as const;

export const EDUCATION_STATUSES = [
  "in_progress",
  "completed",
  "withdrawn",
  "discontinued",
] as const;

export type EducationType = (typeof EDUCATION_TYPES)[number];
export type EducationStatus = (typeof EDUCATION_STATUSES)[number];

export interface EducationRecord {
  id: string;
  userId: string;
  educationType: EducationType;
  institutionName: string;
  institutionUrl: string | null;
  institutionLogoUrl: string | null;
  location: string | null;
  degree: string;
  fieldOfStudy: string | null;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  status: EducationStatus;
  gradeValue: string | null;
  gradeScale: string | null;
  description: string | null;
  activities: string | null;
  isPublic: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateEducationData = Omit<
  EducationRecord,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export type UpdateEducationData = Partial<CreateEducationData>;
