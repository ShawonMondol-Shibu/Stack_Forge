import { queryKeys } from '@/lib/Query-keys';
import { techStackService } from '@/services/techStack.service';
// import { techStackStore } from '@/store/TechStackStore';
import { useQuery } from '@tanstack/react-query';

export default function useTechStack() {
  return  useQuery({
    queryKey: queryKeys.techStacks.all,
    queryFn: async () => techStackService.getAll(),
    select: (res) => res.data ?? [],
    staleTime: 1000 * 60 * 15,
  })
}
