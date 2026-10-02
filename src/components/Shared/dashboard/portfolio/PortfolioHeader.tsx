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
  Code,
  Eye,
  FolderClosed,
  Globe,
  Linkedin,
  MapPin,
  Twitter,
  Users,
} from "@animateicons/react/lucide";
import { LucideIcon, LucideProps } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PortfolioHeader() {
  const { profile } = useProfileStore();
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
      <CardContent className="grid grid-cols-1 lg:grid-cols-6 items-start justify-center gap-6 p-8 bg-linear-to-r from-transparent via-primary/50  rounded-3xl">
        <div className="col-span-1 lg:col-span-2 flex flex-col w-full items-center gap-6">
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

        <div className="col-span-1 lg:col-span-3 space-y-2 relative min-h-60">
          <h1 className="text-5xl font-bold">Hi, I&apos;m Shibu Mondol 👋</h1>
          <h3 className="text-2xl font-medium text-muted-foreground">Full Stack Developer</h3>
          <p className="text-base text-muted-foreground ">
            I build modern, scalable web applications with Next.js, NestJS and
            PostgreSQL. Passionate about clean code, great UI, and solving real
            world problems.
          </p>
          <div className="flex items-center justify-start gap-4 absolute bottom-0">
            <address className="flex items-center gap-2">
              <MapPin size={16} /> <span>Dhaka, Bangladesh</span>
            </address>
            <Separator orientation="vertical" className={"border-primary "} />
            <Link href={""}>shibumondol.dev</Link>
          </div>
        </div>
      </CardContent>
      <Card className="w-full bg-background mx-auto border-0 shadow-none">
        <CardContent className="grid grid-cols-2 lg:grid-cols-4 items-center justify-start gap-4 space-x-20">
          {portfolioStatus.map((status) => (
            <div key={status.title} className="flex items-center gap-4">
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
        </CardContent>
      </Card>

      </Card>

    </header>
  );
}
