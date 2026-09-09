"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { ChevronDown, X } from "@animateicons/react/lucide";
import { Cross } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export default function NoteForm() {
  const [tags, setTags] = useState<string[]>([]);
  const tagsRef = useRef<HTMLInputElement | null>(null);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const tagsValue = tagsRef.current?.value.trim();
    if (e.key !== "Enter") return;
    if (e.key === "Enter") {
      e.preventDefault();
      if (!tagsValue) return;
      setTags((prev) => [...prev, tagsValue]);
      if (tagsRef.current) {
        tagsRef.current.value = "";
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    const removedTags = tags.filter((t)=> t!==tag)
    setTags(removedTags);
  };

  return (
    <form className="w-full">
      {/* Form Header */}
      <div className="flex flex-row items-center justify-between border-b p-4">
        <h1>New Note</h1>

        <div className="flex items-center gap-2">
          <Link href={"/dashboard/notes"}>
            <Button variant={"outline"} size={"sm"}>
              Close
            </Button>
          </Link>
          <Button size={"sm"} type="button">
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
            <InputGroupInput
              ref={tagsRef}
              name="tags"
              placeholder="Add tags..."
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
          <div className="flex items-center gap-2">
            <small className="text-muted-foreground">

            # Tags: 
            </small>
            {tags.map((tag: string, i: number) => (
              <Badge key={i} variant={"outline"} className="p-1.5 text-accent-foreground ">

                {tag}{" "}
                <X
                  size={10}
                  className="hover:cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                />
              </Badge>
            ))}
          </div>
        </div>
        {/* Content Input */}
        <div className="space-y-2">
          <Label htmlFor="tags">Content</Label>
          <InputGroup>
            <InputGroupInput name="tags" placeholder="Add tags..." />
          </InputGroup>
        </div>
      </div>
    </form>
  );
}
