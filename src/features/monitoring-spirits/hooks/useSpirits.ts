import { useQuery } from '@tanstack/react-query'
import { fetchSpirits } from '@/shared/lib/api'

export function useSpirits() {
  return useQuery({
    queryKey: ['spirits'],
    queryFn: fetchSpirits,
    refetchInterval: false, // We'll use SSE for updates
  })
}

