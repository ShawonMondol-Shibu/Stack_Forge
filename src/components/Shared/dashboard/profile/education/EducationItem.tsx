import { CalendarDays, GraduationCap, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
}: {
  education: EducationRecord;
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
              <h3 className="break-words font-semibold">
                {education.degree}
                {education.fieldOfStudy ? `, ${education.fieldOfStudy}` : ""}
              </h3>
              <p className="break-words text-sm text-muted-foreground">
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
            <Badge variant="secondary">
              {formatEducationType(education.educationType)}
            </Badge>
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
