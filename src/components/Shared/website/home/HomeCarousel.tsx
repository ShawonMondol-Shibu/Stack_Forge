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
      className="w-fit"
      onMouseEnter={() => autoplay.stop()}
      onMouseLeave={() => autoplay.reset()}
    >
      <CarouselContent>
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

      <CarouselPrevious />
      <CarouselNext />
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
  console.log(data);

  return (
    <CarouselItem key={profile.id}>
      <div className="p-4">
        <Card size="sm" className="shadow-lg p-0 w-lg">
          <CardContent className="p-0 pb-10">
            <Image
              src={
                profile?.avatarUrl ||
                `https://images.unsplash.com/photo-1575454723382-16899c8ae4e1?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxMTd8fGthd2FpaSUyMGdpcmx8ZW58MHx8fHwxNzg1MjMzNTQ1fDA&ixlib=rb-4.1.0&fit=max&q=80`
              }
              alt={"Carousel Image"}
              width={400}
              height={400}
              className="rounded-md w-full object-cover"
            />
            <div className="absolute w-full bottom-0 bg-linear-to-b from-transparent from-5%  via-accent/80 via-30% to-accent to-70%  p-4 py-6 flex flex-col items-start justify-center gap-2">
                <Badge variant="secondary">Fullstack Developer</Badge>
                <CardTitle className={"text-2xl font-bold flex items-center "}>
                  Shawon Mondol Shibu{" "}
                  <BadgeCheck className=" fill-primary stroke-accent size-5" />
                </CardTitle>
                <div className="flex flex-wrap gap-2 items-center justify-start mt-4 ">
                  {userSkills?.map((skill) => 
                  skill.image?
                  (
                    <Image
                      key={skill.id}
                      src={skill.image}
                      alt={skill.name}
                      width={24}
                      height={24}
                    />
                  ):null)}
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
