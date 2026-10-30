"use client";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  useCreateProject,
  useUpdateProject,
} from "@/hooks/mutations/use-project-mutation";
import { LoaderIcon, PlusIcon } from "@animateicons/react/lucide";
import Image from "next/image";
import useTechStack from "@/hooks/queries/useTechStack";
import { TechStackItem } from "@/lib/types/techStack-type";
import type { Project } from "@/lib/types/project-type";

const formSchema = z.object({
  name: z.string().min(2, { message: "Enter project name" }),
  description: z
    .string()
    .min(2, { message: "Enter a description of your project" }),
  techStack: z
    .array(z.string())
    .min(1, { message: "Select at least one technology" }),
  image: z.string().optional(),
  liveLink: z.string().optional(),
  githubLink: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Stable reference, tai Combobox items prop protita render e bodlay na
const EMPTY_TECH_STACKS: TechStackItem[] = [];

type ProjectFormProps = {
  /** Dile edit mode: field gulo ei project er data diye bhora thake, submit e update hoy. */
  project?: Project;
  /** Create/update successful hole call hoy (jemon dialog bondho korar jonno). */
  onSuccess?: () => void;
};

export default function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const isEdit = Boolean(project);
  const anchor = useComboboxAnchor();

  const { data } = useTechStack();
  const techStacks = data ?? EMPTY_TECH_STACKS;

  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const isPending = isCreating || isUpdating;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project?.name ?? "",
      description: project?.description ?? "",
      techStack: project?.techStack ?? [],
      image: project?.image ?? "",
      liveLink: project?.liveLink ?? "",
      githubLink: project?.githubLink ?? "",
    },
  });

  const onSubmit = (values: FormValues) => {
    if (project) {
      updateProject({ id: project.id, data: values }, { onSuccess });
    } else {
      createProject(values, {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Project Name</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter project name..."
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="image"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Project Image</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter project image URL..."
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Short Description</FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Describe what this project is about, its purpose, and main goals..."
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="techStack"
        control={form.control}
        render={({ field, fieldState }) => {
          const selectedValues = Array.isArray(field.value) ? field.value : [];

          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Tech Stack</FieldLabel>

              <Combobox
                multiple
                items={techStacks}
                value={selectedValues}
                onValueChange={(val) => field.onChange(val)}
              >
                <ComboboxChips ref={anchor} className="w-full">
                  <ComboboxValue>
                    {(values) => {
                      const selectedItems = techStacks.filter((item) =>
                        values.includes(item.id),
                      );

                      return (
                        <>
                          {selectedItems.map((item) => (
                            <ComboboxChip key={item.id}>
                              {item?.image && (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={14}
                                  height={14}
                                />
                              )}
                              {item.name}
                            </ComboboxChip>
                          ))}
                          <ComboboxChipsInput
                            id={field.name}
                            onBlur={field.onBlur}
                            placeholder="Select your technology"
                          />
                        </>
                      );
                    }}
                  </ComboboxValue>
                </ComboboxChips>

                <ComboboxContent anchor={anchor}>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item: TechStackItem) => (
                      <ComboboxItem key={item.id} value={item.id}>
                        {item?.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={14}
                            height={14}
                          />
                        )}
                        {item.name}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />

      <Controller
        name="liveLink"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Live Link</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter live link of your project..."
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="githubLink"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>GitHub Link</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter GitHub link of your project..."
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button size="sm" disabled={isPending} type="submit">
        {isPending ? (
          <LoaderIcon />
        ) : isEdit ? (
          "Save changes"
        ) : (
          <>
            <PlusIcon />
            Create Project
          </>
        )}
      </Button>
    </form>
  );
}