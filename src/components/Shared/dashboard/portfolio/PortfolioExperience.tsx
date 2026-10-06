import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";
import React from "react";

export default function PortfolioExperience() {
  const experiences = [
    {
      title: "Software Engineer",
      company: "StackForge Inc.",
      duration: "Jan 2026 - Oct 2026",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      title: "Frontend Developer",
      company: "Tech Solutions Ltd.",
      duration: "Mar 2024 - Dec 2025",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "Intern Developer",
      company: "Innovatech Labs",
      duration: "Jun 2023 - Feb 2024",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ];
  return (
    <Card className="w-full min-h-60">
      <CardHeader>
        <CardTitle className="text-2xl ">Experience</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-start justify-start ">
        {experiences.map((experience, index) => (
          <div key={index} className="flex items-stretch justify-start gap-4">
            <div className="flex flex-col items-center">
              <div className="p-1.5 border w-fit h-fit rounded-full bg-primary/10 border-primary/20">
                <Circle
                  size={10}
                  className="text-primary fill-primary animate-bounce"
                />
              </div>
              <div className="flex-1 border-l-2 border-primary/20 min-h-10" />
            </div>
            <div className="flex flex-col items-start justify-start gap-2 pb-6">
              {/* Experience content */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <CardTitle className="text-lg font-medium ">
                  {experience.title}
                </CardTitle>
                <span className="text-sm text-muted-foreground capitalize">
                  {experience.duration}
                  {experience.duration ===
                  new Date().toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                  }) ? (
                    <Badge variant={"default"}>current</Badge>
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <span className="text-base text-muted-foreground">
                {experience.company}
              </span>

              <p className="text-base text-muted-foreground">
                {experience.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
