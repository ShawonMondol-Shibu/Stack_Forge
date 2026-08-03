import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navLinks = [
  { name: "Developers", url: "/devs" },
  { name: "About", url: "#" },
  { name: "Contact", url: "/contact" },
];

export default function Navbar() {
  return (
    <nav
      className={
        "w-full max-w-4xl mx-auto sticky top-5 flex gap-6 items-center justify-between p-1 bg-white/80 backdrop-blur-sm border rounded-full z-30"
      }
    >
      <Link href={"/"} className={""}>
        <Image
          src={"/logo.svg"}
          alt={"logo_image"}
          width={60}
          height={40}
          className={"ml-2"}
        />
      </Link>
      <div className={"flex gap-4 items-center uppercase"}>
        {navLinks.map((nav) => (
          <Link
            key={nav.name}
            href={nav.url}
            className="hover:text-primary hover:underline hover:underline-offset-2 transition-all duration-300"
          >
            {nav.name}
          </Link>
        ))}
        <div>
          <InputGroup className="group  border-primary/50 outline-primary shadow-primary">
            <InputGroupInput className="w-0 group-hover:w-full transition-all duration-500 ease-in-out" />
            <InputGroupAddon align={"inline-end"}>
              <InputGroupButton>
                <Search />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      {false ? (
        <Button size={"lg"}>Login</Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className={"size-14"}>
              <AvatarImage
                src={
                  "https://images.unsplash.com/photo-1575454723382-16899c8ae4e1?ixid=M3w4MjcwNjd8MHwxfHNlYXJjaHwxMTd8fGthd2FpaSUyMGdpcmx8ZW58MHx8fHwxNzg1MjMzNTQ1fDA&ixlib=rb-4.1.0&fit=max&q=80"
                }
                alt=""
              />
              <AvatarFallback>profile</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="bottom" className="z-50">
            <DropdownMenuItem render={<Link href={"/dashboard"} />}>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/settings"} target="_blank">
                Settings
              </Link>
            </DropdownMenuItem> 
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
}
