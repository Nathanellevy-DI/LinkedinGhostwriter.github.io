"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CHARACTER_LIMIT } from "@/lib/constants";
import { formatCharacterCount, getCharacterCountColor } from "@/lib/utils";

interface OutputPreviewProps {
    content: string;
    isLoading?: boolean;
}

export function OutputPreview({ content, isLoading }: OutputPreviewProps) {
    const [copied, setCopied] = useState(false);
    const characterCount = content.length;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your LinkedIn Post
                </label>
                <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Crafting your post...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your LinkedIn Post
                </label>
                <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Your generated post will appear here
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your LinkedIn Post
                </label>
                <span
                    className={`text-sm font-medium transition-colors ${getCharacterCountColor(
                        characterCount
                    )}`}
                >
                    {formatCharacterCount(characterCount)}
                </span>
            </div>
            <div className="relative rounded-lg border-2 border-gray-300 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div className="whitespace-pre-wrap font-sans text-gray-900 dark:text-white">
                        {content}
                    </div>
                </div>
                <div className="mt-6 flex gap-3">
                    <Button onClick={handleCopy} size="sm">
                        {copied ? (
                            <>
                                <svg
                                    className="mr-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg
                                    className="mr-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                                Copy to Clipboard
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
