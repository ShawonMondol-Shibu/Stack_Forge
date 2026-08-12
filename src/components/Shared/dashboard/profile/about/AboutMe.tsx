import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Clock, GraduationCap, Languages, Pencil, Timer } from "lucide-react";
import React from "react";

const aboutMeData = [
  { title: "Experience", value: "1+ Years", icon: Timer },
  { title: "Availability", value: "Open to work", icon: Clock },
  { title: "Education", value: "Diploma in CSE", icon: GraduationCap },
  { title: "Language", value: "Bangla/English", icon: Languages },
];

export default function AboutMe() {
  return (
    <Card size={"sm"} className={"w-full min-h-60 gap-0"}>
      <CardHeader>
        <CardTitle>About Me</CardTitle>
        <CardAction>
          <Button size={"icon-sm"}>
            <Pencil />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className={"space-y-4"}>
        <CardDescription className="line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iure
          quis nesciunt blanditiis commodi quam similique alias facere,
          voluptatem quaerat praesentium dignissimos autem corrupti facilis amet
          voluptates explicabo quibusdam voluptatum.
        </CardDescription>
        <ItemGroup className={"grid grid-cols-2"}>
          {aboutMeData.map((aboutMe, i) => (
            <Item key={i} variant={"outline"} size={"xs"} className={"w-full p-2"}>
              <ItemMedia>{<aboutMe.icon />}</ItemMedia>
              <ItemContent>
                <ItemDescription className={"text-xs"}>
                  {aboutMe.title}
                </ItemDescription>
                <ItemTitle className={"text-xs"}>{aboutMe.value}</ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
