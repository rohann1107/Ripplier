export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Extreme';

export type TopicMode = 'concept' | 'question';

export type Category =
  | 'General'
  | 'Psychology'
  | 'Mental Models'
  | 'Cognitive Biases'
  | 'Philosophy'
  | 'Leadership'
  | 'Communication'
  | 'Business'
  | 'Startups'
  | 'Economics'
  | 'Finance'
  | 'Artificial Intelligence'
  | 'Programming'
  | 'Design'
  | 'History'
  | 'Science'
  | 'Relationships'
  | 'Creativity'
  | 'Ethics'
  | 'Career';

export interface Topic {
  id: string;
  title: string;
  mode: TopicMode;
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
  topicMode: TopicMode;
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
