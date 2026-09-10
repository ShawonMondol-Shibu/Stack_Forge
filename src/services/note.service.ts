import { apiService } from "@/lib/api-routes/apis";
import { ApiResponse } from "@/lib/types/api";
import {
  createNotePayload,
  NoteType,
  updateNotePayload,
} from "@/lib/types/note-type";

export const noteService = {
  create: (data: createNotePayload) => {
    return apiService<ApiResponse<NoteType>>({
      endpoint: "/notes",
      method: "POST",
      body: data,
    });
  },

  getAll: () => {
    return apiService<ApiResponse<NoteType[]>>({
      endpoint: "/notes",
      method: "GET",
    });
  },

  getOne: (id?: string) => {
    return apiService<ApiResponse<NoteType>>({
      endpoint: `/notes/${id}`,
      method: "GET",
    });
  },

  update: (id: string, data: updateNotePayload) => {
    return apiService<ApiResponse<NoteType>>({
      endpoint: `/notes/${id}`,
      method: "PATCH",
      body: data,
    });
  },

  remove: (id: string) => {
    return apiService<ApiResponse<NoteType>>({
      endpoint: `/notes/${id}`,
      method: "DELETE",
    });
  },
};
