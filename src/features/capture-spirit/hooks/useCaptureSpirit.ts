import { useMutation, useQueryClient } from '@tanstack/react-query'
import { captureSpirit } from '@/shared/lib/api'
import { Spirit } from '@/shared/types/spirit'

export function useCaptureSpirit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: captureSpirit,
    onMutate: async (spiritId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['spirits'] })

      // Snapshot the previous value
      const previousSpirits = queryClient.getQueryData<Spirit[]>(['spirits'])

      // Optimistically update to the new value
      if (previousSpirits) {
        queryClient.setQueryData<Spirit[]>(['spirits'], (old) =>
          old?.map((spirit) =>
            spirit.id === spiritId
              ? { ...spirit, status: 'Caught' as const }
              : spirit
          )
        )
      }

      return { previousSpirits }
    },
    onSuccess: (updatedSpirit) => {
      // Update the cache with the actual response from the server
      queryClient.setQueryData<Spirit[]>(['spirits'], (old) =>
        old?.map((spirit) =>
          spirit.id === updatedSpirit.id ? updatedSpirit : spirit
        )
      )
    },
    onError: (err, spiritId, context) => {
      // Rollback on error
      if (context?.previousSpirits) {
        queryClient.setQueryData(['spirits'], context.previousSpirits)
      }
      throw err
    },
  })
}

