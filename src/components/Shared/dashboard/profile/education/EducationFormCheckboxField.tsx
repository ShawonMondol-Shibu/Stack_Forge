import type { UseFormReturn } from "react-hook-form";
import type { EducationFormValues } from "./education-form-schema";

export default function EducationFormCheckboxField({
  form,
  name,
  label,
  onChange,
}: {
  form: UseFormReturn<EducationFormValues>;
  name: "isCurrent" | "isPublic";
  label: string;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        className="size-4 accent-primary"
        {...form.register(name, {
          onChange: (event) => onChange?.(event.target.checked),
        })}
      />
      {label}
    </label>
  );
}
