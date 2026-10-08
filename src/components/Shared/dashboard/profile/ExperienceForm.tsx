"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { experienceMutation } from "@/hooks/mutations/use-experience-mutation";
import type Experience from "@/lib/types/experience";

const experienceSchema = z.object({
  company: z.string().trim().min(1, "Company is required"),
  position: z.string().trim().min(1, "Position is required"),
  description: z.string().trim(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string(),
  isCurrent: z.boolean(),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

function formatDateForInput(value?: string | null) {
  return value ? value.slice(0, 10) : "";
}

function getDefaultValues(experience?: Experience): ExperienceFormValues {
  return {
    company: experience?.company ?? "",
    position: experience?.position ?? "",
    description: experience?.description ?? "",
    startDate: formatDateForInput(experience?.startDate),
    endDate: formatDateForInput(experience?.endDate),
    isCurrent: experience?.isCurrent ?? false,
  };
}

interface ExperienceFormProps {
  experience?: Experience;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ExperienceForm({
  experience,
  open,
  onOpenChange,
}: ExperienceFormProps) {
  const { mutate: createExperience, isPending: isCreating } =
    experienceMutation.CreateExperience();
  const { mutate: updateExperience, isPending: isUpdating } =
    experienceMutation.UpdateExperience();
  const isSaving = isCreating || isUpdating;
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: getDefaultValues(experience),
  });
  const isCurrent = useWatch({
    control: form.control,
    name: "isCurrent",
  });

  useEffect(() => {
    if (open) {
      form.reset(getDefaultValues(experience));
    }
  }, [experience, form, open]);

  const onSubmit = (values: ExperienceFormValues) => {
    const data = {
      company: values.company,
      position: values.position,
      description: values.description,
      startDate: values.startDate,
      endDate: values.isCurrent ? null : values.endDate || null,
      isCurrent: values.isCurrent,
    };
    const onSuccess = () => onOpenChange(false);

    if (experience) {
      updateExperience({ id: experience.id, data }, { onSuccess });
    } else {
      createExperience(data, { onSuccess });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {experience ? "Edit experience" : "Add experience"}
          </DialogTitle>
          <DialogDescription>
            {experience
              ? "Update the details of this work experience."
              : "Add a work experience to your profile."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              form={form}
              name="company"
              label="Company"
              placeholder="Company name"
            />
            <FormInput
              form={form}
              name="position"
              label="Position"
              placeholder="Job title"
            />
          </div>

          <Field data-invalid={Boolean(form.formState.errors.description)}>
            <FieldLabel htmlFor="experience-description">
              Description
            </FieldLabel>
            <Textarea
              id="experience-description"
              rows={4}
              placeholder="Describe your role and accomplishments"
              aria-invalid={Boolean(form.formState.errors.description)}
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <FieldError errors={[form.formState.errors.description]} />
            )}
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              form={form}
              name="startDate"
              label="Start date"
              type="date"
            />
            {!isCurrent && (
              <FormInput
                form={form}
                name="endDate"
                label="End date"
                type="date"
              />
            )}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-primary"
              {...form.register("isCurrent", {
                onChange: (event) => {
                  if (event.target.checked) {
                    form.setValue("endDate", "");
                  }
                },
              })}
            />
            I currently work here
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving
                ? "Saving..."
                : experience
                  ? "Save changes"
                  : "Add experience"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FormInput({
  form,
  name,
  label,
  placeholder = label,
  type = "text",
}: {
  form: ReturnType<typeof useForm<ExperienceFormValues>>;
  name: "company" | "position" | "startDate" | "endDate";
  label: string;
  placeholder?: string;
  type?: string;
}) {
  const error = form.formState.errors[name];
  const id = `experience-${name}`;

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        {...form.register(name)}
      />
      {error && <FieldError errors={[error]} />}
    </Field>
  );
}
