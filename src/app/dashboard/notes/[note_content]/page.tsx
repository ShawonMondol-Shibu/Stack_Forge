import React from "react";
import NoteDetails from "./NoteDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ note_content: string }>;
}) {
  const id = (await params).note_content;

  return <NoteDetails id={id} />;
}
