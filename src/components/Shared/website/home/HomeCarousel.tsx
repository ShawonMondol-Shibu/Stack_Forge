"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { profileQuery } from "@/hooks/queries/use-profile";
import useTechStack from "@/hooks/queries/useTechStack";
import { useSkillsQuery } from "@/hooks/queries/use-skills";
import MotionDiv from "../../MotionDiv";

// Local file: public/default-avatar.png
const DEFAULT_AVATAR = "/default-avatar.png";

// Home page e shob profile dekhanor dorkar nei, request o kome
const MAX_SLIDES = 8;

type Profile = NonNullable<
  ReturnType<typeof profileQuery.GetAllProfiles>["data"]
>[number];
type TechStack = NonNullable<ReturnType<typeof useTechStack>["data"]>;

export function HomeCarousel() {
  const { data: profiles } = profileQuery.GetAllProfiles();
  const { data: techStack } = useTechStack();

  // Autoplay er built-in option use kora hoyeche, tai alada mouse handler lage na
  const [autoplay] = React.useState(() =>
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  // techStack ekbar Map e convert, protita slide e filter korte hobe na
  const techStackMap = React.useMemo(
    () => new Map((techStack ?? []).map((stack) => [stack.id, stack])),
    [techStack],
  );

  const visibleProfiles = React.useMemo(
    () => (profiles ?? []).filter((p) => p.id).slice(0, MAX_SLIDES),
    [profiles],
  );

  return (
    <Carousel
      plugins={[autoplay]}
      opts={{ align: "start", loop: true }}
      className="mx-auto min-h-96 w-full"
    >
      <CarouselContent className="ml-0">
        {visibleProfiles.map((profile, index) => (
          <ProfileCarouselItem
            key={profile.id}
            profile={profile}
            techStackMap={techStackMap}
            priority={index === 0}
          />
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-2 md:left-0" />
      <CarouselNext className="absolute right-2 md:right-0" />
    </Carousel>
  );
}

const ProfileCarouselItem = React.memo(function ProfileCarouselItem({
  profile,
  techStackMap,
  priority,
}: {
  profile: Profile;
  techStackMap: Map<string, TechStack[number]>;
  priority: boolean;
}) {
  const { data } = useSkillsQuery.GetSkillsById(profile.userId as string);

  const userSkills = React.useMemo(
    () =>
      (data?.techStack ?? [])
        .map((id: string) => techStackMap.get(id))
        .filter((skill): skill is TechStack[number] => Boolean(skill?.image)),
    [data?.techStack, techStackMap],
  );

  return (
    <CarouselItem className="basis-full p-0 md:px-4 lg:px-6 xl:px-8">
      <MotionDiv className="mx-auto w-full">
        <Card size="sm" className="relative mx-auto w-full p-0">
          <CardContent className="relative p-0 pb-10">
            <Image
              src={profile.avatarUrl || DEFAULT_AVATAR}
              alt={`${profile.fullName || "Profile"} profile image`}
              width={400}
              height={400}
              sizes="(max-width: 640px) 100vw, 80vw"
              priority={priority}
              className="aspect-square min-h-80 w-full rounded-md object-cover sm:min-h-96"
            />
            <div className="absolute bottom-0 flex w-full flex-col items-start justify-center gap-2 bg-linear-to-b from-transparent from-5% via-accent/80 via-30% to-accent to-70% p-4 py-6">
              <Badge variant="secondary">Fullstack Developer</Badge>
              <CardTitle className="flex flex-wrap items-center gap-1 wrap-break-word text-2xl font-bold">
                {profile.fullName || "Full name"}
                <BadgeCheck className="size-5 shrink-0 fill-primary stroke-accent" />
              </CardTitle>
              {/* Plain div: slide gulo offscreen e animation chalabe na */}
              <div className="mt-4 flex flex-wrap items-center justify-start gap-3">
                {userSkills.map((skill) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={skill.id}
                    src={skill.image}
                    alt={skill.name}
                    width={28}
                    height={28}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </MotionDiv>
    </CarouselItem>
  );
});