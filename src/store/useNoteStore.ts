import { NoteType } from "@/lib/types/note-type";
import { create } from "zustand";

interface UseNoteStoreType {
  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;
  removeNote: (noteId: string) => void;
}

export const useNoteStore = create<UseNoteStoreType>((set) => ({
  notes: [],
  setNotes: (newNote) => set({ notes: newNote }),
  removeNote: (noteId) =>
    set((state) => ({
      notes: state.notes.filter((note) => note?.id !== noteId),
    })),
}));
