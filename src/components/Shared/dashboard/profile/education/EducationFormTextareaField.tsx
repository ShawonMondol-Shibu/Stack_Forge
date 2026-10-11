import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { UseFormReturn } from "react-hook-form";
import type { EducationFormValues } from "./education-form-schema";

export default function EducationFormTextareaField({
  form,
  name,
  label,
}: {
  form: UseFormReturn<EducationFormValues>;
  name: "description" | "activities";
  label: string;
}) {
  const error = form.formState.errors[name];
  const id = `education-${name}`;

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea
        id={id}
        rows={3}
        aria-invalid={Boolean(error)}
        {...form.register(name)}
      />
      {error && <FieldError errors={[error]} />}
    </Field>
  );
}
