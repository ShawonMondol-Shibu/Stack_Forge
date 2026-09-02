import { apiService } from '@/lib/api-routes/apis';
import { TechStackItem } from '@/lib/types/techStack-type';
// import { techStackStore } from '@/store/TechStackStore';
import { useQuery } from '@tanstack/react-query';

export default function useTechStack() {
  return  useQuery({
    queryKey: ["techstacks"],
    queryFn: async () =>
      apiService<{ data: TechStackItem[] }>({ endpoint: "/tech-stack" }),
    select: (res) => res.data ?? [],
    staleTime: 1000 * 60 * 15,
  })
}
