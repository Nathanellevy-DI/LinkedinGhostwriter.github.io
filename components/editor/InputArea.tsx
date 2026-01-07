"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { CHARACTER_LIMIT } from "@/lib/constants";
import { formatCharacterCount, getCharacterCountColor } from "@/lib/utils";

interface InputAreaProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function InputArea({ value, onChange, placeholder }: InputAreaProps) {
    const characterCount = value.length;
    const isOverLimit = characterCount > CHARACTER_LIMIT;

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Messy Notes
                </label>
                <span
                    className={`text-sm font-medium transition-colors ${getCharacterCountColor(
                        characterCount
                    )}`}
                >
                    {formatCharacterCount(characterCount)}
                </span>
            </div>
            <Textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={
                    placeholder ||
                    "Just dump your thoughts here... No structure needed!\n\nExample:\n- Had a meeting today about productivity\n- Realized most people are doing it wrong\n- The 5 AM wake up thing is overrated\n- What actually works is..."
                }
                className={`min-h-[300px] resize-none ${isOverLimit ? "border-red-500 focus:border-red-500" : ""
                    }`}
            />
            {isOverLimit && (
                <p className="text-sm text-red-600">
                    Your notes exceed the LinkedIn character limit. Consider shortening them.
                </p>
            )}
        </div>
    );
}
