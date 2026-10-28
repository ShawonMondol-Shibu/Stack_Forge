"use client";
import React, { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Check, Plus, UserPlus, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/lib/types/profile-type";
import { cn } from "@/lib/utils";
import { followMutation } from "@/hooks/mutations/use-follow-mutation";
import { followQuery, useIsFollowing } from "@/hooks/queries/use-follow";
import UseSession from "@/components/Shared/UseSession";

// Local file: public/default-avatar.png
const DEFAULT_AVATAR = "/default-avatar.png";

// Module level e ekbar-i banano hoy, protita card render e noton object lage na
const compactNumber = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function ProfileCard({ profile }: { profile: UserProfile }) {
  const targetUserId = profile.userId ?? "";

  const { data: session } = UseSession();
  const currentUserId = session?.user?.id;
  const isLoggedIn = Boolean(currentUserId);
  const isSelf = currentUserId === targetUserId;

  // Shudhu true/false, logged out hole request-i jabe na
  const {
    data: isServerFollowing = false,
    isLoading: isFollowingLoading,
    isError: isFollowingError,
  } = useIsFollowing(targetUserId, isLoggedIn);

  const { data: followersData } = followQuery.GetUserFollowers(targetUserId);
  const { data: targetFollowingData } =
    followQuery.GetUserFollowing(targetUserId);

  const { mutate: follow, isPending: isFollowing } =
    followMutation.Follow(currentUserId);
  const { mutate: unfollow, isPending: isUnfollowing } =
    followMutation.Unfollow(currentUserId);

  const [optimisticFollow, setOptimisticFollow] = useState<boolean | null>(
    null,
  );
  const isFollow = optimisticFollow ?? isServerFollowing;
  const isMutating = isFollowing || isUnfollowing;

  // Disabled condition ekbar-i, handler ar button duto jaygay same
  const isDisabled =
    !targetUserId ||
    !isLoggedIn ||
    isSelf ||
    isFollowingLoading ||
    isFollowingError ||
    isMutating;

  const resetOptimistic = () => setOptimisticFollow(null);

  const handleFollowToggle = () => {
    if (isDisabled) return;

    if (isFollow) {
      setOptimisticFollow(false);
      unfollow(targetUserId, { onSettled: resetOptimistic });
    } else {
      setOptimisticFollow(true);
      follow({ followingId: targetUserId }, { onSettled: resetOptimistic });
    }
  };

  return (
    <Card className="w-full pt-0 hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-300 ease-in-out">
      <CardHeader className="p-1 pb-0">
        <Image
          src={profile?.avatarUrl || DEFAULT_AVATAR}
          alt={profile?.fullName || "profile_image"}
          width={500}
          height={500}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          className="rounded-3xl w-full h-40 object-cover"
        />
      </CardHeader>

      <CardContent className="space-y-1 pt-0">
        <Link href={`/devs/${profile?.id}`} prefetch={false}>
          <CardTitle className="flex items-center gap-1.5 font-bold tracking-tight">
            <span className="truncate capitalize">{profile?.fullName}</span>
            <BadgeCheck className="h-5 w-5 shrink-0 text-primary fill-primary/10" />
          </CardTitle>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {profile?.headline}
          </p>
        </Link>
      </CardContent>

      <CardFooter className="items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
              <Users size={14} className="text-muted-foreground" />
              <span>{compactNumber.format(followersData?.length ?? 0)}</span>
            </div>
            <span className="text-xs text-muted-foreground">Followers</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
              <UserPlus size={14} className="text-muted-foreground" />
              <span>
                {compactNumber.format(targetFollowingData?.length ?? 0)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Following</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleFollowToggle}
          disabled={isDisabled}
          aria-pressed={isFollow}
          className={cn(!isFollow && "border-primary text-primary")}
        >
          {isFollow ? (
            <>
              <Check /> Unfollow
            </>
          ) : (
            <>
              {isFollowingLoading ? "Checking..." : "Connect"} <Plus />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default memo(ProfileCard);