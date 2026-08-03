import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, FileText, Zap, Target,
  Eye, RotateCcw, Copy, Check, MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { FillerWordCount } from '../types';

interface SessionSummaryProps {
  speakingTime: number; // seconds
  totalWords: number;
  wpm: number;
  topicTitle: string;
  // dateTime: string; // ISO string
  fillerWords: FillerWordCount[];
  onViewTranscript: () => void;
  onPracticeAgain: () => void;
  onCopyTranscript: () => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs} sec`;
  return `${mins} min ${secs} sec`;
}



export const SessionSummary: React.FC<SessionSummaryProps> = ({
  speakingTime,
  totalWords,
  wpm,
  topicTitle,
  // dateTime,
  fillerWords,
  onViewTranscript,
  onPracticeAgain,
  onCopyTranscript,
}) => {
  const [copied, setCopied] = React.useState(false);

  // Celebration confetti on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.4 },
        colors: ['#C58A55', '#7CC8F3', '#F5F2EC', '#78B26A'],
        disableForReducedMotion: true,
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    onCopyTranscript();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const metrics = [
    { icon: <Clock className="w-5 h-5" />, label: 'Speaking Time', value: formatDuration(speakingTime), color: 'text-[#7CC8F3]' },
    { icon: <FileText className="w-5 h-5" />, label: 'Total Words', value: `${totalWords} Words`, color: 'text-[#C58A55]' },
    { icon: <Zap className="w-5 h-5" />, label: 'Speaking Speed', value: `${wpm} WPM`, color: 'text-[#78B26A]' },
    { icon: <Target className="w-5 h-5" />, label: 'Topic Practiced', value: topicTitle.length > 50 ? topicTitle.substring(0, 47) + '...' : topicTitle, color: 'text-[#F5F2EC]' },
    // { icon: <Calendar className="w-5 h-5" />, label: 'Session Completed', value: formatDateTime(dateTime), color: 'text-[#AAAAAA]' },
  ];

  // Total count of all filler words
  const totalFillerCount = fillerWords.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="fixed inset-0 z-50 bg-[#090909] text-[#F5F2EC] mt-5 flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl flex flex-col items-center gap-6"
      >
        {/* Title */}
        <div className="text-center pt-35">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4, type: 'spring' }}
            className="text-5xl mb-3"
          >
            🎉
          </motion.div>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-2">
            Session Complete!
          </h1>
          <p className="text-sm font-mono text-[#AAAAAA] uppercase tracking-wider">
            Copy Coach prompt and Paste into ChatGpt for feedback
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.08, duration: 0.35 }}
              className="p-4 rounded-2xl bg-[#141414] border border-white/[0.08] flex items-start gap-3"
            >
              <div className={`p-2 rounded-xl bg-white/[0.05] ${metric.color}`}>
                {metric.icon}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-mono text-[#666666] uppercase tracking-wider block">
                  {metric.label}
                </span>
                <span className={`text-sm font-semibold ${metric.color} break-words`}>
                  {metric.value}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Filler Words Metric Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + metrics.length * 0.08, duration: 0.35 }}
            className="p-4 rounded-2xl bg-[#141414] border border-white/[0.08] flex items-start gap-3 sm:col-span-2"
          >
            <div className="p-2 rounded-xl bg-white/[0.05] text-[#E05D5D]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-mono text-[#666666] uppercase tracking-wider block">
                Filler Words Count ({totalFillerCount} total)
              </span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {fillerWords.length > 0 ? (
                  fillerWords.map((fw) => (
                    <span
                      key={fw.word}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-[#E05D5D]/10 border border-[#E05D5D]/20 text-[#E05D5D] text-xs font-medium"
                    >
                      {fw.word.trim()}
                      {fw.count > 1 && (
                        <span className="ml-1 opacity-70 font-semibold">
                          ×{fw.count}
                        </span>
                      )}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-[#78B26A] font-mono font-medium">
                    No filler words detected! Excellent job.
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.35 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
        >
          <button
            onClick={onViewTranscript}
            className="w-full py-4 rounded-2xl bg-[#181818] border border-white/[0.1] text-[#F5F2EC] hover:border-[#7CC8F3]/50 hover:bg-[#7CC8F3]/5 transition-all text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer"
          >
            <Eye className="w-5 h-5 text-[#7CC8F3]" />
            View Transcript
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C58A55] to-[#D4995F] text-[#090909] text-sm font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-3 cursor-pointer shadow-glow-gold hover:opacity-90 transition-all"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Prompt Copied!' : 'Copy Coach Prompt'}
          </button>

          <button
            onClick={onPracticeAgain}
            className="w-full py-4 rounded-2xl bg-[#181818] border border-white/[0.1] text-[#AAAAAA] hover:text-[#F5F2EC] hover:border-[#C58A55]/40 transition-all text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer sm:col-span-2"
          >
            <RotateCcw className="w-5 h-5" />
            Practice Again
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
