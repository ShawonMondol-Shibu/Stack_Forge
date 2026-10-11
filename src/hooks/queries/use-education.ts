import { queryKeys } from "@/lib/Query-keys";
import { educationService } from "@/services/education.service";
import { useQuery } from "@tanstack/react-query";

export const educationQuery = {
  GetMy: () =>
    useQuery({
      queryKey: queryKeys.educations.me,
      queryFn: educationService.getMy,
      select: (response) => response.data,
    }),

  GetByUser: (userId: string) =>
    useQuery({
      queryKey: queryKeys.educations.byUser(userId),
      queryFn: () => educationService.getByUser(userId),
      select: (response) => response.data,
      enabled: Boolean(userId),
    }),

  GetOne: (id: string) =>
    useQuery({
      queryKey: queryKeys.educations.getOne(id),
      queryFn: () => educationService.getOne(id),
      select: (response) => response.data,
      enabled: Boolean(id),
    }),
};
