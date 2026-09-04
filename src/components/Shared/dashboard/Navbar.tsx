"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  BriefcaseBusiness,
  CalendarRange,
  ClipboardList,
  FolderOpen,
  LayoutDashboard,
  MessagesSquare,
  Newspaper,
  NotebookPen,
  SlidersVertical,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ModeToggle } from "@/components/ToggleTheme";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useProfileStore } from "@/store/ProfileStore";

const navLinks = [
  { url: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { url: "/dashboard/profile", label: "Profile", icon: User },
  {
    url: "/dashboard/portfolio",
    label: "Portfolio",
    icon: BriefcaseBusiness,
  },
  { url: "/dashboard/projects", label: "Projects", icon: FolderOpen },
  { url: "/dashboard/github", label: "GitHub", icon: FaGithub },
  { url: "/dashboard/tasks", label: "Tasks", icon: ClipboardList },
  { url: "/dashboard/notes", label: "Notes", icon: NotebookPen },
  { url: "/dashboard/calender", label: "Calender", icon: CalendarRange },
  { url: "#", label: "Social Feed", icon: Newspaper },
  { url: "/dashboard/messages", label: "Messages", icon: MessagesSquare },
  { url: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { url: "/dashboard/settings", label: "Settings", icon: SlidersVertical },
];

export function NavbarLeft() {
  const pathName = usePathname();
  return (
      <div className={"z-50 fixed top-8 left-6 w-fit"}>
        <DropdownMenu>
          <DropdownMenuTrigger className={""}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={
                "p-2 border-2 rounded-full bg-background/20 backdrop-blur-xs shadow-xl"
              }
            >
              <Image src={'/logo.svg'} alt={'logo_image'} width={40} height={20} className="aspect-square drop-shadow-primary/50 drop-shadow-md"/>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={"bg-background/80 backdrop-blur-xs"}>
            {navLinks.map((nav, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <DropdownMenuItem
                  className={cn(
                    pathName == nav.url &&
                      "bg-primary text-accent shadow-primary/50 shadow-lg",
                    "group hover:bg-primary! hover:text-accent!",
                  )}
                  render={<Link href={nav.url} />}
                >
                  {nav.icon && (
                    <nav.icon
                      size={50}
                      className={cn(
                        pathName == nav.url && "text-white!",
                        "text-primary drop-shadow-primary/50 drop-shadow-lg group-hover:text-accent",
                      )}
                    />
                  )}
                  {nav.label}
                </DropdownMenuItem>
              </motion.div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  );
}



export function NavbarRight() {
  const router = useRouter();
  const {profile} = useProfileStore()
  return (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="z-50 flex items-center gap-2 fixed top-8 right-5 w-fit"
      >
        <ModeToggle/>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={"p-1 border-2 rounded-full shadow-xl"}
            >
              <Avatar size={"lg"}>
                <AvatarImage
                  src={ profile?.avatarUrl ||
                    "https://randomimageurl.com/assets/images/local/20260103_0546_Comical%20Canine%20Antics_simple_compose_01ke21r3vdecq8wy9eq7gpz3f0_compressed_q80.jpeg"
                  }
                  alt={profile?.fullName || "user_image"}
                />
                <AvatarFallback>{profile?.fullName}</AvatarFallback>
              </Avatar>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <DropdownMenuItem>{profile?.fullName}</DropdownMenuItem>
            </motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <DropdownMenuItem variant="destructive" onClick={()=>{
                authClient.signOut()
                router.push('/login')
              }}>Logout</DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
  )
}