import React from "react";
import { userData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProfileCard from "@/components/Shared/website/ProfileCard";

export default function FeaturedDevelopers() {
  return (
    <div className="w-full space-y-10 mt-20">
      <h2 className="text-3xl font-bold border-l-4 border-primary px-4">Featured Developers</h2>
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map(() =>
          userData.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          )),
        )}
      </div>
      <Button variant={"link"} className="float-right">
        View All Developers
        <ArrowRight />
      </Button>
    </div>
  );
}
