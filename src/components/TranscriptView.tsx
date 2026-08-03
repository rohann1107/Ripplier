import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check, Download, FileText } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface TranscriptViewProps {
  transcript: string;
  topicTitle: string;
  onBack: () => void;
}

export const TranscriptView: React.FC<TranscriptViewProps> = ({
  transcript,
  topicTitle,
  onBack,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    audioEngine.playClickSound();
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Split transcript into paragraphs for better readability
  const paragraphs = transcript
    .split(/\n+/)
    .filter((p) => p.trim().length > 0);

  // If no natural paragraphs, break by sentences every ~100 words
  const formattedParagraphs = paragraphs.length > 1
    ? paragraphs
    : splitIntoParagraphs(transcript);

  return (
    <div className="fixed inset-0 z-50 bg-[#090909] text-[#F5F2EC] flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#090909]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              audioEngine.playClickSound();
              onBack();
            }}
            className="p-2 rounded-full bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC] cursor-pointer transition-all flex items-center gap-2 text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC] hover:border-white/[0.2] transition-all text-xs font-mono flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#78B26A]" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-[#181818] border border-white/[0.08] text-[#666666] text-xs font-mono flex items-center gap-2 cursor-not-allowed opacity-50"
              title="Coming soon"
              disabled
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8"
      >
        {/* Topic header */}
        <div className="mb-8">
          <span className="text-xs font-mono text-[#C58A55] uppercase tracking-widest flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4" /> Full Transcript
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F2EC] tracking-tight">
            "{topicTitle}"
          </h2>
        </div>

        {/* Transcript body */}
        <div className="space-y-4">
          {formattedParagraphs.length > 0 ? (
            formattedParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-base sm:text-lg leading-relaxed text-[#CCCCCC] font-sans break-words"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-[#666666] font-mono text-sm italic">
              No transcript available. The speech was too short or no audio was detected.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Split long text into paragraphs every ~80 words at sentence boundaries
function splitIntoParagraphs(text: string): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const paragraphs: string[] = [];
  let current = '';
  let wordCount = 0;

  for (const sentence of sentences) {
    const sentenceWords = sentence.split(/\s+/).length;
    if (wordCount + sentenceWords > 80 && current.length > 0) {
      paragraphs.push(current.trim());
      current = sentence;
      wordCount = sentenceWords;
    } else {
      current += (current ? ' ' : '') + sentence;
      wordCount += sentenceWords;
    }
  }

  if (current.trim().length > 0) {
    paragraphs.push(current.trim());
  }

  return paragraphs;
}
