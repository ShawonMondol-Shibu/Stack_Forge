"use client";
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Share2 } from "lucide-react";
import Image from "next/image";
import { userData as data } from "@/lib/mockData";
import { AvatarHeader } from "./ProfileAvatar";
import { ProfileMetaInfo } from "./ProfileMetaInfo";

export default function ProfilePage() {
  const userData = data[0];
  const handleShare = () => {
    return navigator.clipboard.writeText(window.location.href);
  };
  return (
    <>
      <Card className="overflow-hidden border-border/60 shadow-sm pt-0">
        {/* Cover Banner */}
        <div className="h-48 w-full bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500 relative">
          {userData.coverUrl && (
            <Image
              src={userData.coverUrl}
              alt="Cover"
              width={800}
              height={600}
              loading="eager"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Profile Header & Controls */}
        <AvatarHeader
          fullName={userData.fullName}
          avatarUrl={userData.avatarUrl}
          availability={userData.availability}
        />

        <CardContent className="space-y-6 pt-0">
          {/* User Title Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight capitalize text-foreground">
                {userData.fullName}
              </h1>
              {userData.headline && (
                <p className="text-muted-foreground mt-0.5">
                  {userData.headline}
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-primary hover:shadow-lg hover:text-white"
              >
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Metadata (Location, Website, Date) */}
          <ProfileMetaInfo
            location={userData.location}
            website={userData.website}
            createdAt={userData.createdAt}
          />

          {/* Bio Section with Empty State Handling */}
          <article className="pt-4 border-t border-border/50">
            <h2 className="text-sm font-medium text-foreground mb-2">About</h2>
            {userData.bio ? (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {userData.bio}
              </p>
            ) : (
              <p className="text-sm italic text-muted-foreground/60">
                No bio provided yet. Click "Edit Profile" to add one.
              </p>
            )}
          </article>
        </CardContent>
      </Card>
    </>
  );
}
