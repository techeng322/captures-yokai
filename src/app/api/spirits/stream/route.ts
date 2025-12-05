import { NextRequest } from 'next/server'
import { ThreatLevel } from '@/shared/types/spirit'
import { mockSpirits } from '@/shared/lib/mockSpirits'

const spiritIds = mockSpirits.map((spirit) => spirit.id)
const threatLevels: ThreatLevel[] = ['Low', 'Medium', 'High', 'Critical']

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const sendUpdate = () => {
        // Randomly select a spirit and threat level
        const randomId = spiritIds[Math.floor(Math.random() * spiritIds.length)]
        const randomThreatLevel =
          threatLevels[Math.floor(Math.random() * threatLevels.length)]

        const data = JSON.stringify({
          id: randomId,
          threatLevel: randomThreatLevel,
        })

        controller.enqueue(
          encoder.encode(`data: ${data}\n\n`)
        )
      }

      // Send initial update
      sendUpdate()

      // Send updates every 5 seconds
      const interval = setInterval(() => {
        try {
          sendUpdate()
        } catch (error) {
          clearInterval(interval)
          controller.close()
        }
      }, 5000)

      // Clean up on client disconnect
      request.signal.addEventListener('abort', () => {
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

