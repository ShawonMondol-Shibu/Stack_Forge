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
import MotionDiv from "../MotionDiv";

export default function ProfileCard({ profile }: { profile: UserProfile }) {
  const [isFollow, setIsFollow] = useState(false);
  const { fullName, headline, avatarUrl } = profile;
  const randomImage =
    "https://images.unsplash.com/photo-1575454723382-16899c8ae4e1?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxMTd8fGthd2FpaSUyMGdpcmx8ZW58MHx8fHwxNzg1MjMzNTQ1fDA&ixlib=rb-4.1.0&fit=max&q=80";
  return (
    <Link href={`/devs/${profile.userId}`}>
      <MotionDiv>
        <Card
          className={
            "w-72 pt-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
          }
        >
          <CardHeader className={"p-1 pb-0 "}>
            <div>
              <Image
                src={avatarUrl || randomImage}
                alt={fullName}
                width={500}
                height={500}
                className={
                  "rounded-3xl w-full h-40 aspect-square  object-cover"
                }
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-1 pt-0">
            <CardTitle className="flex items-center gap-1.5  font-bold tracking-tight">
              <span className="truncate capitalize">{fullName}</span>
              <BadgeCheck className="h-5 w-5 shrink-0 text-primary fill-primary/10" />
            </CardTitle>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {headline}
            </p>
          </CardContent>

          <CardFooter className={"items-start justify-between"}>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
                <Users size={14} className=" text-muted-foreground" />
                <span>5K</span>
              </div>
              <span className="text-xs text-muted-foreground">Following</span>
            </div>

            {/* Metric: Following */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
                <UserPlus size={14} className=" text-muted-foreground" />
                <span>1K</span>
              </div>
              <span className="text-xs text-muted-foreground">Following</span>
            </div>
            <Button
              variant={isFollow ? "outline" : "default"}
              size={"sm"}
              onClick={() => setIsFollow((prev) => !prev)}
              className={"shadow bg"}
            >
              {isFollow ? (
                <>
                  <Check /> Unfollow
                </>
              ) : (
                <>
                  Connect <Plus />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </MotionDiv>
    </Link>
  );
}
