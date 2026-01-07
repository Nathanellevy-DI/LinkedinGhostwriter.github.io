import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCharacterCount(count: number, limit: number = 3000): string {
  return `${count.toLocaleString()} / ${limit.toLocaleString()}`;
}

export function getCharacterCountColor(count: number, limit: number = 3000): string {
  const percentage = (count / limit) * 100;
  
  if (percentage < 70) return "text-green-600";
  if (percentage < 90) return "text-yellow-600";
  return "text-red-600";
}

export function addLinkedInFormatting(text: string): string {
  // Add line breaks every 2-3 sentences for better readability
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  let formatted = "";
  
  sentences.forEach((sentence, index) => {
    formatted += sentence.trim();
    
    // Add double line break every 2-3 sentences
    if ((index + 1) % 2 === 0 && index < sentences.length - 1) {
      formatted += "\n\n";
    } else if (index < sentences.length - 1) {
      formatted += " ";
    }
  });
  
  return formatted;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}
