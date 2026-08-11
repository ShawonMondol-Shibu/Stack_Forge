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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, Share } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function ProfileHeader() {
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
        <div className={"absolute -bottom-16 left-5"}>
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
      <CardContent>
        
      </CardContent>
    </Card>
  );
}
