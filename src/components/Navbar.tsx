import { LogsIcon, Search, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./ui/input-group";

const navLinks = [
  { name: "Home", url: "#" },
  { name: "Profiles", url: "#" },
  { name: "About", url: "#" },
  { name: "Contact", url: "#" },
];

export default function Navbar() {
  return (
    <nav
      className={
        "w-fit mx-auto sticky top-2 flex gap-6 items-center justify-between p-2 bg-white/80 shadow-lg rounded-full"
      }
    >
      <div className="w-12 h-12">
        <Image
          src={"/logo.svg"}
          alt={"logo_image"}
          width={64}
          height={64}
          className={"w-full h-full object-cover aspect-square rounded-full"}
        />
      </div>
      <div className={"flex gap-6 items-center uppercase"}>
        {navLinks.map((nav) => (
          <Link key={nav.name} href={nav.url} className="hover:text-primary hover:underline hover:underline-offset-2 transition-all duration-300">
            {nav.name}
          </Link>
        ))}
      </div>

<div>

      <InputGroup className="group transition-all duration-500 ease-in-out">
      <InputGroupInput className="w-0 group-hover:w-full "/>
      <InputGroupAddon align={"inline-end"}>
      {/* <InputGroupButton> */}
      <Search/>
      {/* </InputGroupButton>  */}
      </InputGroupAddon>
      </InputGroup>
</div>

      {false ? (
        <Button size={"lg"}>Login</Button>
      ) : (
        <Link href={""}>
        <Button variant={"outline"} size={"icon-lg"}>

        <User/>
        </Button>
        </Link>
      )}
    </nav>
  );
}
