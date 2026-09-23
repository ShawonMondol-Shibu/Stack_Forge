import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, RocketIcon } from "@animateicons/react/lucide";

export default function Newsletter() {
  return (
    <div className="w-full mt-20 ">
      <Card className={"bg-primary/5 w-full px-4 py-6 shadow-none"}>
        <CardContent className={" flex gap-4 items-center justify-between"}>
          <div className="flex items-center gap-6">
            <span className="p-4 border rounded-2xl text-primary ">
              <RocketIcon size={50} />
            </span>
            <span>
              <h1 className={"text-4xl font-bold"}>
                Ready to Build Your Developer Brand?
              </h1>
              <p className={"text-sm"}>
                Create your profile, showcase your work, and connect with
                opportunities that matter.
              </p>
            </span>
          </div>
          <Button size={"lg"} className={"py-6! px-10"}>
            Get Started <ArrowRight />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
