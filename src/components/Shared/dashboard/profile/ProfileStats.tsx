import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, Eye, Folder, Users } from "lucide-react";
import React from "react";
import { GiThunderBlade } from "react-icons/gi";

export default function ProfileStats() {
    const stats = [
        {name: "Profile Views", value: 1200, total:24, icon: Eye},
        {name: "Repository Views", value: 3500, total:18, icon: GiThunderBlade},
        {name: "Project Views", value: 862, total:31, icon: Folder},
        {name: "New Followers", value: 44, total:20, icon: Users},

    ]
  return (
    <Card className={"gap-0 w-full"}>
      <CardHeader>
        <CardTitle>Profile Stats</CardTitle>
      </CardHeader>
      <CardContent>
        {
            stats.map((stat, i)=>(
        <div key={i} className={"flex items-center justify-between p-2"}>
          <span className={"flex items-center gap-4"}>
           { <stat.icon size={16} />}
            <p>{stat.name}</p>
          </span>
          <span className={"flex items-center gap-6"}>
            <p className="font-bold">{stat.value}</p>
            <p className={"flex items-center text-green-500"}>
              <ArrowUp size={12} />
              {stat.total}%{" "}
            </p>
          </span>
        </div>

            ))
        }
      </CardContent>
    </Card>
  );
}
