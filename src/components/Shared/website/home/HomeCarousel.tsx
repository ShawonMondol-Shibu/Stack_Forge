"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";
import { profileQuery } from "@/hooks/queries/use-profile";
import useTechStack from "@/hooks/queries/useTechStack";
import { useSkillsQuery } from "@/hooks/queries/use-skills";
import MotionDiv from "../../MotionDiv";
import { motion } from "motion/react";

export function HomeCarousel() {
  const { data: profiles } = profileQuery.GetAllProfiles();
  const { data: techStack } = useTechStack();
  const [autoplay] = React.useState(() => 
    Autoplay({
      delay: 2000,
      stopOnInteraction: true,
    }),
  );

  return (
    <Carousel
      plugins={[autoplay]}
      opts={{ align: "start", loop: true }}
      className="mx-auto min-h-96 w-full"
      onMouseEnter={() => autoplay.stop()}
      onMouseLeave={() => autoplay.reset()}
    >
      <CarouselContent className="ml-0">
        {profiles?.map((profile) =>
          profile.id ? (
            <ProfileCarouselItem
              key={profile.id}
              profile={profile}
              techStack={techStack}
            />
          ) : null,
        )}
      </CarouselContent>

      <CarouselPrevious className="absolute left-2 md:left-0" />
      <CarouselNext className="absolute right-2 md:right-0" />
    </Carousel>
  );
}

function ProfileCarouselItem({
  profile,
  techStack,
}: {
  profile: NonNullable<
    ReturnType<typeof profileQuery.GetAllProfiles>["data"]
  >[number];
  techStack?: ReturnType<typeof useTechStack>["data"];
}) {
  const { data } = useSkillsQuery.GetSkillsById(profile.userId as string);

  const skillIds = new Set(data?.techStack);
  const userSkills = techStack?.filter((stack) => skillIds.has(stack.id));

  return (
    <CarouselItem className="basis-full p-0 md:px-4 lg:px-6 xl:px-8">
      <MotionDiv className="mx-auto w-full">
        <Card size="sm" className="relative mx-auto w-full p-0">
          <CardContent className="relative p-0 pb-10">
            <Image
              src={
                profile.avatarUrl ||
                "https://images.unsplash.com/photo-1575454723382-16899c8ae4e1?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxMTd8fGthd2FpaSUyMGdpcmx8ZW58MHx8fHwxNzg1MjMzNTQ1fDA&ixlib=rb-4.1.0&fit=max&q=80"
              }
              alt={`${profile.fullName || "Profile"} profile image`}
              width={400}
              height={400}
              sizes="(max-width: 640px) 100vw, 80vw"
              className="aspect-square min-h-80 w-full rounded-md object-cover sm:min-h-96"
            />
            <div className="absolute bottom-0 flex w-full flex-col items-start justify-center gap-2 bg-linear-to-b from-transparent from-5% via-accent/80 via-30% to-accent to-70% p-4 py-6">
              <Badge variant="secondary">Fullstack Developer</Badge>
              <CardTitle className="flex flex-wrap items-center gap-1 wrap-break-word text-2xl font-bold">
                {profile.fullName || "Full name"}
                <BadgeCheck className="size-5 shrink-0 fill-primary stroke-accent" />
              </CardTitle>
              <MotionDiv className="mt-4 flex flex-wrap items-center justify-start gap-3">
                {userSkills?.map((skill) =>
                  skill.image ? (
                    <motion.img
                      key={skill.id}
                      src={skill.image}
                      alt={skill.name}
                      width={28}
                      height={28}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  ) : null,
                )}
              </MotionDiv>
            </div>
          </CardContent>
          
        </Card>
      </MotionDiv>
    </CarouselItem>
  );
}
