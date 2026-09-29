import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';

export default function UseSession() {
  return useQuery({
    queryKey: ["user-session"],
    queryFn: async () => authClient.getSession(),
    select: (data) => data.data,
  });
}
