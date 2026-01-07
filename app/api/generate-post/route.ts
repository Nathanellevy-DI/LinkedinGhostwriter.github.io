import { NextRequest, NextResponse } from "next/server";
import { generatePost } from "@/lib/ai/openai";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { rawNotes, style, humanizeLevel, template } = body;

        if (!rawNotes || !style) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                {
                    error: "API key not configured. Please add OPENAI_API_KEY to your .env.local file.",
                    details: "Get your API key from https://platform.openai.com/api-keys"
                },
                { status: 500 }
            );
        }

        const generatedPost = await generatePost({
            rawNotes,
            style,
            humanizeLevel,
            template,
        });

        return NextResponse.json({ post: generatedPost });
    } catch (error: any) {
        console.error("Error in generate-post API:", error);

        // Provide more specific error messages
        const errorMessage = error?.message || "Failed to generate post";
        const errorDetails = error?.status === 401
            ? "Invalid API key. Please check your OPENAI_API_KEY in .env.local"
            : error?.status === 429
                ? "Rate limit exceeded. Please try again in a moment."
                : "An unexpected error occurred. Check the console for details.";

        return NextResponse.json(
            {
                error: errorMessage,
                details: errorDetails
            },
            { status: 500 }
        );
    }
}
