import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PortfolioCard() {
  return (
    <Card className={"w-xs "}>
      <Image
        src={"/brain.jpg"}
        alt={"cover_photo"}
        width={300}
        height={200}
        loading="eager"
        className="w-full h-36 object-cover rounded-2xl"
      />
      <CardContent className="relative">
        <Avatar className={"w-20 h-20 absolute -top-16 mx-auto"}>
          <AvatarImage src={""} alt={"user_image"} />
          <AvatarFallback>user image</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <div className="mt-6">
            <CardTitle>Shawon Mondol Shibu</CardTitle>
            <p className="text-muted-foreground">Full Stack Developer </p>
            <address className="flex items-center text-muted-foreground"><MapPin size={14}/>Dhaka, Bangladesh</address>
        </div>
      </CardContent>
      <CardFooter>
        <CardAction>
          <Link href={`#`}>
            <Button variant={"outline"} className={" hover:scale-105"}>
              View Portfolio <SquareArrowOutUpRight />
            </Button>
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
