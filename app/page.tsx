"use client";

import { useState } from "react";
import { WRITING_STYLES } from "@/lib/constants";
import { CHARACTER_LIMIT } from "@/lib/constants";
import { formatCharacterCount } from "@/lib/utils";

export default function EditorPage() {
  const [rawNotes, setRawNotes] = useState("");
  const [style, setStyle] = useState("professional");
  const [generatedPost, setGeneratedPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const characterCount = rawNotes.length;
  const outputCharacterCount = generatedPost.length;

  const handleGenerate = async () => {
    if (!rawNotes.trim()) {
      setError("Please enter some notes first!");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rawNotes,
          style,
          humanizeLevel: 50,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to generate post");
      }

      setGeneratedPost(data.post);
    } catch (err: any) {
      console.error("Error generating post:", err);
      setError(err.message || "Failed to generate post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPost);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Left Panel - Dark Navy */}
      <div className="w-full lg:w-1/2 bg-slate-900 p-8 lg:p-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Ghostwriter</h1>
              <p className="text-sm text-cyan-400">AI Thought Leadership</p>
            </div>
          </div>
        </div>

        {/* Raw Notes Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Raw Notes Brain Dump...
          </label>
          <textarea
            value={rawNotes}
            onChange={(e) => setRawNotes(e.target.value)}
            placeholder="- meeting was gr8, need 2 fix on project x, maybe talk!&#10;&#10;maybe talk about 'synergy' sumhow? wants 'vision'&#10;boss wants Q3 goals? hi-poller-ital strats"
            className="w-full h-48 bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none font-mono text-sm"
          />
          <div className="mt-2 text-xs text-gray-500">
            {characterCount} characters
          </div>
        </div>

        {/* Template & Vibe Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Template & Vibe Selector
          </label>
          <div className="grid grid-cols-2 gap-3">
            {WRITING_STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${style === s.id
                    ? "bg-cyan-500/20 border-cyan-500 shadow-lg shadow-cyan-500/20"
                    : "bg-slate-800/30 border-slate-700 hover:border-slate-600"
                  }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{s.icon}</span>
                  <span className="text-sm font-semibold text-white">{s.name}</span>
                </div>
                <div className="text-xs text-gray-400 line-clamp-1">{s.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading || !rawNotes.trim()}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate New Hook</span>
            </>
          )}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}
      </div>

      {/* Right Panel - Light */}
      <div className="hidden lg:block w-1/2 bg-white p-12">
        <div className="max-w-2xl">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⭐</span>
              <h2 className="text-sm font-semibold text-gray-600">AI-Transformed Post</h2>
            </div>
          </div>

          {/* Generated Post */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">Crafting your post...</p>
              </div>
            </div>
          ) : generatedPost ? (
            <>
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {generatedPost.split('\n\n')[0]}
                </div>
                <div className="bg-gray-50 border-l-4 border-cyan-500 p-6 rounded-r-lg">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {generatedPost.split('\n\n').slice(1).join('\n\n')}
                  </p>
                </div>
              </div>

              {/* Character Count */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all ${outputCharacterCount > CHARACTER_LIMIT * 0.9
                          ? 'bg-red-500'
                          : outputCharacterCount > CHARACTER_LIMIT * 0.7
                            ? 'bg-yellow-500'
                            : 'bg-cyan-500'
                        }`}
                      style={{ width: `${Math.min((outputCharacterCount / CHARACTER_LIMIT) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono text-gray-600">
                    {formatCharacterCount(outputCharacterCount)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy Post</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>Your AI-generated post will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
