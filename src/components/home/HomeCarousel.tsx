"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "../ui/badge";

export function HomeCarousel() {
  const autoplay = React.useMemo(
    () =>
      Autoplay({
        delay: 2000,
        stopOnInteraction: true,
      }),
    [],
  );

  return (
    <Carousel
      plugins={[autoplay]}
      className="w-full max-w-40 sm:max-w-xs"
      onMouseEnter={() => autoplay.stop()}
      onMouseLeave={() => autoplay.reset()}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="shadow-sm">
                <Image
                  src={`https://images.unsplash.com/photo-1575454723382-16899c8ae4e1?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxMTd8fGthd2FpaSUyMGdpcmx8ZW58MHx8fHwxNzg1MjMzNTQ1fDA&ixlib=rb-4.1.0&fit=max&q=80`}
                  alt={"Carousel Image"}
                  width={400}
                  height={400}
                  className="rounded-md"
                />

                <CardContent className="flex flex-col items-center justify-center gap-4">
                  <div className="space-y-1">
                    <Badge variant="secondary">Fullstack Developer</Badge>
                    <CardTitle className={"text-2xl"}>
                      Shawon Mondol Shibu {index + 1}
                    </CardTitle>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
