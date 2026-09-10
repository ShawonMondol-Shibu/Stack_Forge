"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { ChevronDown, LoaderIcon, X } from "@animateicons/react/lucide";
import JoditEditor from "jodit-react";
import Link from "next/link";
import { useRef, useState } from "react";
import JoditConfig from "./JoditConfig";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteMutation } from "@/hooks/mutations/use-note-mutation";
import { noteQuery } from "@/hooks/queries/use-note";
import { objToArr } from "@/lib/ObjToArr";

const noteSchema = z.object({
  title: z.string().min(2, { message: "Please enter note title" }),
  tag: z.array(z.string()).optional(),
  content: z.string().optional(),
});

export default function NoteForm({ id }: { id?: string }) {
  const { data: note } = noteQuery.GetOne(id);
  const [tags, setTags] = useState<string[]>(() =>
    note?.tag ? objToArr(note.tag) : [],
  );
  const editor = useRef(null);
 const [content, setContent] = useState<string>(() =>
  String(note?.content ?? ""),
);
  const tagsRef = useRef<HTMLInputElement | null>(null);
  const { mutate: create, isPending: createLoading } =
    noteMutation.CreateNote();
  const { mutate: update, isPending: updateLoading } =
    noteMutation.UpdateNote();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      tag: [],
      content: "",
    },
  });

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
    const removedTags = tags.filter((t) => t !== tag);
    setTags(removedTags);
  };

  const onSubmit = (data: z.infer<typeof noteSchema>) => {
    const finalData = { ...data, tag: tags, content };

    if (id) {
      update({ id, data: finalData });
      return;
    }
    create(finalData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Form Header */}
      <div className="flex flex-row items-center justify-between border-b p-4">
        <h1>{id ? "Update Note" : "New Note"}</h1>

        <div className="flex items-center gap-2">
          <Link href={!id?"/dashboard/notes": `/dashboard/notes/${id}`}>
            <Button variant={"outline"} size={"sm"}>
              Close
            </Button>
          </Link>
          {id ? (
            <Button size={"sm"} type="submit">
              {updateLoading ? (
                <LoaderIcon />
              ) : (
                <>
                  Update Note <ChevronDown />
                </>
              )}
            </Button>
          ) : (
            <Button size={"sm"} type="submit">
              {createLoading ? (
                <LoaderIcon />
              ) : (
                <>
                  Save Note <ChevronDown />
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Form Inputs */}

      <div className="space-y-6 p-4">
        {/* * * Title Input */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <InputGroup>
            <InputGroupInput
              {...register("title")}
              name="title"
              value={note?.title}
              placeholder="Enter note title..."
            />
          </InputGroup>
          {errors.title?.message && (
            <p className="text-red-500">{errors.title?.message}</p>
          )}
        </div>
        {/* Tags Input */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (option)</Label>
          <InputGroup>
            <InputGroupInput
              ref={tagsRef}
              name="tags"
              placeholder="Add tag name & enter"
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
          <div className="flex items-center gap-2">
            <small className="text-muted-foreground"># Tags:</small>
            {tags.map((tag: string, i: number) => (
              <Badge
                key={i}
                variant={"outline"}
                className="p-1.5 text-accent-foreground "
              >
                {tag}{" "}
                <X
                  size={10}
                  className="hover:cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                />
              </Badge>
            ))}
          </div>
          {errors.tag?.message && (
            <p className="text-red-500">{errors.title?.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Content:</Label>
          <JoditEditor
            ref={editor}
            value={content}
            config={JoditConfig()}
            onBlur={(newContent) => setContent(String(newContent))}
            name="content"
          />
        </div>
      </div>
    </form>
  );
}
