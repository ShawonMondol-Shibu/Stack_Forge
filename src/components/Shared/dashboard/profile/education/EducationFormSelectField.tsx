import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { UseFormReturn } from "react-hook-form";
import type { EducationFormValues } from "./education-form-schema";

export default function EducationFormSelectField({
  form,
  name,
  label,
  options,
}: {
  form: UseFormReturn<EducationFormValues>;
  name: "educationType" | "status";
  label: string;
  options: { value: string; label: string }[];
}) {
  const error = form.formState.errors[name];
  const id = `education-${name}`;

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <select
        id={id}
        className="h-9 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
        aria-invalid={Boolean(error)}
        {...form.register(name)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <FieldError errors={[error]} />}
    </Field>
  );
}
