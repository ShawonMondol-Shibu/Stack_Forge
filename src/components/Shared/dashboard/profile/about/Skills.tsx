"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Pencil, Loader2 } from "lucide-react";

import MotionDiv from "@/components/Shared/MotionDiv";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { useTechStackStore } from "@/store/TechStackStore";
import AddSkill from "./skills/AddSkills";
import useTechStack from "@/hooks/queries/useTechStack";
import { useSkillsQuery } from "@/hooks/queries/use-skills";
import useSkillsStore from "@/store/useSkillsStore";

const DISPLAY_LIMIT = 12;

export default function Skills() {
  const setTechStack = useTechStackStore((state) => state.setTechStack);
  const { setSkills } = useSkillsStore();

  // Query 1: User's enabled skill IDs
  const {
    data: skills,
    isLoading: isSkillsLoading,
    isError: isSkillsError,
  } = useSkillsQuery();

  // Query 2: Master tech stack database catalog
  const {
    data: techStacks,
    isLoading: isTechLoading,
    isError: isTechError,
  } = useTechStack();

  // Update store conditionally without triggering extra re-renders during render cycles
  useMemo(() => {
    if (techStacks && techStacks.length > 0) {
      setTechStack(techStacks);
    }
    if (skills) {
      setSkills(skills);
    }
  }, [techStacks, setTechStack, skills, setSkills]);

  // O(N + M) Lookup Optimization via Set indexing
  const mySkills = useMemo(() => {
    if (!skills || !techStacks) return [];
    const skillSet = new Set(skills.techStack || []);
    return techStacks.filter((stack) => skillSet.has(stack.id));
  }, [skills, techStacks]);

  const isLoading = isSkillsLoading || isTechLoading;
  const isError = isSkillsError || isTechError;
  const hasMoreSkills = mySkills.length > DISPLAY_LIMIT;
  const visibleSkills = hasMoreSkills
    ? mySkills.slice(0, DISPLAY_LIMIT)
    : mySkills;

  return (
    <Card className="min-h-64 gap-0">
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardAction>
          {/* <Button size="icon-sm" variant="ghost" aria-label="Edit skills">
            <Pencil className="h-4 w-4" />
          </Button> */}
          <AddSkill />
        </CardAction>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex min-h-40 w-full items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="flex min-h-40 w-full items-center justify-center">
            <p className="text-sm text-destructive">
              Failed to load skills configuration.
            </p>
          </div>
        ) : visibleSkills.length === 0 ? (
          <div className="flex min-h-40 w-full items-center justify-center">
            <p className="text-sm text-muted-foreground">No skills selected.</p>
          </div>
        ) : (
          <ItemGroup className="flex flex-col gap-4">
            <div className="flex flex-row flex-wrap items-center gap-2">
              {visibleSkills.map((skill) => (
                <MotionDiv key={skill.id}>
                  <Item
                    variant="outline"
                    size="xs"
                    className="w-fit gap-1.5 p-2"
                  >
                    {skill.image && (
                      <ItemMedia>
                        <Image
                          src={skill.image}
                          width={18}
                          height={18}
                          alt={skill.name || "Tech stack icon"}
                          className="object-contain"
                        />
                      </ItemMedia>
                    )}
                    <ItemContent>
                      <ItemTitle className="text-xs font-medium">
                        {skill.name}
                      </ItemTitle>
                    </ItemContent>
                  </Item>
                </MotionDiv>
              ))}
            </div>

            {hasMoreSkills && (
              <div className="flex justify-start">
                <Button variant="link" size="xs" className="h-auto p-0">
                  View all skills ({mySkills.length})
                </Button>
              </div>
            )}
          </ItemGroup>
        )}
      </CardContent>
      <CardFooter>
        {mySkills.length > 0 ? (
          <p className="text-sm text-muted-foreground">
            Total skills selected: {mySkills.length}
          </p>
        ) : (
          <AddSkill />
        )}
      </CardFooter>
    </Card>
  );
}
