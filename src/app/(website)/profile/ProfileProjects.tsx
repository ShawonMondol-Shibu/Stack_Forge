import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { ButtonGroup } from "@/components/ui/button-group";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

export default function ProfileProjects() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Projects:</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup className="grid grid-cols-4 gap-4 items-center justify-start ">
          {Array.from({ length: 10 }).map((_, i) => (
            <Item
              key={i}
              variant={"outline"}
              className="hover:shadow-lg transition-all duration-300 ease-in"
            >
              {/* <ItemHeader className={"bg-secondary"}> */}
              <Image
                src="next.svg"
                alt="NextJS"
                width={128}
                height={128}
                className="w-full aspect-square rounded-lg"
              />
              {/* </ItemHeader> */}
              <ItemContent>
                <ItemTitle>NextJS</ItemTitle>
                <ItemDescription>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  doloremque fugiat obcaecati quasi laborum culpa quas possimus
                  assumenda quidem porro! Id mollitia fugit quae porro magni est
                  debitis minus nobis.{" "}
                </ItemDescription>
              </ItemContent>
              <ItemFooter>
                {/* <ItemActions> */}

                <ButtonGroup>
                  <Button variant={"outline"} size={"xs"}>
                    View Project
                  </Button>
                  <Button variant={"outline"} size={"xs"}>
                    View Code
                  </Button>
                </ButtonGroup>
                {/* </ItemActions> */}
              </ItemFooter>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
