import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function Newsletter() {
  return (
    <div className="w-full mt-10 py-10">
      <Card className={"bg-primary/10 w-full py-10 shadow-none"}>
        <CardContent
          className={" flex flex-col gap-4 items-center justify-center"}
        >
          <h1 className={"text-4xl font-bold"}>
            Ready to Build Your Developer Brand?
          </h1>
          <p className={"text-gray-500 text-sm"}>Create your profile today</p>
          <Button size={"lg"} className={'py-6! px-10'}>Get Started</Button>
        </CardContent>
      </Card>
    </div>
  );
}
