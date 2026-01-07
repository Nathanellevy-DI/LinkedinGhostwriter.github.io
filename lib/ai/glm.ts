export interface GeneratePostOptions {
    rawNotes: string;
    style: string;
    humanizeLevel?: number;
    template?: string;
}

export interface GenerateHooksOptions {
    rawNotes: string;
    style: string;
}

const STYLE_PROMPTS: Record<string, string> = {
    professional: `Tone: Authoritative, polished, industry-expert
Sentence structure: Clear and concise
Vocabulary: Industry-specific but accessible
Emoji usage: Minimal (1-2 max)`,

    casual: `Tone: Conversational, approachable, relatable
Sentence structure: Varied, some fragments OK
Vocabulary: Everyday language
Emoji usage: Moderate (3-5)`,

    "thought-leader": `Tone: Visionary, inspiring, forward-thinking
Sentence structure: Mix of short punchy and longer reflective
Vocabulary: Aspirational, big-picture
Emoji usage: Strategic (2-3)`,

    contrarian: `Tone: Bold, challenging, provocative
Sentence structure: Short, punchy, declarative
Vocabulary: Strong verbs, definitive statements
Emoji usage: Minimal or none`,

    storyteller: `Tone: Personal, vulnerable, narrative
Sentence structure: Flowing, descriptive
Vocabulary: Emotional, sensory
Emoji usage: Moderate (3-4)`,

    empathetic: `Tone: Understanding, supportive, compassionate
Sentence structure: Warm, inclusive
Vocabulary: Caring, human-centered
Emoji usage: Thoughtful (2-4)`,
};

export async function generatePost({
    rawNotes,
    style,
    humanizeLevel = 50,
    template,
}: GeneratePostOptions): Promise<string> {
    const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.professional;

    const humanizeInstructions = humanizeLevel > 50
        ? `Add natural variations in sentence length, occasional casual language, and a conversational rhythm. Make it feel genuinely human-written.`
        : humanizeLevel > 25
            ? `Keep a professional tone but add some personality and natural flow.`
            : `Maintain a polished, professional tone throughout.`;

    const templateInstruction = template
        ? `\n\nUse this template structure: ${template}`
        : "";

    const systemPrompt = `You are a world-class LinkedIn ghostwriter. Your goal is to transform messy notes into engaging LinkedIn posts.

CRITICAL RULES:
- Use short sentences (10-15 words max)
- Add high white space (line breaks every 2-3 sentences)
- Create a STRONG hook in the first 2 lines that grabs attention
- Avoid corporate jargon and AI clichés like "delve", "unlock", "game-changer", "revolutionize"
- Sound genuinely human and conversational
- Stay under 3,000 characters
- Do NOT use hashtags (the user can add them later)

STYLE GUIDELINES:
${stylePrompt}

HUMANIZATION:
${humanizeInstructions}${templateInstruction}

Transform the following notes into a compelling LinkedIn post:`;

    try {
        const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GLM_API_KEY}`,
            },
            body: JSON.stringify({
                model: "GLM-4-Flash",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: rawNotes }
                ],
                temperature: 0.7,
                max_tokens: 1000,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`GLM API error: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content || "";
    } catch (error) {
        console.error("Error generating post:", error);
        throw error;
    }
}

export async function generateHooks({
    rawNotes,
    style,
}: GenerateHooksOptions): Promise<string[]> {
    const stylePrompt = STYLE_PROMPTS[style] || STYLE_PROMPTS.professional;

    const systemPrompt = `You are a LinkedIn hook specialist. Generate 5 different opening lines (hooks) for a LinkedIn post.

Each hook should be:
- 1-2 sentences max
- Attention-grabbing
- Different in approach
- Aligned with the ${style} style

STYLE GUIDELINES:
${stylePrompt}

HOOK TYPES TO USE:
1. The Question Hook - Start with a provocative question
2. The Controversial Statement - Make a bold claim
3. The Personal Story - Begin with a relatable moment
4. The Surprising Statistic - Lead with unexpected data
5. The Bold Prediction - Make a future-focused statement

Format your response as a JSON array of 5 strings, nothing else. Just the array, no markdown formatting.

Based on these notes, generate 5 hooks:`;

    try {
        const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GLM_API_KEY}`,
            },
            body: JSON.stringify({
                model: "GLM-4-Flash",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: rawNotes }
                ],
                temperature: 0.8,
                max_tokens: 300,
            }),
        });

        if (!response.ok) {
            throw new Error(`GLM API error: ${response.statusText}`);
        }

        const data = await response.json();
        const text = data.choices[0].message.content || "";

        try {
            const hooks = JSON.parse(text);
            if (Array.isArray(hooks)) {
                return hooks.slice(0, 5);
            }
        } catch {
            return text
                .split("\n")
                .filter((line) => line.trim().length > 0)
                .slice(0, 5);
        }

        return [];
    } catch (error) {
        console.error("Error generating hooks:", error);
        throw error;
    }
}
