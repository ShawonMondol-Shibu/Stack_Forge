"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import MotionDiv from "../MotionDiv";
import { ModeToggle } from "@/components/ToggleTheme";
import { profileQuery } from "@/hooks/queries/use-profile";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLogout } from "../Logout";
import UseSession from "../UseSession";
import { memo } from "react";

const navLinks = [
  { name: "Home", url: "/" },
  { name: "Developers", url: "/devs" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
];

const dropdownLinks = [
  { name: "Profile", url: "/dashboard/profile" },
  { name: "Dashboard", url: "/dashboard" },
  { name: "Settings", url: "/settings" },
];

function Navbar() {
  const { data: session } = UseSession();
  const { data: profile } = profileQuery.GetMyProfile(Boolean(session?.session));
  const handleLogout = useLogout();
  const pathName = usePathname();

  return (
    <nav
      className={
        "fixed w-full max-w-7xl top-5 left-[50%] translate-x-[-50%] flex gap-4 md:gap-6 items-center justify-between p-1 bg-background/80 backdrop-blur-sm rounded-full z-30 px-2 md:px-4"
      }
    >
      <div className="flex items-center gap-2">
        <Link href={"/"}>
          <Image
            src={"/logo.svg"}
            alt={"logo_image"}
            width={60}
            height={40}
            priority
            className={"ml-1 md:ml-2 drop-shadow-primary/50 drop-shadow-lg"}
          />
        </Link>
      </div>

      <MotionDiv className={"hidden md:flex gap-4 items-center uppercase"}>
        {navLinks.map((nav) => (
          <Link
            key={nav.name}
            href={nav.url}
            className={cn(
              pathName === nav.url && "text-primary",
              "hover:text-primary hover:underline hover:underline-offset-2 transition-all duration-300",
            )}
          >
            {nav.name}
          </Link>
        ))}
        <div>
          <InputGroup className="group  border-primary/50 outline-primary shadow-primary">
            <InputGroupInput className="w-0 group-hover:w-40 focus:w-40 transition-[width] duration-500 ease-in-out" />
            <InputGroupAddon align={"inline-end"}>
              <InputGroupButton>
                <Search />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </MotionDiv>

      <div className="flex items-center gap-2">
        <ModeToggle />
        {!session?.session ? (
          <Link href={"/login"}>
            <Button size={"lg"}>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<button className="rounded-full focus:outline-none" />}
            >
              <Avatar size={"lg"} className={""}>
                <AvatarImage
                  src={profile?.avatarUrl || "/default-avatar.png"}
                  alt={profile?.fullName || "User"}
                />
                <AvatarFallback>profile</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="z-50">
              <div className="md:hidden flex flex-col">
                {navLinks.map((nav) => (
                  <DropdownMenuItem
                    key={nav.name}
                    className={"cursor-pointer"}
                    render={<Link href={nav.url} />}
                  >
                    {nav.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="md:hidden" />
              </div>
              {dropdownLinks.map((link) => (
                <DropdownMenuItem
                  key={link.name}
                  className={"cursor-pointer"}
                  render={<Link href={link.url} />}
                >
                  {link.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                className={"cursor-pointer"}
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}

export default memo(Navbar);