import type { SessionData } from '../types';

const STORAGE_KEY = 'ripplier_sessions';

/**
 * Save a completed session to localStorage.
 */
export function saveSession(session: SessionData): void {
  try {
    const existing = getSessions();
    existing.unshift(session); // newest first
    // Keep last 200 sessions max
    const trimmed = existing.slice(0, 200);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('Failed to save session:', e);
  }
}

/**
 * Retrieve all saved sessions from localStorage.
 */
export function getSessions(): SessionData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SessionData[];
  } catch {
    return [];
  }
}

/**
 * Generate a unique session ID.
 */
export function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Calculate words per minute from a transcript and duration.
 */
export function calculateWPM(transcript: string, durationSeconds: number): number {
  if (durationSeconds <= 0) return 0;
  const wordCount = transcript.trim().split(/\s+/).filter(Boolean).length;
  return Math.round((wordCount / durationSeconds) * 60);
}

/**
 * Count total words in a transcript.
 */
export function countWords(transcript: string): number {
  return transcript.trim().split(/\s+/).filter(Boolean).length;
}
