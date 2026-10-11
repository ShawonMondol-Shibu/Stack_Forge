import { Badge } from "@/components/ui/badge";
import { Circle, LoaderCircle } from "lucide-react";
import { experienceQuery } from "@/hooks/queries/use-experience";

function formatDate(value: string) {
  return new Date(value.slice(0, 10) + "T00:00:00").toLocaleDateString(
    undefined,
    { month: "short", year: "numeric" },
  );
}

export default function PortfolioExperience({ id }: { id: string }) {
  const {
    data: experiences,
    isPending,
    isError,
  } = experienceQuery.GetByProfile(id);

  return (
    <section className="border-t border-border/70 pt-6">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase text-primary">Career</p>
        <h2 className="mt-1 text-2xl font-semibold">Experience</h2>
      </div>

      {isPending ? (
        <div className="flex min-h-24 items-center justify-center">
          <LoaderCircle className="size-5 animate-spin text-muted-foreground" />
        </div>
      ) : isError ? (
        <p role="alert" className="text-sm text-destructive">
          Could not load experience.
        </p>
      ) : experiences?.length ? (
        <ol className="ml-2 border-l border-border/80">
          {experiences.map((experience, index) => (
            <li
              key={experience.id}
              className={`relative pb-7 pl-6 ${index === experiences.length - 1 ? "pb-0" : ""}`}
            >
              <Circle className="absolute -left-1.75 top-1 size-3.5 fill-primary text-primary ring-4 ring-background" />
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>
                  {formatDate(experience.startDate)} -{" "}
                  {experience.isCurrent
                    ? "Present"
                    : experience.endDate
                      ? formatDate(experience.endDate)
                      : "End date unknown"}
                </span>
                {experience.isCurrent && <Badge>Current</Badge>}
              </div>
              <h3 className="mt-2 text-lg font-semibold">
                {experience.position}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {experience.company}
              </p>
              {experience.description && (
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                  {experience.description}
                </p>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <p className="border-y border-border/70 py-6 text-sm text-muted-foreground">
          No experience listed yet.
        </p>
      )}
    </section>
  );
}
