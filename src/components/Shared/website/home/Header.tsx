"use client";
import React from "react";
import { HomeCarousel } from "./HomeCarousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Code, Folder, Globe, Users } from "@animateicons/react/lucide";
import Link from "next/link";

export default function Header() {
  const count = [
    { value: "12K+", label: "Developers", icon: Users },
    { value: "5K", label: "Projects",icon: Folder },
    { value: "1K", label: "Github Repos", icon: Code },
    { value: "120", label: "Countries", icon: Globe },
  ];
  return (
    <header>
      <div
        className={
          "flex items-center justify-center gap-10 py-10"
        }
      >
        <div className={"flex flex-col gap-4 items-start justify-start"}>
          <Badge
            variant="default"
            className={
              "bg-primary/5 text-muted-foreground text-xs border-primary/20 shadow-md shadow-primary/10 font-cursive font-bold p-3"
            }
          >
            🔥
             Welcome to
            StackForge
          </Badge>
          <p className={"text-7xl uppercase font-semibold"}>
            Top <span className={"text-primary"}>Developers</span>
          </p>
          <p className={"text-3xl"}>in Stack forge</p>
          <p>
            Portfolio. Projects. Community. Create a beautiful developer
            profile, showcase projects, connect with developers worldwide, and
            grow your career.
          </p>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Link href={'/dashboard'}>
            <Button variant={"default"} className={"bg-primary"} size={"lg"}>
              Get Started <ArrowRight/>
            </Button>
            </Link>
            <Button
              variant={"outline"}
              size={"lg"}
              className={" ml-4 border-primary text-primary"}
            >
              Explore Developers
            </Button>
          </motion.div>

          <div
            className={
              "w-full flex gap-4 items-center justify-between mt-4 pt-12 border-t-2 border-primary/20"
            }
          >
            {count.map((item, index) => (
              <div
                key={index}
               className="flex items-center justify-center gap-2"
              >
                <div className="p-4 bg-primary/10 rounded-xl flex items-center">

                <item.icon className="text-primary size-5 fill-primary"/>
                </div>
                <span className={"flex flex-col items-center justify-center gap-1 "}>
                <h3 className={"text-xl font-bold"}>{item.value}</h3>
                <p className={"text-xs"}>{item.label}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full border-x">
        <HomeCarousel />
        </div>
      </div>
    </header>
  );
}
