import {
  CalendarDays,
  GraduationCap,
  MapPin,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EducationRecord } from "@/lib/types/education";

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
}

function formatEducationType(value: EducationRecord["educationType"]) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function EducationItem({
  education,
  onEdit,
  onDelete,
  isDeleting,
}: {
  education: EducationRecord;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  return (
    <li className="py-4 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <GraduationCap className="size-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="wrap-break-word font-semibold">
                {education.degree}
                {education.fieldOfStudy ? `, ${education.fieldOfStudy}` : ""}
              </h3>
              <p className="wrap-break-word text-sm text-muted-foreground">
                {education.institutionUrl ? (
                  <a
                    href={education.institutionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {education.institutionName}
                  </a>
                ) : (
                  education.institutionName
                )}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Badge variant="secondary">
                {formatEducationType(education.educationType)}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Actions for ${education.degree} at ${education.institutionName}`}
                    />
                  }
                >
                  <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onEdit}>
                    <Pencil />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    disabled={isDeleting}
                    onClick={onDelete}
                  >
                    <Trash2 />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {(education.startDate ||
              education.endDate ||
              education.isCurrent) && (
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-3.5" aria-hidden="true" />
                {education.startDate
                  ? formatDate(education.startDate)
                  : "Date not specified"}
                {" - "}
                {education.isCurrent
                  ? "Present"
                  : education.endDate
                    ? formatDate(education.endDate)
                    : "End date not specified"}
              </span>
            )}
            {education.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" aria-hidden="true" />
                {education.location}
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="capitalize">
              {education.status.replaceAll("_", " ")}
            </span>
            {!education.isPublic && <span>Private</span>}
            {education.gradeValue && (
              <span>
                {education.gradeValue}
                {education.gradeScale ? ` / ${education.gradeScale}` : ""}
              </span>
            )}
          </div>

          {education.description && (
            <p className="mt-2 whitespace-pre-line wrap-break-word text-sm text-muted-foreground">
              {education.description}
            </p>
          )}
          {education.activities && (
            <p className="mt-1 whitespace-pre-line wrap-break-word text-sm text-muted-foreground">
              {education.activities}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
