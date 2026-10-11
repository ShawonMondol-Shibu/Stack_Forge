import { LoaderCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { experienceQuery } from "@/hooks/queries/use-experience";

function formatDate(value: string) {
  return new Date(value.slice(0, 10) + "T00:00:00").toLocaleDateString(
    undefined,
    { month: "short", year: "numeric" },
  );
}

export default function ProfileExperience({ id }: { id: string }) {
  const {
    data: experiences,
    isPending,
    isError,
  } = experienceQuery.GetByProfile(id);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Experience</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="flex min-h-20 items-center justify-center">
            <LoaderCircle className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <p role="alert" className="text-sm text-destructive">
            Could not load experience.
          </p>
        ) : experiences?.length ? (
          <ul className="divide-y divide-border">
            {experiences.map((experience) => (
              <li
                key={experience.id}
                className="space-y-1 py-4 first:pt-0 last:pb-0"
              >
                <h3 className="font-semibold">{experience.position}</h3>
                <p className="text-sm text-muted-foreground">
                  {experience.company}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(experience.startDate)} -{" "}
                  {experience.isCurrent
                    ? "Present"
                    : experience.endDate
                      ? formatDate(experience.endDate)
                      : "End date unknown"}
                </p>
                {experience.description && (
                  <p className="whitespace-pre-line text-sm text-muted-foreground">
                    {experience.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No experience listed.</p>
        )}
      </CardContent>
    </Card>
  );
}
