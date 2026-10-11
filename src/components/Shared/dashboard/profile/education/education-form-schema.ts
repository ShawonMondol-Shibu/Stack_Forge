import { z } from "zod";
import { EDUCATION_STATUSES, EDUCATION_TYPES } from "@/lib/types/education";

export const educationTypeOptions = EDUCATION_TYPES.map((value) => ({
  value,
  label: value[0].toUpperCase() + value.slice(1),
}));

export const educationStatusOptions = EDUCATION_STATUSES.map((value) => ({
  value,
  label: value
    .replaceAll("_", " ")
    .replace(/^./, (letter) => letter.toUpperCase()),
}));

export const educationSchema = z
  .object({
    educationType: z.enum(EDUCATION_TYPES),
    institutionName: z.string().trim().min(1, "Institution is required"),
    institutionUrl: z
      .string()
      .trim()
      .refine(isOptionalUrl, "Enter a valid URL"),
    institutionLogoUrl: z
      .string()
      .trim()
      .refine(isOptionalUrl, "Enter a valid URL"),
    location: z.string().trim(),
    degree: z.string().trim().min(1, "Degree or credential is required"),
    fieldOfStudy: z.string().trim(),
    startDate: z.string(),
    endDate: z.string(),
    isCurrent: z.boolean(),
    status: z.enum(EDUCATION_STATUSES),
    gradeValue: z.string().trim(),
    gradeScale: z.string().trim(),
    description: z.string().trim(),
    activities: z.string().trim(),
    isPublic: z.boolean(),
    displayOrder: z.number().int().min(0, "Order cannot be negative"),
  })
  .superRefine((values, context) => {
    if (
      values.startDate &&
      values.endDate &&
      values.endDate < values.startDate
    ) {
      context.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End date must be after the start date",
      });
    }

    if (values.isCurrent && values.status !== "in_progress") {
      context.addIssue({
        code: "custom",
        path: ["status"],
        message: "Current education must be in progress",
      });
    }
  });

export type EducationFormValues = z.infer<typeof educationSchema>;

export const defaultEducationFormValues: EducationFormValues = {
  educationType: "degree",
  institutionName: "",
  institutionUrl: "",
  institutionLogoUrl: "",
  location: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  status: "completed",
  gradeValue: "",
  gradeScale: "",
  description: "",
  activities: "",
  isPublic: true,
  displayOrder: 0,
};

function isOptionalUrl(value: string) {
  return value === "" || z.string().url().safeParse(value).success;
}
