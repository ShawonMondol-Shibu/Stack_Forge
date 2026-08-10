import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardAction,
  CardTitle,
} from "../ui/card";
import React from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "../ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Messages() {
  return (
    <Card size={"sm"} className={"w-xs gap-1"}>
      <CardHeader>
        <CardTitle className="text-xl">Messages</CardTitle>
        <CardAction>
          <Button
            variant={"link"}
            size={"xs"}
            render={<Link href={"/dashboard/projects"} />}
          >
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {Array.from({ length: 3 }).map((_, i) => (
            <Item key={i} variant={"default"} size={"xs"} className=" p-0 ">
              <ItemContent className="">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 rounded-xl bg-background shadow-black/5 shadow-lg w-fit py-0.5 px-2">
                    <Avatar size={"sm"}>
                      <AvatarImage
                        src={
                          "https://randomimageurl.com/assets/images/local/20260103_0546_Comical%20Canine%20Antics_simple_compose_01ke21r3vdecq8wy9eq7gpz3f0_compressed_q80.jpeg"
                        }
                      />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div>
                      <ItemTitle className="text-xs">
                        Shawon Mondol Shibu
                      </ItemTitle>
                      <ItemDescription className="text-xs">
                        A Professional Full Stack Engineer.
                      </ItemDescription>
                    </div>
                  </div>

                  <div className="flex flex-col w-fit  items-end gap-1">
                    <p className="font-semibold text-[9px]">5m ago</p>
                    <div className="w-3 h-3  bg-primary rounded-full flex items-center justify-center text-white text-[9px]">
                      10
                    </div>
                  </div>
                </div>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
