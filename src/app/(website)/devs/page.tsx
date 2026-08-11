"use client";
import ProfileCard from "@/components/Shared/website/ProfileCard";
import { apiService } from "@/lib/api-routes/apis";
import { UserProfile } from "@/lib/types/profile-type";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: ()=> apiService("profile"),
  });

  return (
    <div className="h-dvh py-10 mt-10">
      <div className="flex items-center gap-6 justify-start">

      {profiles?.data.map((profile:UserProfile,i:number) => (
        <ProfileCard key={i} profile={profile} />
      ))}
      </div>
    </div>
  );
}
