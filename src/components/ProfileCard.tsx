"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { profileType } from "@/lib/types/profile-type";
import { Button } from "./ui/button";
import {
  BadgeCheck,
  Check,
  Plus,
  UserPlus,
  Users,
} from "lucide-react";

export default function ProfileCard({ profile }: { profile: profileType }) {
  const [isFollow, setIsFollow] = useState(false);
  const { fullName, headline, avatarUrl } = profile;
  const randomImage =
    "https://images.unsplash.com/photo-1575454723382-16899c8ae4e1?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxMTd8fGthd2FpaSUyMGdpcmx8ZW58MHx8fHwxNzg1MjMzNTQ1fDA&ixlib=rb-4.1.0&fit=max&q=80";
  return (
    <div>
      <Card className={"w-72 pt-0"}>
        <CardHeader className={"p-2 pb-0 "}>
            <div>

          <Image
            src={avatarUrl || randomImage}
            alt={fullName}
            width={500}
            height={500}
            className={"rounded-4xl w-full h-full aspect-square  object-cover"}
          />
            </div>
        </CardHeader>
        <CardContent className="space-y-1 pt-0">
          <CardTitle className="flex items-center gap-1.5 text-xl font-bold tracking-tight">
            <span className="truncate capitalize">{fullName}</span>
            <BadgeCheck className="h-5 w-5 shrink-0 text-primary fill-primary/10" />
          </CardTitle>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {headline}
          </p>
        </CardContent>

        <CardFooter className={"items-start justify-between"}>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>5K</span>
            </div>
            <span className="text-xs text-muted-foreground">Following</span>
          </div>

          {/* Metric: Following */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
              <UserPlus className="h-4 w-4 text-muted-foreground" />
              <span>1K</span>
            </div>
            <span className="text-xs text-muted-foreground">Following</span>
          </div>
          <Button
            variant={isFollow ? "outline" : "default"}
            size={"lg"}
            onClick={() => setIsFollow((prev) => !prev)}
            className={"shadow bg"}
          >
            {isFollow ? (
              <>
                <Check /> Unfollow
              </>
            ) : (
              <>
                Follow <Plus />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
