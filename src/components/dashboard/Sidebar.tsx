"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Bell,
  BriefcaseBusiness,
  CalendarRange,
  ClipboardList,
  FolderOpen,
  LayoutDashboard,
  Menu,
  MessagesSquare,
  Newspaper,
  NotebookPen,
  SlidersVertical,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GitHubIcon } from "../ui/icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks = [
  { url: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { url: "/dashboard/profile", label: "Profile", icon: User },
  {
    url: "/dashboard/portfolio",
    label: "Portfolio",
    icon: BriefcaseBusiness,
  },
  { url: "/dashboard/projects", label: "Projects", icon: FolderOpen },
  { url: "/dashboard/github", label: "GitHub", icon: GitHubIcon },
  { url: "/dashboard/tasks", label: "Tasks", icon: ClipboardList },
  { url: "/dashboard/notes", label: "Notes", icon: NotebookPen },
  { url: "/dashboard/calender", label: "Calender", icon: CalendarRange },
  { url: "#", label: "Social Feed", icon: Newspaper },
  { url: "/dashboard/messages", label: "Messages", icon: MessagesSquare },
  { url: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { url: "/dashboard/settings", label: "Settings", icon: SlidersVertical },
];

export default function Sidebar() {
  const pathName = usePathname();
  return (
    <aside
      className={"p-1 flex items-center justify-between sticky top-5 px-6 bg-transparent z-50"}
    >
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className={""}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={"p-4 border-2 rounded-full bg-background/20 backdrop-blur-xs shadow-xl"}
            >
              <Menu className="text-primary" />
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={"bg-background/80 backdrop-blur-xs"}>
            {navLinks.map((nav, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <DropdownMenuItem
                  className={cn(pathName==nav.url&& "bg-primary text-accent" ,"hover:bg-primary! hover:text-accent!")}
                  render={<Link href={nav.url} />}
                >
                  {nav.icon && (
                    <nav.icon size={50} className="hover:text-accent" />
                  )}
                  {nav.label}
                </DropdownMenuItem>
              </motion.div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="z-50">
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
    </aside>
  );
}
