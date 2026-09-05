"use client";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { profileQuery } from "@/hooks/queries/use-profile";
import { useProfileStore } from "@/store/ProfileStore";
import { useProjectStore } from "@/store/useProjectStore";
import { MapPin, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

export default function PortfolioCard() {
  const { setProfile } = useProfileStore();
  const { projects } = useProjectStore();
  const { data: profile } = profileQuery.GetMyProfile();
  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);
  const subData = [
    { value: projects.length, label: "Projects" },
    { value: 18, label: "Repos" },
    { value: 832, label: "Followers" },
  ];
  return (
    <Card size="sm" className={"w-xs bg-background"}>
      <Image
        src={profile?.coverUrl || "/brain.jpg"}
        alt={"cover_photo"}
        width={300}
        height={200}
        loading="eager"
        className="w-full h-26 object-cover rounded-2xl p-1"
      />
      <CardContent className="relative">
        <Avatar className={"w-20 h-20 absolute -top-16 mx-auto border-2"}>
          <AvatarImage
            src={
              profile?.avatarUrl ||
              "https://randomimageurl.com/assets/images/local/20260103_0546_Comical%20Canine%20Antics_simple_compose_01ke21r3vdecq8wy9eq7gpz3f0_compressed_q80.jpeg"
            }
            alt={"user_image"}
          />
          <AvatarFallback>{profile?.fullName}</AvatarFallback>
          <AvatarBadge className="bottom-3" />
        </Avatar>
        <div className="mt-6">
          <CardTitle>{profile?.fullName}</CardTitle>
          <p className="text-muted-foreground">
            {profile?.headline || "Full Stack Developer"}{" "}
          </p>
          <address className="flex items-center text-muted-foreground">
            <MapPin size={14} />
            <small>{profile?.location || "Dhaka, Bangladesh"}</small>
          </address>
        </div>

        <div className="grid grid-cols-3 items-center justify-between mt-4 gap-0">
          {subData.map((data, i) => (
            <div
              key={i}
              className="flex flex-col items-center w-full px-4 not-last:border-r-2"
            >
              <h4 className="text-sm font-bold">{data?.value}</h4>
              <span className="text-xs text-muted-foreground">
                {data?.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <CardAction className="w-full">
          <Link href={`/devs/${profile?.id}`} className="w-full">
            <Button
              variant={"default"}
              size={"sm"}
              className={"w-full hover:scale-105"}
            >
              View Portfolio <SquareArrowOutUpRight />
            </Button>
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
