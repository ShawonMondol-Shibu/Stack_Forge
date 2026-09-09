export type NoteType ={
    id?: string,
    userId?: string,
    title?: string,
    tags?: string[],
    content?: string,
    createdAt?: number | Date | undefined,
    updatedAt?: number | Date | undefined,
}


export type createNotePayload = Partial<NoteType>

export type updateNotePayload = Partial<createNotePayload>