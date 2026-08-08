import React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "./ui/item";
import { CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import MotionDiv from "./MotionDiv";

export default function PinedRepositorys() {
  return (
    <section>
      <CardTitle>Pinned Repositories</CardTitle>

      <ItemGroup className={"grid grid-cols-4"}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Link key={index} href={"#"}>
            <MotionDiv>
              <Item variant={"outline"}>
                <ItemHeader>
                  <ItemTitle className="line-clamp-1">
                    Stack Forge Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Esse eveniet porro sint aliquid tenetur
                    voluptatibus nobis sapiente quasi voluptate blanditiis,
                    deleniti veniam earum? Voluptatum nemo sapiente perferendis,
                    maiores eveniet dignissimos.
                  </ItemTitle>
                  <ItemActions>
                    <Badge variant={"outline"}>Public</Badge>
                  </ItemActions>
                </ItemHeader>
                <ItemContent>
                  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </ItemContent>
                <ItemFooter>
                  <Badge>Typescript</Badge>
                </ItemFooter>
              </Item>
            </MotionDiv>
          </Link>
        ))}
      </ItemGroup>
    </section>
  );
}
