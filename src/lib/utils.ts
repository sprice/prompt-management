import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractUserPrompt(text: string): string | null {
  const userMatch = text.match(/<user>([\s\S]*?)<\/user>/);
  return userMatch ? userMatch[1].trim() : null;
}
