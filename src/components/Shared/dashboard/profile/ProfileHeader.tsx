"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share } from "lucide-react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Item, ItemContent } from "@/components/ui/item";

import { useProjectStore } from "@/store/useProjectStore";
import { useProfileStore } from "@/store/ProfileStore";
import { profileQuery } from "@/hooks/queries/use-profile";
import ProfileForm from "./ProfileForm";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";

export default function ProfileHeader() {
  const { projects } = useProjectStore();
  const { setProfile } = useProfileStore();

  const { data: profile, isPending } = profileQuery.GetMyProfile();

  const profileView = profile?.viewCount ?? 0;

  // Sync state cleanly via React lifecycle
  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

  if (isPending) {
    return <ProfileHeaderSkeleton />;
  }

  const userInfo = [
    { label: "Repositories", value: 24 },
    { label: "Projects", value: projects.length },
    { label: "Followers", value: 803 },
    { label: "Following", value: 128 },
    { label: "Profile View", value: profileView },
    { label: "Achievements", value: 16 },
  ];

  return (
    <Card size={"sm"} className={"w-full min-h-80 pt-0"}>
      <div className={"relative"}>
        <Image
          src={profile?.coverUrl || "/brain.jpg"}
          alt={"profile_cover-image"}
          width={800}
          height={600}
          className={"h-32 w-full object-cover sm:h-48"}
        />
        <div className={"absolute -bottom-10 left-4 sm:-bottom-14 sm:left-5"}>
          <Avatar className={"size-20 sm:size-30"}>
            <AvatarImage src={profile?.avatarUrl || ""} />
            <AvatarFallback>{"profile picture"}</AvatarFallback>
            <AvatarBadge className="bottom-3 right-4" />
          </Avatar>
        </div>
      </div>
      <CardHeader className="ml-0 grid-cols-1 pt-12 sm:ml-36 sm:grid-cols-[1fr_auto] sm:pt-0">
        <CardTitle className="min-w-0 wrap-break-word">
          {profile?.fullName || "Full name"}
        </CardTitle>
        <CardAction className="col-start-1 row-start-2 justify-self-start sm:col-start-2 sm:row-start-1 sm:justify-self-end">
          <ButtonGroup>
            {/*Profile Form Added*/}
            <ProfileForm profile={profile} />
            <Button size={"sm"}>
              <Share className="size-4 mr-1" /> Share
            </Button>
          </ButtonGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="mt-1">
        <div className="ml-0 min-w-0 sm:ml-30">
          <h3 className="wrap-break-word font-semibold">
            {profile?.headline || "Full Stack Developer"}
          </h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <address className="not-italic">
              {profile?.location || "Dhaka, Bangladesh"}
            </address>
            <Link
              href={`https://${profile?.website || "shawonmondolshibu.vercel.app"}`}
              target="_blank"
              className="min-w-0 break-all"
            >
              {profile?.website || "shawonmondolshibu.vercel.app"}
            </Link>
          </div>
          <CardDescription className="mt-2 wrap-break-word">
            {profile?.bio}
          </CardDescription>
        </div>

        <Item
          size={"sm"}
          variant={"outline"}
          className="mt-4 bg-background outline-primary"
        >
          <ItemContent className="grid grid-cols-2 items-center justify-center gap-x-0 gap-y-3 sm:grid-cols-3 md:grid-cols-6">
            {userInfo.map((info, i) => (
              <div
                key={i}
                className="w-full min-w-0 text-center border-x-2 border-primary/50 "
              >
                <h3 className="text-sm font-bold sm:text-base">{info.value}</h3>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {info.label}
                </p>
              </div>
            ))}
          </ItemContent>
        </Item>
      </CardContent>
    </Card>
  );
}
