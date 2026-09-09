// "use client"
import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "@animateicons/react/lucide";
import Link from "next/link";
import React from "react";

export default function NoteForm() {
  return (
    <form className="w-full">
        {/* Form Header */}
      <div className="flex flex-row items-center justify-between border-b p-4">
        <h1>New Note</h1>

        <div className="flex items-center gap-2">
            <Link href={"/dashboard/notes"}>
          <Button variant={"outline"} size={"sm"} >Close</Button>
            </Link>
          <Button size={"sm"} type="submit">
            Save Note <ChevronDown />
          </Button>
        </div>
      </div>

      {/* Form Inputs */}

      <div className="space-y-6 p-4">
        {/* * * Title Input */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <InputGroup>
            <InputGroupInput name="title" placeholder="Enter note title..." />
          </InputGroup>
        </div>
        {/* Tags Input */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (option)</Label>
          <InputGroup>
            <InputGroupInput name="tags" placeholder="Add tags..." />
          </InputGroup>
        </div>
        {/* Content Input */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (option)</Label>
          <InputGroup>
            <InputGroupInput name="tags" placeholder="Add tags..." />
          </InputGroup>
        </div>
      </div>
    </form>
  );
}
