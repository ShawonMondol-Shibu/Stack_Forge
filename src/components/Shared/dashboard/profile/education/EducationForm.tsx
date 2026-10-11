"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CreateEducationData } from "@/lib/types/education";
import EducationFormCheckboxField from "./EducationFormCheckboxField";
import EducationFormSelectField from "./EducationFormSelectField";
import EducationFormTextField from "./EducationFormTextField";
import EducationFormTextareaField from "./EducationFormTextareaField";
import {
  defaultEducationFormValues,
  educationStatusOptions,
  educationSchema,
  educationTypeOptions,
  type EducationFormValues,
} from "./education-form-schema";

interface EducationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (education: CreateEducationData) => void;
  isSubmitting: boolean;
}

function nullableValue(value: string) {
  return value || null;
}

export default function EducationForm({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: EducationFormProps) {
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: defaultEducationFormValues,
  });
  const isCurrent = useWatch({ control: form.control, name: "isCurrent" });

  useEffect(() => {
    if (open) form.reset(defaultEducationFormValues);
  }, [form, open]);

  const handleSubmit = (values: EducationFormValues) => {
    onSubmit({
      educationType: values.educationType,
      institutionName: values.institutionName,
      institutionUrl: nullableValue(values.institutionUrl),
      institutionLogoUrl: nullableValue(values.institutionLogoUrl),
      location: nullableValue(values.location),
      degree: values.degree,
      fieldOfStudy: nullableValue(values.fieldOfStudy),
      startDate: nullableValue(values.startDate),
      endDate: values.isCurrent ? null : nullableValue(values.endDate),
      isCurrent: values.isCurrent,
      status: values.status,
      gradeValue: nullableValue(values.gradeValue),
      gradeScale: nullableValue(values.gradeScale),
      description: nullableValue(values.description),
      activities: nullableValue(values.activities),
      isPublic: values.isPublic,
      displayOrder: values.displayOrder,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add education</DialogTitle>
          <DialogDescription>
            Add an education entry to your profile.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <EducationFormSelectField
              form={form}
              name="educationType"
              label="Education type"
              options={educationTypeOptions}
            />
            <EducationFormTextField
              form={form}
              name="institutionName"
              label="Institution name"
              required
            />
            <EducationFormTextField
              form={form}
              name="institutionUrl"
              label="Institution website"
              type="url"
            />
            <EducationFormTextField
              form={form}
              name="institutionLogoUrl"
              label="Institution logo URL"
              type="url"
            />
            <EducationFormTextField
              form={form}
              name="location"
              label="Location"
            />
            <EducationFormTextField
              form={form}
              name="degree"
              label="Degree or credential"
              required
            />
            <EducationFormTextField
              form={form}
              name="fieldOfStudy"
              label="Field of study"
            />
            <EducationFormSelectField
              form={form}
              name="status"
              label="Status"
              options={educationStatusOptions}
            />
            <EducationFormTextField
              form={form}
              name="startDate"
              label="Start date"
              type="date"
            />
            {!isCurrent && (
              <EducationFormTextField
                form={form}
                name="endDate"
                label="End date"
                type="date"
              />
            )}
            <EducationFormTextField
              form={form}
              name="gradeValue"
              label="Grade"
            />
            <EducationFormTextField
              form={form}
              name="gradeScale"
              label="Grade scale"
            />
            <EducationFormTextField
              form={form}
              name="displayOrder"
              label="Display order"
              type="number"
            />
          </div>

          <EducationFormCheckboxField
            form={form}
            name="isCurrent"
            label="Currently studying here"
            onChange={(checked) => {
              if (checked) {
                form.setValue("status", "in_progress");
                form.setValue("endDate", "");
              }
            }}
          />
          <EducationFormCheckboxField
            form={form}
            name="isPublic"
            label="Show this education publicly"
          />
          <EducationFormTextareaField
            form={form}
            name="description"
            label="Description"
          />
          <EducationFormTextareaField
            form={form}
            name="activities"
            label="Activities"
          />

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add education"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
