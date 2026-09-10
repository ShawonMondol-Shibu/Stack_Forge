import { queryKeys } from "@/lib/Query-keys";
import { noteService } from "@/services/note.service";
import { useQuery } from "@tanstack/react-query";

export const noteQuery = {
  GetAll: () => {
    return useQuery({
      queryKey: queryKeys.notes.all,
      queryFn: async () => noteService.getAll(),
      select: res=> res.data ?? [] ,
      staleTime: 1000 * 60 * 5

    });
  },

  GetOne: (id?: string)=> {
    return useQuery({
        queryKey: queryKeys.notes.getOne(id),
        queryFn: async ()=> noteService.getOne(id),
        select: res=> res.data,
        
    })
  }
};
