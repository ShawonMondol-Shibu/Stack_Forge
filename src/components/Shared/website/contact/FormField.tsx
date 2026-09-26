import { Input } from "@/components/ui/input";

type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
};

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className=" border-border bg-muted/30"
      />
    </div>
  );
}
