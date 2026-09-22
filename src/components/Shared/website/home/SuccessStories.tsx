/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "@animateicons/react/lucide";

export default function SuccessStories() {
  return (
    <section className=" mt-20 space-y-10">
      <h1 className={"text-3xl font-bold border-l-4 border-primary px-4"}>Success Stories</h1>

      <div className={"grid grid-cols-3 items-center justify-center gap-6"}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="shadow-black/5 shadow-2xl">
            <CardContent>
              <Quote className=" rotate-180 text-primary"/>
              <article>
                "Stack Forge helped me connect with an amazing startup looking
                for Rust engineers. My portfolio here did all the talking."
              </article>
            </CardContent>
            <CardFooter className="gap-4">
              <Avatar size={"lg"}>
                <AvatarImage
                  src={
                    "https://randomimageurl.com/assets/images/local/20260103_0522_Pristine%20Image%20Quality_simple_compose_01ke20ajtseghamyvp4pxxzqw1_compressed_q80.jpeg"
                  }
                  alt={"user_image"}
                />
                <AvatarFallback>user</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Shawon Mondol Shibu</CardTitle>
                <p className={"text-muted-foreground"}>FullStack Developer</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
