"use client";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Item, ItemContent } from "@/components/ui/item";
import { cn } from "@/lib/utils";
import { Pencil, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const userInfo = [
  { label: "Repositories", value: 24 },
  { label: "Projects", value: 12 },
  { label: "Followers", value: 803 },
  { label: "Following", value: 128 },
  { label: "Profile View", value: 1.5 },
  { label: "Achievements", value: 16 },
];

const subPages = [
  { name: "About", url: "/dashboard/profile/about" },
  { name: "Repository", url: "/dashboard/profile/#" },
  { name: "Projects", url: "/dashboard/profile/#" },
  { name: "Activity", url: "/dashboard/profile/#" },
  { name: "Achievements", url: "/dashboard/profile/#" },
  { name: "Notes", url: "/dashboard/profile/#" },
];

export default function ProfileHeader() {
  const pathName = usePathname();

  return (
    <Card size={"sm"} className={"w-full max-w-4xl min-h-80 pt-0"}>
      <div className={"relative"}>
        <Image
          src={"/brain.jpg"}
          alt={"profile_cover-image"}
          width={800}
          height={600}
          className={"w-full h-48 object-cover"}
        />
        <div className={"absolute -bottom-14 left-5"}>
          <Avatar className={"size-30"}>
            <AvatarImage />
            <AvatarFallback>Profile Picture</AvatarFallback>
            <AvatarBadge className="bottom-3 right-4" />
          </Avatar>
        </div>
      </div>
      <CardHeader className="ml-36">
        <CardTitle>Shawon Mondol Shibu</CardTitle>
        <CardAction>
          <ButtonGroup>
            <Button variant={"outline"} size={"sm"}>
              <Pencil /> Edit
            </Button>
            <Button size={"sm"}>
              <Share /> Share
            </Button>
          </ButtonGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="mt-1">
        <div className="ml-30">
          <h3>Full Stack Developer</h3>
          <div className="flex items-center gap-6">
            <address>Dhaka, Bangladesh</address>
            <Link href={"#"}>shawonmondolshibu.vercel.app</Link>
          </div>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eaque
            impedit voluptatem odio accusantium odit tempora perferendis. Sequi,
            dolor nemo! Dolores autem omnis laborum recusandae error delectus
            numquam rem optio.
          </CardDescription>
        </div>

        <Item
          size={"sm"}
          variant={"outline"}
          className="my-4 bg-background outline-primary"
        >
          <ItemContent className="grid grid-cols-6 items-center justify-center">
            {userInfo.map((info, i) => (
              <div
                key={i}
                className="w-full border-primary not-last:border-r-2 text-center"
              >
                <h3 className="text-base font-bold">{info.value}</h3>
                <p className="text-sm text-muted-foreground">{info.label}</p>
              </div>
            ))}
          </ItemContent>
        </Item>
      </CardContent>
      <CardFooter className="gap-6">
        {subPages.map((subPage, i) => (
          <Link
            key={i}
            href={subPage.url}
            className={cn(
              pathName == subPage.url && "border-b-2 text-primary",
              "border-primary hover:border-b-2 hover:text-primary",
            )}
          >
            {subPage.name}
          </Link>
        ))}
      </CardFooter>
    </Card>
  );
}
