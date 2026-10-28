import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';

export default function UseSession() {
  return useQuery({
    queryKey: ["user-session"],
    queryFn: async () => authClient.getSession(),
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus
  });
}
