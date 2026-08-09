import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, FileText, Zap, Target,
  Eye, RotateCcw, Copy, Check, MessageSquare,
  Play, Pause, Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { FillerWordCount } from '../types';
import { convertWebMToMP3 } from '../utils/mp3Converter';

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
  audioUrl?: string | null;
  audioBlob?: Blob | null;
  conversionPromise?: Promise<Blob> | null;
  actualAudioDuration?: number | null;
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
  audioUrl,
  audioBlob,
  conversionPromise,
  actualAudioDuration,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isConverting, setIsConverting] = React.useState(false);
  const [downloadError, setDownloadError] = React.useState<string | null>(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [audioDuration, setAudioDuration] = React.useState(speakingTime);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [fileName, setFileName] = React.useState('');
  const speechNumberInitialized = React.useRef(false);

  // Sync actualAudioDuration immediately when it changes
  React.useEffect(() => {
    if (
      actualAudioDuration &&
      Number.isFinite(actualAudioDuration) &&
      actualAudioDuration > 0
    ) {
      setAudioDuration(actualAudioDuration);
    }
  }, [actualAudioDuration]);

  React.useEffect(() => {
    // Prevent React StrictMode from generating the number twice
    if (speechNumberInitialized.current) return;

    speechNumberInitialized.current = true;

    const storedNumber = Number(
      localStorage.getItem('ripplier-speech-number') || '0'
    );

    const nextNumber = storedNumber + 1;

    localStorage.setItem(
      'ripplier-speech-number',
      String(nextNumber)
    );

    const safeTopicTitle = (topicTitle || 'Untitled Topic')
      .replace(/[-–—]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    setFileName(
      `Ripplier-${safeTopicTitle}-${String(nextNumber).padStart(2, '0')}`
    );
  }, [topicTitle]);
  // Initialize and clean up audio
  React.useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio();
    audio.src = audioUrl;
    audio.preload = "metadata";

    audioRef.current = audio;

    const updateDuration = () => {
      const duration = audio.duration;

      console.log(
        '🎧 ACTUAL RECORDED AUDIO DURATION:',
        duration,
        'seconds'
      );

      if (
        (!actualAudioDuration || actualAudioDuration <= 0) &&
        Number.isFinite(duration) &&
        duration > 0
      ) {
        setAudioDuration(duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    // Force metadata loading
    audio.load();

    return () => {
      audio.pause();

      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);

      audioRef.current = null;
    };
  }, [audioUrl, actualAudioDuration]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback failed", err);
      });
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleDownload = async () => {
    if (!audioUrl) return;

    const sanitizedFileName = fileName
      .trim()
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
      .replace(/\s+/g, ' ');

    if (!sanitizedFileName) return;

    setIsConverting(true);
    setDownloadError(null);

    try {
      let mp3Blob: Blob;

      if (conversionPromise) {
        console.log("Awaiting background MP3 conversion promise...");
        mp3Blob = await conversionPromise;
      } else {
        let blob = audioBlob;
        if (!blob) {
          console.warn('audioBlob prop not provided to SessionSummary, fetching from audioUrl...');
          const response = await fetch(audioUrl);
          blob = await response.blob();
        }

        if (!blob) {
          throw new Error('Recording audio data is unavailable.');
        }

        // Convert WebM to MP3
        mp3Blob = await convertWebMToMP3(blob, audioDuration);
      }

      // Trigger download of the genuine MP3 blob
      const mp3Url = URL.createObjectURL(mp3Blob);
      const link = document.createElement('a');
      link.href = mp3Url;
      link.download = `${sanitizedFileName}.mp3`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke temporary object URL
      URL.revokeObjectURL(mp3Url);
    } catch (err: any) {
      console.error('MP3 conversion failed:', err);
      setDownloadError(err.message || 'Conversion failed. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

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
    <div className="fixed inset-0 z-50 bg-[#090909] text-[#F5F2EC] pt-40 p-6 flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto">     <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl flex flex-col items-center gap-6"
    >
      {/* Title */}
      <div className="text-center mt-6 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
          className="text-5xl mb-3"
        >
          🎉
        </motion.div>

        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mb-2">
          Session Complete!
        </h1>

        <p className="text-sm font-mono text-[#AAAAAA] uppercase tracking-wider">
          Copy Coach Prompt and Paste into ChatGPT for Feedback
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

      {/* Audio Player Card */}
      {audioUrl && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.35 }}
          className="w-full p-4 rounded-2xl bg-[#141414] border border-white/[0.08] flex flex-col sm:flex-row items-center gap-4 shadow-xl"
        >
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="p-3 rounded-full bg-[#C58A55] text-[#090909] hover:bg-[#D99C66] transition-all cursor-pointer flex items-center justify-center shrink-0 shadow-glow-gold"
            aria-label={isPlaying ? "Pause Recording" : "Play Recording"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Progress Slider and Timing */}
          <div className="flex-1 w-full flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#666666]">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={audioDuration && isFinite(audioDuration) ? audioDuration : speakingTime}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-1 h-1 rounded-lg bg-white/10 appearance-none cursor-pointer accent-[#C58A55] outline-none"
            />
            <span className="text-[11px] font-mono text-[#666666]">
              {formatTime(audioDuration)}
            </span>
          </div>

          {/* Download Button */}
          {/* Filename + Download */}
          <div className="w-full sm:w-auto flex flex-col gap-2 shrink-0">

            <label className="text-[9px] font-mono uppercase tracking-widest text-[#666666]">
              File name
            </label>

            <div className="flex items-center gap-2">

              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                disabled={isConverting}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleDownload();
                  }
                }}
                spellCheck={false}
                className="
        w-full sm:w-72
        px-3 py-2.5
        rounded-xl
        bg-[#0F0F0F]
        border border-white/[0.08]
        focus:border-[#C58A55]/50
        outline-none
        text-xs
        font-mono
        text-[#F5F2EC]
        placeholder:text-[#555555]
        transition-all
      "
                placeholder="Enter file name..."
                aria-label="Audio file name"
              />

              <button
                onClick={handleDownload}
                disabled={!fileName.trim() || isConverting}
                className="
        px-4 py-2.5
        rounded-xl
        bg-[#181818]
        border border-white/[0.08]
        hover:border-[#C58A55]/40
        text-[#F5F2EC]
        hover:text-[#C58A55]
        disabled:opacity-40
        disabled:cursor-not-allowed
        transition-all
        text-xs
        font-mono
        uppercase
        tracking-wider
        flex items-center
        justify-center
        gap-2
        cursor-pointer
        shrink-0
      "
              >
                {isConverting ? (
                  <span className="w-4 h-4 rounded-full border border-white/20 border-t-[#C58A55] animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
              </button>

            </div>

            <span className="text-[9px] font-mono text-[#555555]">
              {isConverting ? (
                <span className="text-[#C58A55] animate-pulse">Converting WebM to genuine MP3...</span>
              ) : downloadError ? (
                <span className="text-[#E05D5D]">{downloadError}</span>
              ) : (
                '.mp3 will be added automatically'
              )}
            </span>

          </div>
        </motion.div>
      )}

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
