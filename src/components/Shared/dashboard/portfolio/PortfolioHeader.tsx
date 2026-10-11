"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, MapPin, Share2, UsersRound } from "lucide-react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/lib/types/profile-type";
import { useSkillsQuery } from "@/hooks/queries/use-skills";
import { followQuery } from "@/hooks/queries/use-follow";
import useTechStack from "@/hooks/queries/useTechStack";
import PortfolioCodeBlock from "./PortfolioCodeBlock";

export default function PortfolioHeader({
  profile,
  isReadOnly = false,
}: {
  profile?: UserProfile;
  isReadOnly?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const { data: skillConfig } = useSkillsQuery.GetSkillsById(
    profile?.userId ?? "",
  );
  const { data: techStacks = [] } = useTechStack();
  const {
    data: followers,
    isPending: isFollowersPending,
    isError: isFollowersError,
  } = followQuery.GetUserFollowers(profile?.userId ?? "");
  const {
    data: following,
    isPending: isFollowingPending,
    isError: isFollowingError,
  } = followQuery.GetUserFollowing(profile?.userId ?? "");
  const selectedSkillIds = new Set(skillConfig?.techStack ?? []);
  const skills = techStacks.filter((stack) => selectedSkillIds.has(stack.id));
  const websiteHref = profile?.website
    ? /^https?:\/\//.test(profile.website)
      ? profile.website
      : `https://${profile.website}`
    : null;
  const initials = (profile?.fullName || "Developer")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sharePortfolio = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this portfolio link", window.location.href);
    }
  };

  return (
    <header className="border-b border-border/70 pb-8 sm:pb-10">
      <div className="grid gap-8 pt-4 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center lg:gap-12">
        <div className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase text-muted-foreground">
              Portfolio
            </span>
            {profile?.availability && (
              <Badge
                variant={
                  profile.availability === "open" ? "secondary" : "outline"
                }
                className="capitalize"
              >
                {profile.availability === "open"
                  ? "Open to opportunities"
                  : profile.availability.replaceAll("_", " ")}
              </Badge>
            )}
          </div>

          <h1 className="max-w-4xl wrap-break-word text-4xl font-semibold leading-tight sm:text-5xl">
            {profile?.fullName || "Developer portfolio"}
          </h1>
          {profile?.headline && (
            <p className="mt-3 max-w-3xl text-xl text-muted-foreground sm:text-2xl">
              {profile.headline}
            </p>
          )}
          {profile?.bio && (
            <p className="mt-5 max-w-2xl whitespace-pre-line text-base leading-7 text-muted-foreground">
              {profile.bio}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {profile?.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {profile.location}
              </span>
            )}
            {websiteHref && (
              <a
                href={websiteHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline"
              >
                Website <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-y border-border/70 py-3">
            <div className="flex items-center gap-2">
              <UsersRound className="size-4 text-primary" aria-hidden="true" />
              <span className="font-semibold text-foreground">
                {isFollowersPending
                  ? "..."
                  : isFollowersError
                    ? "—"
                    : new Intl.NumberFormat().format(followers?.length ?? 0)}
              </span>
              <span className="text-sm text-muted-foreground">Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersRound
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="font-semibold text-foreground">
                {isFollowingPending
                  ? "..."
                  : isFollowingError
                    ? "—"
                    : new Intl.NumberFormat().format(following?.length ?? 0)}
              </span>
              <span className="text-sm text-muted-foreground">Following</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {websiteHref && (
              <Button
                render={
                  <a href={websiteHref} target="_blank" rel="noreferrer" />
                }
              >
                Visit website <ExternalLink data-icon="inline-end" />
              </Button>
            )}
            <Button variant="outline" onClick={sharePortfolio}>
              <Share2 data-icon="inline-start" />
              {copied ? "Link copied" : "Share portfolio"}
            </Button>
            {!isReadOnly && (
              <Button
                variant="outline"
                render={<Link href="/dashboard/profile" />}
              >
                Edit profile
              </Button>
            )}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-64 lg:max-w-none">
          <div className="absolute -right-3 -top-3 size-16 border-r-2 border-t-2 border-primary" />
          <Avatar className="aspect-4/5 h-auto w-full rounded-md bg-muted">
            <AvatarImage
              src={profile?.avatarUrl || undefined}
              alt={profile?.fullName || "Profile portrait"}
              className="object-cover"
            />
            <AvatarFallback className="rounded-md text-4xl font-semibold">
              {initials}
            </AvatarFallback>
            <AvatarBadge className="bottom-3 right-3 size-4 border-2 border-background" />
          </Avatar>
          <div className="absolute -bottom-2 -left-2 h-12 w-1.5 bg-primary" />
        </div>
      </div>

      <PortfolioCodeBlock
        className="mt-8 max-w-2xl"
        profile={profile}
        skills={skills}
      />
    </header>
  );
}
