import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Spirit, SpiritSchema } from "@/shared/types/spirit";
import { ParamsSchema } from "@/shared/types/api";
import { mockSpirits } from "@/shared/lib/mockSpirits";

// Force dynamic rendering - API routes with dynamic params should not be statically generated
export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate params
    const { id } = ParamsSchema.parse({ id: params.id });

    // 30% probability of error
    if (Math.random() < 0.3) {
      return NextResponse.json(
        { message: "Capture failed: Spirit escaped!" },
        { status: 500 }
      );
    }

    const spirit = mockSpirits.find((s) => s.id === id);

    if (!spirit) {
      return NextResponse.json(
        { message: "Spirit not found" },
        { status: 404 }
      );
    }

    if (spirit.status === "Caught") {
      return NextResponse.json(
        { message: "Spirit already captured" },
        { status: 400 }
      );
    }

    const updatedSpirit: Spirit = {
      ...spirit,
      status: "Caught",
    };

    // Validate response with Zod
    const validatedSpirit = SpiritSchema.parse(updatedSpirit);

    return NextResponse.json(validatedSpirit);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request", errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
