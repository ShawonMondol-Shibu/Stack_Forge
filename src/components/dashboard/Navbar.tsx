"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Navbar() {
  const navLinks = [
    { url: "#", label: "Dashboard" },
    { url: "#", label: "Profile" },
    { url: "#", label: "Portfolio" },
    { url: "#", label: "Projects" },
    { url: "#", label: "GitHub" },
    { url: "#", label: "Tasks" },
    { url: "#", label: "Notes" },
    { url: "#", label: "Calender" },
    { url: "#", label: "Social Feed" },
    { url: "#", label: "Messages" },
    { url: "#", label: "Notifications" },
    { url: "#", label: "Settings" },
  ];
  return (
    <nav className={"p-1 flex items-center justify-between sticky top-5 px-6"}>
      <motion.div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={"p-4 border-2 rounded-full shadow-xl"}
            >
              <Menu className="text-primary" />
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navLinks.map((nav, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <DropdownMenuItem
                  className={"hover:bg-primary! hover:text-white!"}
                  render={<Link href={nav.url} />}
                >
                  {nav.label}
                </DropdownMenuItem>
              </motion.div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={"p-1 border-2 rounded-full shadow-xl"}
            >
              <Avatar size={"lg"}>
                <AvatarImage
                  src={
                    "https://randomimageurl.com/assets/images/local/20260103_0546_Comical%20Canine%20Antics_simple_compose_01ke21r3vdecq8wy9eq7gpz3f0_compressed_q80.jpeg"
                  }
                  alt={"user_image"}
                />
                <AvatarFallback>user image</AvatarFallback>
              </Avatar>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <DropdownMenuItem>Shawon Mondol Shibu</DropdownMenuItem>
            </motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <DropdownMenuItem variant="destructive">Logout</DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </nav>
  );
}
