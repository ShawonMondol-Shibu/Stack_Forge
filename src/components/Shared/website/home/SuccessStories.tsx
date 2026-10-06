/* eslint-disable react/no-unescaped-entities */

import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "@animateicons/react/lucide";

const successStories = [
  {
    quote:
      "Stack Forge helped me connect with an amazing startup looking for Rust engineers. My portfolio here did all the talking.",
    name: "Shawon Mondol Shibu",
    role: "FullStack Developer",
    image:
      "https://randomimageurl.com/assets/images/local/20260103_0522_Pristine%20Image%20Quality_simple_compose_01ke20ajtseghamyvp4pxxzqw1_compressed_q80.jpeg",
  },
  {
    quote:
      "Stack Forge gave me a professional place to showcase my work and helped recruiters understand what I can actually build.",
    name: "Alex Morgan",
    role: "Software Engineer",
    image: "",
  },
  {
    quote:
      "Instead of sending a traditional portfolio, I shared my Stack Forge profile. It made my projects and experience much easier to explore.",
    name: "Sarah Williams",
    role: "Frontend Developer",
    image: "",
  },
  {
    quote:
      "The developer profile made it much easier for me to present my GitHub projects, skills, and experience in one place.",
    name: "Daniel Carter",
    role: "Backend Engineer",
    image: "",
  },
];

export default function SuccessStories() {
  const [autoplay] = React.useState(() =>
    Autoplay({
      delay: 2000,
      stopOnInteraction: true,
    }),
  );

  return (
    <section className="w-full mt-20 space-y-10">
      <h1 className="border-l-4 border-primary px-4 text-3xl font-bold">
        Success Stories
      </h1>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[autoplay]}

          className="w-full mx-auto"
        >
          <CarouselContent className=" mx-auto">
            {successStories.map((story, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 py-4"
              >
                <Card className="w-full mx-auto h-full border-border/60 ">
                  <CardContent className="flex flex-col">
                    <Quote className="mb-4 rotate-180 text-primary" />

                    <article className="text-sm leading-5 text-muted-foreground">
                      "{story.quote}"
                    </article>
                  </CardContent>

                  <CardFooter className="gap-4">
                    <Avatar size="lg">
                      <AvatarImage src={story.image} alt={story.name} />
                      <AvatarFallback>
                        {story.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <CardTitle className="text-base">{story.name}</CardTitle>

                      <p className="text-sm text-muted-foreground">
                        {story.role}
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className={"absolute left-0"}/>
          <CarouselNext className={"absolute right-0"}/>
        </Carousel>
      </div>
    </section>
  );
}
