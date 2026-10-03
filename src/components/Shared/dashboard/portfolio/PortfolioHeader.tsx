"use client";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProfileStore } from "@/store/ProfileStore";
import { Github } from "@animateicons/react/huge";
import {
  ArrowUp,
  Calendar,
  Code,
  Eye,
  FolderClosed,
  Globe,
  Linkedin,
  MapPin,
  Twitter,
  Users,
} from "@animateicons/react/lucide";
import Link from "next/link";
import React from "react";
import PortfolioCodeBlock from "./PortfolioCodeBlock";
import useSkillsStore from "@/store/useSkillsStore";
import { useTechStackStore } from "@/store/TechStackStore";

export default function PortfolioHeader() {
  const { profile } = useProfileStore();
  const { techStacks } = useTechStackStore();
  const { skills } = useSkillsStore();
  const mySkills = techStacks.filter((stack:{id:string, image:string, name:string}) => skills?.techStack?.includes(stack.id));
  const socialLinks: { url: string; icon: React.FC<{size?: number}> }[] = [
    { url: "//github.com", icon: Github },
    { url: "//linkedin.com", icon: Linkedin  },
    { url: "//x.com", icon: Twitter  },
    { url: "//google.com", icon: Globe },
  ];
  const portfolioStatus = [
    { title: "projects", value: 24, avarage: 20, icon: FolderClosed },
    { title: "repositories", value: 24, avarage: 20, icon: Code },
    { title: "profile views", value: 24, avarage: 20, icon: Eye },
    { title: "followers", value: 24, avarage: 20, icon: Users },
  ];
  return (
    <header className=" ">
      <Card className={"p-0 gap-y-0"}>
      <CardContent className="grid grid-cols-1 lg:grid-cols-8 items-start justify-center gap-6 p-8 bg-linear-to-r from-transparent via-primary/50  rounded-3xl">
        <div className="col-span-2 flex flex-col w-full items-center gap-6">
          <Avatar className={"w-46 h-46"}>
            <AvatarImage src={profile?.avatarUrl || ""} alt={""} />
            <AvatarFallback>User Image</AvatarFallback>
            <AvatarBadge className={"bottom-4 right-5"} />
          </Avatar>
          <div className="flex items-center justify-center gap-2">
            {socialLinks.map((social, i) => (
              social.url && <Link key={i} href={social.url}>
                <Button variant={"outline"} size={"icon-lg"}>
                  {" "}
                  <social.icon size={20} />
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-3 space-y-2 relative">
          <h1 className="text-4xl font-bold">Hi, I&apos;m {profile?.fullName || "full name"} 👋</h1>
          <h3 className="text-2xl font-medium text-muted-foreground">{profile?.headline || "Role"}</h3>
          <p className="text-base text-muted-foreground min-h-28">
           {profile?.bio || "There's no bio available."}
          </p>
          <div className="flex items-center justify-start gap-2 text-xs bottom-0">
            <address className="flex items-center gap-2">
              <MapPin size={16} /> <span>{profile?.location || "Location not specified"}</span>
            </address>
            <Separator orientation="vertical" className={"border-primary "} />
            <Link href={profile?.website || ""} target="_blank" rel="noopener noreferrer">
              {profile?.website || "No website available."}
            </Link>
            <Separator orientation="vertical" className={"border-primary "} />
            <span>
              <Calendar size={16}/> {profile?.availability === "busy" ? "Busy right now" : profile?.availability === "open" ? "Available for work" : "Unavailable for work"}
            </span>
          </div>
        </div>


        <PortfolioCodeBlock className="col-span-3" profile={profile || undefined} skills={mySkills} />
      </CardContent>
      <div className="w-full bg-transparent mx-auto rounded-3xl p-2 border-0 shadow-none">
        <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-start gap-4 ">
          {portfolioStatus.map((status) => (
            <div key={status.title} className="flex items-center gap-4 p-2 border rounded-2xl bg-primary/5 border-primary/20">
              <span className="p-4 bg-primary/20 text-primary rounded-2xl">
                <status.icon size={28} />
              </span>
              <div className="flex flex-col">
                <span className="text-xl font-bold">{status.value}</span>
                <span className="inline-block capitalize text-xs">
                  {status.title}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-green-500">
                  <ArrowUp size={14} /> {status.avarage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      

      

      </Card>

    </header>
  );
}
