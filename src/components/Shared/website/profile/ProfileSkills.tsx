"use client";

import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { useSkillsQuery } from "@/hooks/queries/use-skills";
import useTechStack from "@/hooks/queries/useTechStack";

export default function ProfileSkills({ id }: { id: string }) {
  const {
    data: skillConfig,
    isPending,
    isError,
  } = useSkillsQuery.GetSkillsById(id);
  const { data: techStacks = [] } = useTechStack();
  const selectedIds = new Set(skillConfig?.techStack ?? []);
  const skills = techStacks.filter((stack) => selectedIds.has(stack.id));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="flex min-h-20 items-center justify-center">
            <LoaderCircle className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <p role="alert" className="text-sm text-destructive">
            Could not load skills.
          </p>
        ) : skills.length ? (
          <ItemGroup className="flex flex-row flex-wrap items-center gap-2">
            {skills.map((skill) => (
              <Item
                key={skill.id}
                variant="outline"
                size="xs"
                className="w-fit gap-2"
              >
                {skill.image && (
                  <ItemMedia>
                    <Image
                      src={skill.image}
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                      className="size-5 object-contain"
                    />
                  </ItemMedia>
                )}
                <ItemContent>
                  <ItemTitle>{skill.name}</ItemTitle>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        ) : (
          <p className="text-sm text-muted-foreground">
            No public skills listed.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
