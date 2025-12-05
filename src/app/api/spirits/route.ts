import { NextResponse } from 'next/server'
import { z } from 'zod'
import { SpiritSchema } from '@/shared/types/spirit'
import { mockSpirits } from '@/shared/lib/mockSpirits'

export async function GET() {
  try {
    // Validate all spirits with Zod before returning
    const validatedSpirits = z.array(SpiritSchema).parse(mockSpirits)
    return NextResponse.json(validatedSpirits)
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch spirits' },
      { status: 500 }
    )
  }
}

