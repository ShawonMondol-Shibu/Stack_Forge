import React from "react";
import NoteForm from "@/components/Shared/dashboard/notes/NoteForm";

export default async function Page({params}: {params : Promise<{id?: string}>} ) {
    const {id} = await params
  return <NoteForm  id={id}/>;
}
