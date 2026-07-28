"use client";
import ProfileCard from "@/components/ProfileCard";
import { profileType } from "@/lib/types/profile-type";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const res = await fetch("http://localhost:6969/profile/");
      return res.json();
    },
  });

  // console.log(profiles.data)

  return (
    <div className="bg-gray-200 h-dvh p-8">
      <div className="flex items-center gap-6">

      {profiles?.data.map((profile:profileType,i:number) => (
        <ProfileCard key={i} profile={profile} />
      ))}
      </div>
    </div>
  );
}
