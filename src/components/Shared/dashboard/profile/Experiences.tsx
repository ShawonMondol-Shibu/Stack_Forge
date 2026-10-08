"use client";

import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Calendar,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type Experience from "@/lib/types/experience";
import useExperienceStore from "@/store/useExperienceStore";
import { experienceMutation } from "@/hooks/mutations/use-experience-mutation";
import ExperienceForm from "./ExperienceForm";
import { experienceQuery } from "@/hooks/queries/use-experience";



const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

export const Experiences = () => {
  const { data:initialExperiences=[] } = experienceQuery.GetMy()
  const experiences = useExperienceStore((state) => state.experiences);
  const setExperiences = useExperienceStore((state) => state.setExperiences);
  const { mutate: deleteExperience, isPending: isDeleting } =
    experienceMutation.DeleteExperience();
  const [formOpen, setFormOpen] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState<Experience>();
  const initialExperiencesSnapshot = useRef<string | null>(null);

  useEffect(() => {
    const snapshot = JSON.stringify(initialExperiences);
    if (snapshot !== initialExperiencesSnapshot.current) {
      setExperiences(initialExperiences);
      initialExperiencesSnapshot.current = snapshot;
    }
  }, [initialExperiences, setExperiences]);

  const openCreateForm = () => {
    setExperienceToEdit(undefined);
    setFormOpen(true);
  };

  const openEditForm = (experience: Experience) => {
    setExperienceToEdit(experience);
    setFormOpen(true);
  };

  return (
    <Card className="mx-auto w-full max-w-3xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Briefcase className="size-6 text-primary" />
          Experiences
        </CardTitle>
        <CardAction>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={openCreateForm}
          >
            <Plus data-icon="inline-start" />
            Add experience
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        {experiences.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No work experience added yet.
          </p>
        ) : (
          <div className="my-2 ml-3 space-y-8 border-l border-muted-foreground/20 pl-6">
            {experiences.map((experience) => (
              <div key={experience.id} className="relative">
                <div
                  className={`absolute -left-7.75 top-1.5 size-3.5 rounded-full border-2 border-background ${
                    experience.isCurrent
                      ? "bg-primary ring-2 ring-primary/20"
                      : "bg-muted-foreground/40"
                  }`}
                />

                <div className="mb-1 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-lg leading-none font-semibold text-foreground">
                      {experience.position}
                    </h3>
                    <p className="mt-1 text-md font-medium text-muted-foreground">
                      {experience.company}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 sm:justify-end">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 font-medium">
                        <Calendar className="size-3.5" />
                        {formatDate(experience.startDate)} -{" "}
                        {experience.isCurrent
                          ? "Present"
                          : experience.endDate
                            ? formatDate(experience.endDate)
                            : "Present"}
                      </span>
                      {experience.isCurrent && (
                        <Badge
                          variant="default"
                          className="px-2 py-0.5 text-[10px]"
                        >
                          Current
                        </Badge>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Actions for ${experience.position} at ${experience.company}`}
                          />
                        }
                      >
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => openEditForm(experience)}
                        >
                          <Pencil />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="destructive"
                          disabled={isDeleting}
                          onClick={() => deleteExperience(experience.id)}
                        >
                          <Trash2 />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {experience.description && (
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground/90">
                    {experience.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <ExperienceForm
        experience={experienceToEdit}
        open={formOpen}
        onOpenChange={setFormOpen}
      />
    </Card>
  );
};

export default Experiences;
