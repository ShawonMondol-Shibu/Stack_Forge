"use client";
import MotionDiv from "@/components/Shared/MotionDiv";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { noteMutation } from "@/hooks/mutations/use-note-mutation";
import { noteQuery } from "@/hooks/queries/use-note";
import { objToArr } from "@/lib/ObjToArr";
import { Pencil } from "@animateicons/react/lucide";
import { useRouter } from "next/navigation";
import React from "react";

export default function NoteDetails({ id }: { id: string }) {
  const { data: note } = noteQuery.GetOne(id);
  const { mutate } = noteMutation.DeleteNote();
  const router = useRouter();
 

const noteTags = objToArr(note?.tag);
  return (
    <Card className={"rounded-l-none w-full h-full shadow-none border-0"}>
      <MotionDiv className="space-y-4">
        <CardHeader>
          <div className="flex items-center gap-x-4">
            <CardTitle>{note?.title} </CardTitle>
            <Button
              variant={"ghost"}
              size={"icon-sm"}
              className={"text-muted-foreground"}
              onClick={()=>{router.push(`/dashboard/notes/update_note/${note?.id}`)}}
            >
              <Pencil />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              {noteTags &&
                noteTags?.map((tag: string) => (
                  <Badge key={tag} className="p-1.5">
                    {tag}
                  </Badge>
                ))}
            </div>
            <Badge variant={"outline"} className="p-1.5">
              {" "}
              Add tags...
            </Badge>
          </div>
          <CardAction>
            <Button
              onClick={() => {
                mutate(id);
              }}
            >
              Delete
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          {note?.content && (
            <output dangerouslySetInnerHTML={{ __html: note?.content }} />
          )}
        </CardContent>
      </MotionDiv>
    </Card>
  );
}
