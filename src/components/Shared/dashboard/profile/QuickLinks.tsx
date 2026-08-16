import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightSquare, BriefcaseBusiness, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function QuickLinks() {
  const linksData = [
    {label:"Portfolio Website", url: "shawonmondolshibu.vercel.app", icon: BriefcaseBusiness},
    {label:"GitHub", url: "github.com/shawonmondol-shibu", icon: FaGithub},
    {label:"Linkedin", url: "linkedin.com/shawonmondol-shibu", icon: FaLinkedin},
    {label:"Email", url: "shawonmondolshibu@gmail.com", icon: Mail},
  ]
  return (
    <Card className="gap-1 w-full">
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
       {
        linksData.map((link, i)=>(
        <div key={i} className={"flex items-center gap-6 justify-between border-b-2 py-2"}>
          <div className={"flex items-center gap-2"}>
           { <link.icon size={14} /> }<span>{link.label}</span>
          </div>
          <Button variant={"link"} size={"xs"} render={<Link href={`//${link.url}`} target="_blank"/>}>
            {link.url}<ArrowRightSquare size={12} />
          </Button>
        </div>

        ))
       }
      </CardContent>
    </Card>
  );
}
