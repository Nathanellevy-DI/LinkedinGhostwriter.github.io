export const WRITING_STYLES = [
    {
        id: "professional",
        name: "Professional",
        description: "Authoritative, polished, industry-expert",
        icon: "💼",
    },
    {
        id: "casual",
        name: "Casual & Friendly",
        description: "Conversational, approachable, relatable",
        icon: "😊",
    },
    {
        id: "thought-leader",
        name: "Thought Leader",
        description: "Visionary, inspiring, forward-thinking",
        icon: "💡",
    },
    {
        id: "contrarian",
        name: "Contrarian",
        description: "Bold, challenging, provocative",
        icon: "🔥",
    },
    {
        id: "storyteller",
        name: "Storyteller",
        description: "Personal, vulnerable, narrative",
        icon: "📖",
    },
    {
        id: "empathetic",
        name: "Empathetic",
        description: "Understanding, supportive, compassionate",
        icon: "❤️",
    },
] as const;

export const POST_TEMPLATES = [
    {
        id: "contrarian",
        name: "The Contrarian",
        structure: "Why everything you know about [Topic] is wrong",
        example: "Why everything you know about productivity is wrong.\n\nWe've been told to wake up at 5 AM.\nTo hustle harder.\nTo never stop grinding.\n\nBut here's what nobody tells you...",
    },
    {
        id: "storyteller",
        name: "The Storyteller",
        structure: "I failed at [X], and here's what it taught me",
        example: "I failed at my first startup, and here's what it taught me.\n\n3 years ago, I launched a product nobody wanted.\nBurned through $50K.\nLost sleep for months.\n\nBut that failure was the best thing that happened to me...",
    },
    {
        id: "listicle",
        name: "The Listicle",
        structure: "X tools/lessons/mistakes about [Topic]",
        example: "5 tools I use every day to stay productive:\n\n1. Notion - for organizing everything\n2. Superhuman - for email management\n3. Loom - for async communication\n4. Figma - for design collaboration\n5. Linear - for project tracking",
    },
    {
        id: "case-study",
        name: "The Case Study",
        structure: "How I achieved [Result] in [Timeframe]",
        example: "How I grew my newsletter to 10K subscribers in 6 months.\n\nNo paid ads.\nNo viral hacks.\nJust these 3 strategies...",
    },
    {
        id: "hot-take",
        name: "The Hot Take",
        structure: "Unpopular opinion: [Statement]",
        example: "Unpopular opinion: Your LinkedIn profile doesn't matter.\n\nYour content does.\n\nHere's why...",
    },
] as const;

export const CHARACTER_LIMIT = 3000;

export type WritingStyle = typeof WRITING_STYLES[number]["id"];
export type PostTemplate = typeof POST_TEMPLATES[number]["id"];
