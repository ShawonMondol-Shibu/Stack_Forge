"use client";
import ProfileCard from "@/components/Shared/website/ProfileCard";
import { profileQuery } from "@/hooks/queries/use-profile";
import { UserProfile } from "@/lib/types/profile-type";

export default function Home() {
  const { data: profiles } = profileQuery.GetAllProfiles();

  return (
    <div className="h-dvh py-10 mt-10">
      <div className="flex items-center gap-6 justify-start">
        {profiles?.map((profile: UserProfile, i: number) => (
          <ProfileCard key={i} profile={profile} />
        ))}
      </div>
    </div>
  );
}
