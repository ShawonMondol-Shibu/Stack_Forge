import React from "react";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemFooter,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import MotionDiv from "../MotionDiv";
import { Badge } from "@/components/ui/badge";

export default function ProjectCard() {
  return (
    <MotionDiv>
      {" "}
      <Item
        variant={"outline"}
        className=" hover:shadow-lg transition-all duration-300 ease-in p-2"
      >
        <Image
          src="https://randomimageurl.com/assets/images/local/20260103_0546_Comical%20Canine%20Antics_simple_compose_01ke21r3vdecq8wy9eq7gpz3f0_compressed_q80.jpeg"
          alt="NextJS"
          width={128}
          height={100}
          className="w-full h-40 object-cover rounded-lg"
        />

        <ItemContent>
          <ItemTitle>NextJS</ItemTitle>
          <ItemDescription>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            doloremque fugiat obcaecati quasi laborum culpa quas possimus
            assumenda quidem porro! Id mollitia fugit quae porro magni est
            debitis minus nobis.{" "}
          </ItemDescription>

          <div>
            <Badge variant={"outline"}>
              Next.js
            </Badge>
          </div>
        </ItemContent>
        {/* <ItemSeparator /> */}
        <ItemFooter>
          {/* <ItemActions> */}

          <div className="grid grid-cols-2 gap-2 items-center justify-between">
            <Button variant={"outline"} size={"default"}>
              View Project
            </Button>
            <Button variant={"outline"} size={"default"} className={"text-primary border-primary"}>
              View Code
            </Button>
          </div>
          {/* </ItemActions> */}
        </ItemFooter>
      </Item>
    </MotionDiv>
  );
}
