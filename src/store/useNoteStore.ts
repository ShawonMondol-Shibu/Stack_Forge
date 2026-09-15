import { NoteType } from "@/lib/types/note-type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UseNoteStoreType {
  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;
  setOneNote: (note: NoteType) => void;
  removeNote: (noteId: string) => void;
}

export const useNoteStore = create<UseNoteStoreType>()(
  persist(
    (set) => ({
      notes: [],
      setNotes: (newNotes) => set({ notes: newNotes }),
      setOneNote: (newNote) =>
        set((state) => ({
          notes: [...state.notes, newNote],
        })),
      removeNote: (noteId) =>
        set((state) => ({
          notes: state.notes.filter((note) => note?.id !== noteId),
        })),
    }),
    { name: "stackforge-notes" },
  ),
);
