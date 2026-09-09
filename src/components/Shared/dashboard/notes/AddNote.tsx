"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { ChevronDown, Plus } from "@animateicons/react/lucide";
import React from "react";
import NoteForm from "./NoteForm";
interface pageType {
  variant?:
    | "default"
    | "ghost"
    | "destructive"
    | "link"
    | "outline"
    | "secondary";
  size?: "default" | "lg" | "sm" | "xs";
}

export default function AddNote({
  variant = "default",
  size = "default",
}: pageType) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant={variant} size={size} />}>
        <Plus /> New Note
      </DialogTrigger>

      <DialogContent showCloseButton={false} className={"w-full"}>
        <NoteForm/>
      </DialogContent>
    </Dialog>
  );
}
