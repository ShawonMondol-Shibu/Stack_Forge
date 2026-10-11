import { LoaderCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { educationQuery } from "@/hooks/queries/use-education";

function formatDate(value: string) {
  return new Date(`${value.slice(0, 10)}T00:00:00`).toLocaleDateString(
    undefined,
    { month: "short", year: "numeric" },
  );
}

export default function ProfileEducations({ id }: { id: string }) {
  const { data: educations, isPending, isError } = educationQuery.GetByUser(id);
  const publicEducations = educations?.filter(
    (education) => education.isPublic,
  );

  return (
    <Card className="gap-3 border-0 bg-transparent px-0 py-0 shadow-none ring-0">
      <CardHeader className="px-0 pt-0">
        <div>
          <p className="text-xs font-semibold uppercase text-primary">
            Learning
          </p>
          <CardTitle className="mt-1 text-2xl">Education</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        {isPending ? (
          <div className="flex min-h-20 items-center justify-center">
            <LoaderCircle className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <p role="alert" className="text-sm text-destructive">
            Could not load education.
          </p>
        ) : publicEducations?.length ? (
          <ul className="divide-y divide-border">
            {publicEducations.map((education) => (
              <li
                key={education.id}
                className="space-y-1 py-4 first:pt-0 last:pb-0"
              >
                <h3 className="font-semibold">
                  {education.degree}
                  {education.fieldOfStudy ? `, ${education.fieldOfStudy}` : ""}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {education.institutionName}
                  {education.location ? ` · ${education.location}` : ""}
                </p>
                <p className="text-xs capitalize text-muted-foreground">
                  {education.startDate ? formatDate(education.startDate) : ""}
                  {education.startDate ? " - " : ""}
                  {education.isCurrent
                    ? "Present"
                    : education.endDate
                      ? formatDate(education.endDate)
                      : education.status.replaceAll("_", " ")}
                  {education.gradeValue ? ` · ${education.gradeValue}` : ""}
                </p>
                {education.description && (
                  <p className="whitespace-pre-line text-sm text-muted-foreground">
                    {education.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            No public education listed.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
