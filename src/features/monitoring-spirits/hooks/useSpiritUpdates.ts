import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Spirit, ThreatLevel } from '@/shared/types/spirit'

const threatLevels: ThreatLevel[] = ['Low', 'Medium', 'High', 'Critical']

export function useSpiritUpdates() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const eventSource = new EventSource('/api/spirits/stream')

    eventSource.onmessage = (event) => {
      try {
        const update: { id: string; threatLevel: ThreatLevel } =
          JSON.parse(event.data)

        // Update the spirit in the cache
        queryClient.setQueryData<Spirit[]>(['spirits'], (old) =>
          old?.map((spirit) =>
            spirit.id === update.id
              ? { ...spirit, threatLevel: update.threatLevel }
              : spirit
          )
        )
      } catch (error) {
        console.error('Failed to parse SSE message:', error)
      }
    }

    eventSource.onerror = (error) => {
      console.error('SSE error:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [queryClient])
}

