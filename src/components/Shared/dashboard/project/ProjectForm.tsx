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
import { useCreateProject } from "@/hooks/mutations/use-project-mutation";
import { Toaster } from "@/components/ui/toast";
import { LoaderIcon, PlusIcon } from "@animateicons/react/lucide";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/lib/api-routes/apis";
import Image from "next/image";

type TechStackItem = {
  id: string;
  name: string;
  image: string;
};

const formSchema = z.object({
  name: z.string().min(2, { message: "Enter project name" }),
  description: z
    .string()
    .min(2, { message: "Enter a description of your project" }),
  techStack: z.array(z.string()),
});

export default function ProjectForm() {
  const anchor = useComboboxAnchor();

  const { data: techStacks = [] } = useQuery({
    queryKey: ["techstacks"],
    queryFn: () =>
      apiService<{ data: TechStackItem[] }>({
        endpoint: "/tech-stack",
      }),
    select: (res) => res.data,
  });

  const { mutate, isPending } = useCreateProject();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      techStack: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
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

      <Button size={"sm"} disabled={isPending} type="submit">
        {isPending ? (
          <LoaderIcon />
        ) : (
          <>
            <PlusIcon />
            Create Project
          </>
        )}
      </Button>

      <Toaster />
    </form>
  );
}
