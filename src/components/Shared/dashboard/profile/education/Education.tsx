"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { educationMutation } from "@/hooks/mutations/use-education-mutation";
import { educationQuery } from "@/hooks/queries/use-education";
import type {
  CreateEducationData,
  EducationRecord,
} from "@/lib/types/education";
import { useEducationStore } from "@/store/useEducationStore";
import EducationItem from "./EducationItem";
import EducationForm from "./EducationForm";

export default function Education() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [educationToEdit, setEducationToEdit] = useState<
    EducationRecord | undefined
  >();
  const {
    data: fetchedEducations,
    isPending,
    isError,
    error,
  } = educationQuery.GetMy();
  const educations = useEducationStore((state) => state.educations);
  const setEducations = useEducationStore((state) => state.setEducations);
  const { mutate: createEducation, isPending: isCreating } =
    educationMutation.CreateEducation();
  const { mutate: updateEducation, isPending: isUpdating } =
    educationMutation.UpdateEducation();
  const { mutate: deleteEducation, isPending: isDeleting } =
    educationMutation.DeleteEducation();
  const fetchedSnapshot = useRef<string | null>(null);

  useEffect(() => {
    if (!fetchedEducations) return;

    const snapshot = JSON.stringify(fetchedEducations);
    if (snapshot !== fetchedSnapshot.current) {
      setEducations(fetchedEducations);
      fetchedSnapshot.current = snapshot;
    }
  }, [fetchedEducations, setEducations]);

  const sortedEducations = [...educations].sort(
    (first, second) => first.displayOrder - second.displayOrder,
  );

  const openCreateForm = () => {
    setEducationToEdit(undefined);
    setIsFormOpen(true);
  };

  const openEditForm = (education: EducationRecord) => {
    setEducationToEdit(education);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: CreateEducationData) => {
    const onSuccess = () => {
      setIsFormOpen(false);
      setEducationToEdit(undefined);
    };

    if (educationToEdit) {
      updateEducation({ id: educationToEdit.id, data }, { onSuccess });
      return;
    }

    createEducation(data, { onSuccess });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <GraduationCap className="size-5 text-primary" aria-hidden="true" />
          Educations
        </CardTitle>
        <CardAction>
          <Button type="button" size="sm" onClick={openCreateForm}>
            <Plus data-icon="inline-start" />
            Add
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        {isPending && educations.length === 0 ? (
          <p className="text-sm text-muted-foreground">Loading education...</p>
        ) : isError && educations.length === 0 ? (
          <p role="alert" className="text-sm text-destructive">
            {error.message || "Could not load education."}
          </p>
        ) : sortedEducations.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No education added yet.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {sortedEducations.map((education) => (
              <EducationItem
                key={education.id}
                education={education}
                onEdit={() => openEditForm(education)}
                onDelete={() => deleteEducation(education.id)}
                isDeleting={isDeleting}
              />
            ))}
          </ul>
        )}
      </CardContent>

      <EducationForm
        education={educationToEdit}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        isSubmitting={isCreating || isUpdating}
        onSubmit={handleSubmit}
      />
    </Card>
  );
}
