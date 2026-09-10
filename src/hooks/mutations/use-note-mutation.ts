import { useMutation, useQueryClient } from "@tanstack/react-query";

import { noteService } from "@/services/note.service";
import { queryKeys } from "@/lib/Query-keys";
import type {
  createNotePayload,
  updateNotePayload,
} from "@/lib/types/note-type";
import { toast } from "@/components/ui/toast";
import { useNoteStore } from "@/store/useNoteStore";
import { useRouter } from "next/navigation";

export const noteMutation = {
  CreateNote: () => {
    const queryClient = useQueryClient();
    const { setOneNote } = useNoteStore();

    const router = useRouter()
    return useMutation({
      mutationFn: (data: createNotePayload) => noteService.create(data),

      onError: (err) => {
        toast.add({
          type: "error",
          title: err.message || "Failed to create note",
        });
      },

      onSuccess: (res) => {
        // 1. Update Zustand store synchronously for immediate UI feedback
        setOneNote(res.data);
        router.push(`/dashboard/notes/${res.data.id}`)
        // 2. Invalidate cache to ensure server state consistency
        queryClient.invalidateQueries({
          queryKey: queryKeys.projects.all,
        });

        const id = toast.add({
          type: "success",
          title: "Note created successfully",
          actionProps: {
            onClick() {
              toast.close(id);
            },
          },
        });
      },
    });
  },

  UpdateNote: () => {
    const queryClient = useQueryClient();
    const { setNotes } = useNoteStore();
    const router = useRouter()

    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: updateNotePayload }) =>
        noteService.update(id, data),

      onError: (err) => {
        toast.add({
          type: "error",
          title: err.message || "Failed to update note",
        });
      },

      onSuccess: (res, variables) => {
        //   1. Update Zustand store synchronously
        setNotes([{...res.data}]);

        router.push(`/dashboard/notes/${res.data.id}`)
        // 2. Invalidate relevant queries
        queryClient.invalidateQueries({
          queryKey: queryKeys.notes.all,
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.notes.getOne(variables.id),
        });

        toast.add({
          type: "success",
          title: "Note updated successfully",
        });
      },
    });
  },

  DeleteNote: () => {
    const queryClient = useQueryClient();
    const { removeNote } = useNoteStore();
    const router = useRouter()

    return useMutation({
      mutationFn: (id: string) => noteService.remove(id),

      onError: (err) => {
        toast.add({
          type: "error",
          title: err.message || "Failed to delete note",
        });
      },

      onSuccess: (res, id) => {
        // 1. Update Zustand store synchronously
        removeNote(id);
        router.push('/dashboard/notes')
        // 2. Invalidate cache
        queryClient.invalidateQueries({
          queryKey: queryKeys.notes.all,
        });

        toast.add({
          title: res?.message || "Note deleted successfully",
        });
      },
    });
  },
};
