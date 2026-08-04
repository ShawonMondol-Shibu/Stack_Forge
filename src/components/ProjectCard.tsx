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
                src="https://randomimageurl.com/assets/images/local/20260103_0546_Comical%20Canine%20Antics_simple_compose_01ke21r3vdecq8wy9eq7gpz3f0_compressed_q80.jpeg"
                alt="NextJS"
                width={128}
                height={128}
                className="w-full aspect-square object-cover rounded-lg"
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
