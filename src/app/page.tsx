"use client";
import ProfileCard from "@/components/ProfileCard";
import { apiService } from "@/lib/api-routes/apis";
import { profileType } from "@/lib/types/profile-type";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: ()=> apiService.allProfiles("profile", "GET"),
  });

  return (
    <div className="h-dvh p-0">
      <div className="flex items-center gap-6">

      {profiles?.data.map((profile:profileType,i:number) => (
        <ProfileCard key={i} profile={profile} />
      ))}
      </div>
    </div>
  );
}
