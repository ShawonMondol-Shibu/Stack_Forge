"use client"
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit3, Share2 } from "lucide-react";
import { UserProfile } from "@/lib/types/profile-type";
import Image from "next/image";
import { ProfileMetaInfo } from "@/components/profile/ProfileMetaInfo";
import { AvatarHeader } from "@/components/profile/ProfileAvatar";

// Mock Data Payload (Your JSON)
const userData: UserProfile = {
  id: "bf450dfe-6c86-4363-9f52-ed135ff9c083",
  userId: "XrzNFBLt6F8aOgLbhrPXHYhLtEtr7hxD",
  fullName: "shawon mondol shibu",
  headline: "hi i am a fullstack web developer.",
  bio: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum officiis error, quam facere dolore aliquam atque illo recusandae similique? Quidem libero asperiores vero consectetur molestias repudiandae consequuntur perspiciatis ea rerum?",
  location: "Netrakona, mymensingh, Bangladesh",
  website: "shawon-mondol-shibu.vercel.app",
  avatarUrl:
    "https://images.unsplash.com/photo-1575454723382-16899c8ae4e1?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxMTd8fGthd2FpaSUyMGdpcmx8ZW58MHx8fHwxNzg1MjMzNTQ1fDA&ixlib=rb-4.1.0&fit=max&q=80",
  coverUrl: "/brain.jpg",
  availability: "open",
  createdAt: "2026-07-24T20:42:32.198Z",
  updatedAt: "2026-07-24T20:42:32.198Z",
};

export default function ProfilePage() {

  const handleShare = ()=> {
return navigator.clipboard.writeText(window.location.href)
  }
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
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
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
