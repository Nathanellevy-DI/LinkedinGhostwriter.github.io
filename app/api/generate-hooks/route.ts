import { NextRequest, NextResponse } from "next/server";
import { generateHooks } from "@/lib/ai/openai";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { rawNotes, style } = body;

        if (!rawNotes || !style) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: "API key not configured" },
                { status: 500 }
            );
        }

        const hooks = await generateHooks({
            rawNotes,
            style,
        });

        return NextResponse.json({ hooks });
    } catch (error) {
        console.error("Error in generate-hooks API:", error);
        return NextResponse.json(
            { error: "Failed to generate hooks" },
            { status: 500 }
        );
    }
}
