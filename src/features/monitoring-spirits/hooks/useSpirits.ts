import { useQuery } from "@tanstack/react-query";
import { fetchSpirits } from "@/shared/lib/api";

export function useSpirits() {
  return useQuery({
    queryKey: ["spirits"],
    queryFn: fetchSpirits,
    refetchInterval: false, // We'll use SSE for updates
    staleTime: Infinity, // Never consider stale - updates come from SSE and mutations
    refetchOnMount: false, // Don't refetch on mount
  });
}
