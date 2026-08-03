import React from 'react'
import { Item, ItemContent, ItemTitle, ItemDescription, ItemSeparator, ItemFooter } from './ui/item';
import { ButtonGroup } from './ui/button-group';
import { Button } from './ui/button';
import Image from 'next/image';

export default function ProjectCard() {
  return (
    <> <Item
              variant={"outline"}
              className="bg-white hover:shadow-lg transition-all duration-300 ease-in"
            >
              {/* <ItemHeader className={"bg-secondary"}> */}
              <Image
                src="/next.svg"
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
              <ItemSeparator />
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
            </Item></>
  )
}
