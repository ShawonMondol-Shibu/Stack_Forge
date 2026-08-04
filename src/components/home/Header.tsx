import React from 'react'
import { HomeCarousel } from './HomeCarousel';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export default function Header() {
    const count = [
    { value: "12K+", label: "Developers" },
    { value: "5K", label: "Projects" },
    { value: "1K", label: "Github Repos" },
    { value: "120", label: "Countries" },
  ]
  return (
    <header>
        <div
          className={
            "w-full max-w-4xl mx-auto flex  items-center justify-center gap-10 py-10"
          }
        >
          <div className={"flex flex-col gap-4 items-start justify-start"}>
            <Badge variant="default" className={"bg-primary/20 text-gray-700 text-xs border-muted-secondary font-cursive"}> <div className={"w-1.5 h-1.5 bg-primary rounded-full"} /> Welcome to Stack Forge</Badge>
            <p className={"text-7xl uppercase font-semibold"}>Top <span className={"text-primary"}>Developers</span></p>
            <p className={"text-4xl"}>in Stack forge</p>
            <p>Portfolio. Projects. Community. Create a beautiful developer profile, showcase projects, connect with developers worldwide, and grow your career.</p>
            <div>
              <Button variant={"default"} className={"bg-primary"} size={"lg"}>Get Started</Button>
              <Button variant={"outline"} size={'lg'} className={" ml-4 border-primary"}>Explore Developers</Button>
            </div>

            <div className={"w-md flex gap-4 items-center justify-between mt-4 pt-12 border-t-2 border-primary/20"}>
              {
                count.map((item, index) => (

                  <div key={index} className={"flex flex-col items-center justify-center gap-1 "}>
                    <h3 className={"text-2xl font-bold"}>{item.value}</h3>
                    <p className={'text-sm'}>{item.label}</p>
                  </div>
                ))
              }
            </div>
          </div>
          <HomeCarousel />
        </div>
      </header>
  )
}
