"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { UserProfile } from "@/lib/types/profile-type";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Check, Plus, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { followMutation } from "@/hooks/mutations/use-follow-mutation";
import { followQuery } from "@/hooks/queries/use-follow";
import UseSession from "@/components/Shared/UseSession";

export default function ProfileCard({ profile }: { profile: UserProfile }) {
  const targetUserId = profile.userId ?? "";
  const { data: session } = UseSession();

  // ডাটাবেস বা সার্ভার থেকে চেক করা ইউজারকে ফলো করা আছে কিনা
  const {
    data: followingData,
    isPending: isFollowingPending,
    isError: isFollowingError,
  } = followQuery.GetFollowing();
  const { data: followersData } = followQuery.GetUserFollowers(targetUserId);
  const { data: targetFollowingData } =
    followQuery.GetUserFollowing(targetUserId);

  const { mutate: follow, isPending: isFollowing } = followMutation.Follow();
  const { mutate: unfollow, isPending: isUnfollowing } =
    followMutation.Unfollow();

  const isServerFollowing = Boolean(
    followingData?.some((item) => item.followingId === targetUserId),
  );
  const [optimisticFollow, setOptimisticFollow] = useState<boolean | null>(
    null,
  );
  const isFollow = optimisticFollow ?? isServerFollowing;

  const isSelf = session?.user?.id === targetUserId;
  const isMutating = isFollowing || isUnfollowing;

  const numberFormat = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  });

  const handleFollowToggle = () => {
    if (
      !targetUserId ||
      isSelf ||
      isMutating ||
      isFollowingPending ||
      isFollowingError
    ) {
      return;
    }

    if (isFollow) {
      setOptimisticFollow(false);
      unfollow(targetUserId, {
        onError: () => setOptimisticFollow(null),
        onSuccess: () => setOptimisticFollow(null),
      });
    } else {
      setOptimisticFollow(true);
      follow(
        { followingId: targetUserId },
        {
          onError: () => setOptimisticFollow(null),
          onSuccess: () => setOptimisticFollow(null),
        },
      );
    }
  };

  return (
    <Card
      className={
        "w-full pt-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
      }
    >
      <CardHeader className={"p-1 pb-0 "}>
        <div>
          <Image
            src={profile?.avatarUrl as string}
            alt={profile?.fullName || "profile_image"}
            width={500}
            height={500}
            className={"rounded-3xl w-full h-40 aspect-square object-cover"}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-1 pt-0">
        <Link href={`/devs/${profile?.id}`}>
          <CardTitle className="flex items-center gap-1.5 font-bold tracking-tight">
            <span className="truncate capitalize">{profile?.fullName}</span>
            <BadgeCheck className="h-5 w-5 shrink-0 text-primary fill-primary/10" />
          </CardTitle>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {profile?.headline}
          </p>
        </Link>
      </CardContent>

      <CardFooter className={"items-start justify-between gap-4"}>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
              <Users size={14} className=" text-muted-foreground" />
              <span>{numberFormat.format(followersData?.length ?? 0)}</span>
            </div>
            <span className="text-xs text-muted-foreground">Followers</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
              <UserPlus size={14} className=" text-muted-foreground" />
              <span>
                {numberFormat.format(targetFollowingData?.length ?? 0)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Following</span>
          </div>
        </div>

        <Button
          variant={"outline"}
          size={"sm"}
          onClick={handleFollowToggle}
          disabled={
            !targetUserId ||
            !session?.user?.id ||
            isSelf ||
            isFollowingPending ||
            isFollowingError ||
            isMutating
          }
          aria-pressed={isFollow}
          className={cn(!isFollow ? "border-primary text-primary" : "")}
        >
          {isFollow ? (
            <>
              <Check /> {isUnfollowing ? "Unfollowing..." : "Unfollow"}
            </>
          ) : (
            <>
              {isFollowingPending
                ? "Checking..."
                : isFollowing
                  ? "Connecting..."
                  : "Connect"}{" "}
              <Plus />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
