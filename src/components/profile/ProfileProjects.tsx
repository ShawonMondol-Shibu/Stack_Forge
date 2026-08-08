import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ItemGroup } from "@/components/ui/item";
import ProjectCard from "../Shared/ProjectCard";

export default function ProfileProjects() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Projects:</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup className="grid grid-cols-4 gap-4 items-center justify-start ">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProjectCard key={i} />
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
