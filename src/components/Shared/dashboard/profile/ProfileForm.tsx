"use client";

import { Button } from "@/components/ui/button";
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
import type { UserProfile } from "@/lib/types/profile-type";
import {
  useCreateProfile,
  useUpdateProfile,
} from "@/hooks/mutations/use-profile-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  fullName: z.string().trim().min(2, "Enter your full name"),
  headline: z.string().trim(),
  bio: z.string().trim(),
  location: z.string().trim(),
  website: z.string().trim().refine(isValidOptionalUrl, "Enter a valid URL"),
  avatarUrl: z.string().trim().refine(isValidOptionalUrl, "Enter a valid URL"),
  coverUrl: z.string().trim().refine(isValidOptionalUrl, "Enter a valid URL"),
  availability: z.enum(["open", "busy", "unavailable"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

function isValidOptionalUrl(value: string) {
  return value === "" || z.url().safeParse(value).success;
}

function getDefaultValues(profile?: UserProfile): ProfileFormValues {
  return {
    id: profile?.id ?? "",
    userId: profile?.userId ?? "",
    fullName: profile?.fullName ?? "",
    headline: profile?.headline ?? "",
    bio: profile?.bio ?? "",
    location: profile?.location ?? "",
    website: profile?.website ?? "",
    avatarUrl: profile?.avatarUrl ?? "",
    coverUrl: profile?.coverUrl ?? "",
    availability: profile?.availability ?? "open",
    createdAt: profile?.createdAt ?? "",
    updatedAt: profile?.updatedAt ?? "",
  };
}

export default function ProfileForm({
  profile,
  isLoading = false,
}: {
  profile?: UserProfile;
  isLoading?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const { mutate: createProfile, isPending: isCreatingProfile } =
    useCreateProfile();
  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();
  const isSaving = isCreatingProfile || isUpdatingProfile;
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: getDefaultValues(profile),
  });

  useEffect(() => {
    form.reset(getDefaultValues(profile));
  }, [form, profile]);

  const onSubmit = (values: ProfileFormValues) => {
    const data = {
      profile: {
        fullName: values.fullName,
        headline: values.headline,
        bio: values.bio,
        location: values.location,
        website: values.website || null,
        avatarUrl: values.avatarUrl || null,
        coverUrl: values.coverUrl || null,
        availability: values.availability,
      },
    };

    const onSuccess = () => setOpen(false);
    if (profile?.id) {
      updateProfile({ id: profile.id, data }, { onSuccess });
    } else {
      createProfile(data, { onSuccess });
    }
  };

  const readOnlyFields = [
    { name: "id" as const, label: "Profile ID" },
    { name: "userId" as const, label: "User ID" },
    { name: "createdAt" as const, label: "Created" },
    { name: "updatedAt" as const, label: "Last updated" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="outline" size="sm" disabled={isLoading} />}
      >
        {profile?.id ? (
          <>
            <Pencil className="mr-1 size-4" /> Edit profile
          </>
        ) : (
          <>
            <Plus className="mr-1 size-4" /> Create profile
          </>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {profile?.id ? "Edit profile" : "Create profile"}
          </DialogTitle>
          <DialogDescription>
            {profile?.id
              ? "Update the information shown on your public profile."
              : "Add the information for your public profile."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput form={form} name="fullName" label="Full name" />
            <FormInput form={form} name="headline" label="Headline" />
            <FormInput form={form} name="location" label="Location" />
            <FormInput form={form} name="website" label="Website" type="url" />
            <FormInput
              form={form}
              name="avatarUrl"
              label="Avatar image URL"
              type="url"
            />
            <FormInput
              form={form}
              name="coverUrl"
              label="Cover image URL"
              type="url"
            />
          </div>

          <Field data-invalid={Boolean(form.formState.errors.bio)}>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Textarea
              id="bio"
              rows={4}
              placeholder="Tell people a little about yourself"
              aria-invalid={Boolean(form.formState.errors.bio)}
              {...form.register("bio")}
            />
            {form.formState.errors.bio && (
              <FieldError errors={[form.formState.errors.bio]} />
            )}
          </Field>

          <Field data-invalid={Boolean(form.formState.errors.availability)}>
            <FieldLabel htmlFor="availability">Availability</FieldLabel>
            <select
              id="availability"
              className="h-9 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
              aria-invalid={Boolean(form.formState.errors.availability)}
              {...form.register("availability")}
            >
              <option value="open">Open to opportunities</option>
              <option value="busy">Busy</option>
              <option value="unavailable">Unavailable</option>
            </select>
            {form.formState.errors.availability && (
              <FieldError errors={[form.formState.errors.availability]} />
            )}
          </Field>

          {profile?.id && (
            <div className="grid gap-4 border-t pt-4 sm:grid-cols-2">
              {readOnlyFields.map(({ name, label }) => (
                <Field key={name}>
                  <FieldLabel htmlFor={name}>{label}</FieldLabel>
                  <Input id={name} readOnly {...form.register(name)} />
                </Field>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving
                ? "Saving..."
                : profile?.id
                  ? "Save profile"
                  : "Create profile"}
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
  type = "text",
}: {
  form: ReturnType<typeof useForm<ProfileFormValues>>;
  name:
    | "fullName"
    | "headline"
    | "location"
    | "website"
    | "avatarUrl"
    | "coverUrl";
  label: string;
  type?: string;
}) {
  const error = form.formState.errors[name];

  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        id={name}
        type={type}
        aria-invalid={Boolean(error)}
        placeholder={label}
        {...form.register(name)}
      />
      {error && <FieldError errors={[error]} />}
    </Field>
  );
}
