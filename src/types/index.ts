export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Extreme';

export type Category =
  | 'Psychology'
  | 'Philosophy'
  | 'Human Behaviour'
  | 'Economics'
  | 'Productivity'
  | 'Communication'
  | 'Science'
  | 'AI';

export interface Topic {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  tags: string[];
  explanation?: string; // Thought Angle
  keyPoints?: string[];
}

export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

export interface UserSettings {
  soundEnabled: boolean;
  volume: number;
  timerDuration: number;
  difficulty: Difficulty | 'All';
  category: Category | 'All';
  reducedMotion: boolean;
  autoStartTimer: boolean;
}

export interface SpeechRecording {
  id: string;
  topicId: string;
  topicTitle: string;
  duration: number;
  audioUrl: string;
  timestamp: string;
}

// Filler word count
export interface FillerWordCount {
  word: string;
  count: number;
}

// Session data for history
export interface SessionData {
  id: string;
  topic: string;
  topicCategory: Category;
  date: string; // ISO date string
  duration: number; // seconds
  transcript: string;
  wordsPerMinute: number;
  totalWords: number;
  fillerWords: FillerWordCount[];
}
