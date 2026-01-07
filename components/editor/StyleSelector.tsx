"use client";

import { WRITING_STYLES } from "@/lib/constants";

interface StyleSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Choose Your Vibe
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {WRITING_STYLES.map((style) => (
                    <button
                        key={style.id}
                        onClick={() => onChange(style.id)}
                        className={`group relative rounded-lg border-2 p-4 text-left transition-all hover:scale-105 ${value === style.id
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                                : "border-gray-300 bg-white hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900"
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">{style.icon}</span>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {style.name}
                                </h3>
                                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                    {style.description}
                                </p>
                            </div>
                        </div>
                        {value === style.id && (
                            <div className="absolute right-2 top-2">
                                <svg
                                    className="h-5 w-5 text-blue-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
