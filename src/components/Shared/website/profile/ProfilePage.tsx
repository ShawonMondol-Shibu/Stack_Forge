"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, Share2 } from "lucide-react";
import { profileQuery } from "@/hooks/queries/use-profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProfileEducations from "./ProfileEducations";
import ProfileExperience from "./ProfileExperience";
import ProfileProjects from "./ProfileProjects";
import ProfileSkills from "./ProfileSkills";

export default function ProfilePage({ id }: { id: string }) {
  const {
    data: profile,
    isPending,
    isError,
    error,
  } = profileQuery.GetProfileById(id);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
    } catch {
      window.prompt("Copy this profile link", window.location.href);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center text-sm text-muted-foreground">
        Loading profile...
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-sm text-destructive">
            {error?.message || "This profile could not be found."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-border/60 pt-0 shadow-sm">
        <div className="relative h-40 w-full bg-muted sm:h-52">
          <Image
            src={profile.coverUrl || "/brain.jpg"}
            alt={`${profile.fullName || "Profile"} cover`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <CardContent className="space-y-5 pt-0">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-full border-4 border-background bg-muted sm:size-32">
                <Image
                  src={profile.avatarUrl || "/logo.svg"}
                  alt={profile.fullName || "Profile photo"}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <div className="pb-2">
                <h1 className="text-2xl font-semibold capitalize tracking-tight text-foreground sm:text-3xl">
                  {profile.fullName || "Full name"}
                </h1>
                <p className="mt-0.5 text-muted-foreground">
                  {profile.headline || ""}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2 self-start sm:self-auto"
            >
              <Share2 className="size-4" />
              {isCopied ? "Copied" : "Share"}
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {profile.location && <span>{profile.location}</span>}
            {profile.website && (
              <a
                href={
                  profile.website.match(/^https?:\/\//)
                    ? profile.website
                    : `https://${profile.website}`
                }
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                {profile.website.replace(/^https?:\/\//, "")}
              </a>
            )}
            {profile.createdAt && (
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-4" />
                Joined {new Date(profile.createdAt).toLocaleDateString()}
              </span>
            )}
            {profile.availability && (
              <span className="capitalize">
                {profile.availability.replace("_", " ")}
              </span>
            )}
          </div>

          {profile.bio && (
            <section className="border-t border-border/50 pt-4">
              <h2 className="mb-2 text-sm font-medium text-foreground">
                About
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {profile.bio}
              </p>
            </section>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-4">
          <ProfileExperience id={profile.id || id} />
          <ProfileEducations id={profile.userId || ""} />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <ProfileSkills id={profile.userId || ""} />
          <ProfileProjects id={profile.userId || ""} />
        </div>
      </div>
    </div>
  );
}
