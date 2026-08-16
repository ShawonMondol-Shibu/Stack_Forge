import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { GitHubCalendar } from "react-github-calendar";

export default function ContributionActivity() {
  return (
    <Card className={"gap-1"}>
      <CardHeader>
        <CardTitle>Contribution Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <GitHubCalendar username={"shawonmondol-shibu"} blockSize={8} colorScheme="light"/>
      </CardContent>
      <CardFooter className="justify-center">
        <CardAction>
            <Button variant={"link"} size={"xs"} render={<Link href={"#"}/>}>
                More Activity our GitHub <ArrowRight/>
            </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
