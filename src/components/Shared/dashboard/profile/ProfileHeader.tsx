"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Share } from "lucide-react";

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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Item, ItemContent } from "@/components/ui/item";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useProjectStore } from "@/store/useProjectStore";
import { useProfileStore } from "@/store/ProfileStore";
import { profileQuery } from "@/hooks/queries/use-profile";

const tabsList = [
  { name: "About", value: "about" },
  { name: "Repository", value: "repos" },
  { name: "Projects", value: "projects" },
  { name: "Activity", value: "activity" },
  { name: "Achievements", value: "achievements" },
  { name: "Notes", value: "notes" },
];

export default function ProfileHeader() {
  const { projects } = useProjectStore();
  const { setProfile } = useProfileStore();

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = profileQuery.GetProfile()

  // Sync state cleanly via React lifecycle
  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (isError) {
    return <div>{error?.message || "Failed to load profile"}</div>;
  }

  const userInfo = [
    { label: "Repositories", value: 24 },
    { label: "Projects", value: projects.length },
    { label: "Followers", value: 803 },
    { label: "Following", value: 128 },
    { label: "Profile View", value: 1.5 },
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
          className={"w-full h-48 object-cover"}
        />
        <div className={"absolute -bottom-14 left-5"}>
          <Avatar className={"size-30"}>
            <AvatarImage src={profile?.avatarUrl || ""} />
            <AvatarFallback>{"profile picture"}</AvatarFallback>
            <AvatarBadge className="bottom-3 right-4" />
          </Avatar>
        </div>
      </div>
      <CardHeader className="ml-36">
        <CardTitle>{profile?.fullName || "Full name"}</CardTitle>
        <CardAction>
          <ButtonGroup>
            <Button variant={"outline"} size={"sm"}>
              <Pencil className="size-4 mr-1" /> Edit
            </Button>
            <Button size={"sm"}>
              <Share className="size-4 mr-1" /> Share
            </Button>
          </ButtonGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="mt-1">
        <div className="ml-30">
          <h3 className="font-semibold">
            {profile?.headline || "Full Stack Developer"}
          </h3>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <address className="not-italic">
              {profile?.location || "Dhaka, Bangladesh"}
            </address>
            <Link
              href={`https://${profile?.website || "shawonmondolshibu.vercel.app"}`}
              target="_blank"
            >
              {profile?.website || "shawonmondolshibu.vercel.app"}
            </Link>
          </div>
          <CardDescription className="mt-2">{profile?.bio}</CardDescription>
        </div>

        <Item
          size={"sm"}
          variant={"outline"}
          className="mt-4 bg-background outline-primary"
        >
          <ItemContent className="grid grid-cols-6 items-center justify-center">
            {userInfo.map((info, i) => (
              <div
                key={i}
                className="w-full border-primary not-last:border-r-2 text-center"
              >
                <h3 className="text-base font-bold">{info.value}</h3>
                <p className="text-sm text-muted-foreground">{info.label}</p>
              </div>
            ))}
          </ItemContent>
        </Item>
      </CardContent>
      <CardFooter className="gap-6">
        <TabsList variant={"line"}>
          {tabsList.map((list, i) => (
            <TabsTrigger key={i} value={list.value}>
              {list.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </CardFooter>
    </Card>
  );
}
