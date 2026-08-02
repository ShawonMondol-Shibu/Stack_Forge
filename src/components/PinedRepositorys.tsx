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

export default function PinedRepositorys() {
  return (
    <section>
      <CardTitle>Pinned Repositories</CardTitle>

      <ItemGroup className={"grid grid-cols-3"}>
        {
          Array.from({ length: 3 }).map((_, index) => (

        <Item key={index} variant={"outline"}>
          <ItemHeader>
            <ItemTitle>Stack Forge</ItemTitle>
            <ItemActions>
              <Badge variant={"outline"}>Public</Badge>
            </ItemActions>
          </ItemHeader>
          <ItemContent>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </ItemContent>
          <ItemFooter>
            <Badge>Typescript</Badge>
          </ItemFooter>
        </Item>
          ))
        }
      </ItemGroup>
    </section>
  );
}
