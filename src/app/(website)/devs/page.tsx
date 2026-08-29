"use client";
import ProfileCard from "@/components/Shared/website/ProfileCard";
import { apiService } from "@/lib/api-routes/apis";
import { ApiResponse } from "@/lib/types/api";
import { UserProfile } from "@/lib/types/profile-type";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: () =>
      apiService<ApiResponse<UserProfile[]>>({ endpoint: "profile/all" }),
    select: (data) => data.data,
  });

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
