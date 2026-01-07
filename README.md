# LinkedIn Ghostwriter 🚀

Transform your messy notes into professional LinkedIn thought leadership posts with AI.

## 🎯 What This Does

Every professional wants to post on LinkedIn, but most people are intimidated by the blank page or feel their ideas are too "messy." This app bridges the gap between a "brain dump" and a "viral hook."

## ✨ Features

### MVP (Phase 1) ✅
- 📝 **Messy Input**: Just dump your thoughts - no structure needed
- 🎨 **Style Selector**: Choose your vibe (Professional, Casual, Thought Leader, etc.)
- 🔄 **One-Click Generation**: Transform notes into polished posts
- 📊 **Character Counter**: Stay within LinkedIn's 3,000 character limit
- 📋 **Copy to Clipboard**: Easy sharing

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router) + TypeScript
- **Styling**: Tailwind CSS
 **AI**: z.ai 
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm
- z.a API key



## 📁 Project Structure

```
linkedin-ghostwriter/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── generate-post/ # Post generation endpoint
│   │   └── generate-hooks/# Hook generation endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main editor page
├── components/            # React components
│   ├── editor/           # Editor-specific components
│   │   ├── InputArea.tsx
│   │   ├── StyleSelector.tsx
│   │   └── OutputPreview.tsx
│   └── ui/               # Reusable UI components
│       ├── Button.tsx
│       └── Textarea.tsx
└── lib/                   # Utilities and helpers
    ├── ai/               # AI integration
    │   └── anthropic.ts
    ├── constants.ts      # App constants
    └── utils.ts          # Helper functions
```

## 🎨 Writing Styles

- **Professional**: Authoritative, polished, industry-expert
- **Casual & Friendly**: Conversational, approachable, relatable
- **Thought Leader**: Visionary, inspiring, forward-thinking
- **Contrarian**: Bold, challenging, provocative
- **Storyteller**: Personal, vulnerable, narrative
- **Empathetic**: Understanding, supportive, compassionate

## 🔑 How It Works

### The "Secret Sauce" - Prompt Engineering

The app uses carefully crafted prompts that tell the AI to:
- Use short sentences (10-15 words max)
- Add high white space (line breaks every 2-3 sentences)
- Create strong hooks in the first 2 lines
- Avoid corporate jargon and AI clichés
- Sound genuinely human

## 🗺️ Roadmap

- [x] Project setup
- [x] Core editor UI
- [x] AI integration
- [x] Style variations
- [ ] Hook generator (5 variations)
- [ ] Humanize slider
- [ ] Template library
- [ ] Database integration
- [ ] User authentication
- [ ] Image generation
- [ ] Post history


-
