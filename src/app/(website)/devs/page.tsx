"use client";
import ProfileCard from "@/components/Shared/website/ProfileCard";
import { profileQuery } from "@/hooks/queries/use-profile";
import { UserProfile } from "@/lib/types/profile-type";

export default function Page() {
  const { data: profiles } = profileQuery.GetAllProfiles();

  return (
    <div className="h-dvh">
      <div className="grid grid-cols-3 items-center gap-6 justify-start">
        {profiles?.map((profile: UserProfile, i: number) => (
          <ProfileCard key={i} profile={profile} />
        ))}
      </div>
    </div>
  );
}
