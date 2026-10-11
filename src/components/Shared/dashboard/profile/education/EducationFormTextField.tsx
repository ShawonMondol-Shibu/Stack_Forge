import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { EducationFormValues } from "./education-form-schema";

type TextFieldName =
  | "institutionName"
  | "institutionUrl"
  | "institutionLogoUrl"
  | "location"
  | "degree"
  | "fieldOfStudy"
  | "startDate"
  | "endDate"
  | "gradeValue"
  | "gradeScale"
  | "displayOrder";

export default function EducationFormTextField({
  form,
  name,
  label,
  type = "text",
  required = false,
}: {
  form: UseFormReturn<EducationFormValues>;
  name: TextFieldName;
  label: string;
  type?: string;
  required?: boolean;
}) {
  const error = form.formState.errors[name];
  const id = `education-${name}`;
  const registration =
    name === "displayOrder"
      ? form.register(name, { valueAsNumber: true })
      : form.register(name);

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </FieldLabel>
      <Input
        id={id}
        type={type}
        min={type === "number" ? 0 : undefined}
        step={type === "number" ? 1 : undefined}
        aria-invalid={Boolean(error)}
        {...registration}
      />
      {error && <FieldError errors={[error]} />}
    </Field>
  );
}
