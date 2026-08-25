"use client";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useProjectContext } from "@/context/ProjectContext";
import { apiService } from "@/lib/api-routes/apis";
import { ProjectType } from "@/lib/types/project-type";
import { PlusIcon } from "@animateicons/react/lucide";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Enter project name" }),
  description: z
    .string()
    .min(2, { message: "Enter a description of your project" }),
  techStack: z.array(z.string()),
  // image: z.string().optional(),
});

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "Nest.jS",
  "Node.js",
  "Better-Auth",
  "Drizzle",
  "Supabase",
] as const;

export default function AddProject() {
  const anchor = useComboboxAnchor();
  const router = useRouter();
  const { setProjects } = useProjectContext();

  const { mutate } = useMutation({
    mutationKey: ["create-project"],
    mutationFn: (data: z.infer<typeof formSchema>) =>
      apiService({
        endpoint: "/projects",
        method: "POST",
        body: data,
      }),
    onError: (err) => {
      console.log(err.message);
    },
    onSuccess: () => {
      const id = toast.add({
        type: "success",
        title: "Project created successfully",
        actionProps: {
          onClick() {
            toast.close(id);
          },
        },
      });

      router.push("/projects");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      techStack: [],
      // image: "",
    },
  });


  // useEffect(() => {
  //   if(data){setProjects(data)}
  // }, [data, setProjects])
  

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setProjects((prev)=> [...prev, { ...data, id: crypto.randomUUID(), userId: 'temp'}])

    mutate(data);

    console.log(data);
  };



  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size={"sm"}>
            <PlusIcon /> New Project{" "}
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-6">
            <span
              className={"p-4 bg-primary/10 text-primary w-fit rounded-2xl"}
            >
              <PlusIcon size={30} />
            </span>
            <div>
              <DialogTitle>New Project</DialogTitle>
              <DialogDescription>
                Create new project to start building amazing things
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form
          {...form}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
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
                  placeholder="you@gmail.com"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="techStack"
            control={form.control}
            render={({ field, fieldState }) => {
              // Ensure value is an array for multi-select
              const selectedValues = Array.isArray(field.value)
                ? field.value
                : [];

              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Tech Stack</FieldLabel>

                  <Combobox
                    multiple
                    autoHighlight
                    items={frameworks}
                    value={selectedValues}
                    onValueChange={(val) => field.onChange(val)}
                  >
                    <ComboboxChips ref={anchor} className="w-full max-w-xs">
                      <ComboboxValue>
                        {(values: string[]) => (
                          <React.Fragment>
                            {values.map((value: string) => (
                              <ComboboxChip key={value}>{value}</ComboboxChip>
                            ))}
                            <ComboboxChipsInput
                              id={field.name}
                              onBlur={field.onBlur}
                            />
                          </React.Fragment>
                        )}
                      </ComboboxValue>
                    </ComboboxChips>

                    <ComboboxContent anchor={anchor}>
                      <ComboboxEmpty>No items found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item: string) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />

          <Button size={"sm"} type="submit">
            Create Project
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
