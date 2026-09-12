import React from "react";
import NoteDetails from "./NoteDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ note_content: string }>;
}) {
  const {note_content:id} = await params;

  return <NoteDetails id={id} />;
}
