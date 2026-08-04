import React from "react";
import ProfileCard from "../ProfileCard";
import { userData } from "@/lib/mockData";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function FeaturedDevelopers() {
  return (
    <div className="w-full max-w-4xl space-y-10 py-10 mt-20">
      <h2 className="text-3xl font-bold">Featured Developers</h2>
      <div className="flex flex-wrap gap-4">
        {
        Array.from({length: 6}).map(()=>(
          userData.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))

        )) 
        }
      </div>
      <Button variant={"link"} className="float-right">
        View All Developers
        <ArrowRight/>
      </Button>
    </div>
  );
}