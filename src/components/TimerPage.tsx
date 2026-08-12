import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, X, Square } from 'lucide-react';
import type { Topic, FillerWordCount } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { useMediaRecording } from '../hooks/useMediaRecording';
import { saveSession, generateSessionId, calculateWPM, countWords } from '../utils/sessionStore';
import { SessionSummary } from './SessionSummary';
import { TranscriptView } from './TranscriptView';
import { transcriptionService } from '../utils/transcriptionService';
import { convertWebMToMP3 } from '../utils/mp3Converter';

interface TimerPageProps {
  topic: Topic;
  initialMode?: 'research' | 'speech';
  onClose: () => void;
}

type TimerView = 'timer' | 'summary' | 'transcript';

const FILLER_WORDS = [
  "uh",
  "um",
  "er",
  "erm",
  "ah",
  "eh",
  "hmm",
  "mm",
  "mmm",

  "like",
  "actually",
  "basically",
  "literally",
  "obviously",
  "seriously",
  "simply",
  "technically",
  "honestly",
  "frankly",
  "clearly",
  "apparently",
  "probably",
  "possibly",
  "maybe",
  "perhaps",
  "kind of",
  "sort of",
  "more or less",
  "or something",
  "and stuff",
  "and things",
  "whatever",
  "you know",
  "I mean",
  "well",
  "so",
  "right",
  "okay",
  "ok",
  "alright",
  "anyway",
  "anyways",
  "now",
  "then",
  "see",
  "look",
  "listen",

  "to be honest",
  "honestly speaking",
  "at the end of the day",
  "as I said",
  "as you know",
  "believe me",
  "you see",
  "if you will",
  "in a way",
  "for example",
  "for instance",
  "in fact",
  "I think",
  "I guess",
  "I suppose",
  "I believe",
  "I would say",
  "I would like to say",
  "I feel like",
  "I don't know",
  "you know what I mean",
  "if that makes sense",
  "let me think",
  "let me see",
  "how can I say",
  "what I mean is",
  "the thing is",
  "the point is",
  "you could say",
  "to some extent",
  "more importantly",
  "generally speaking",
  "to be fair",
  "to be precise",
  "to be specific",
  "as a matter of fact",
  "on the other hand",
  "at least",
  "in my opinion",
  "from my perspective"
];

export const TimerPage: React.FC<TimerPageProps> = ({
  topic,
  initialMode = 'research',
  onClose,
}) => {
  const [activeTopic] = useState<Topic>(topic);
  const [phase, setPhase] = useState<'research' | 'speech'>(initialMode);
  const [timerView, setTimerView] = useState<TimerView>('timer');

  const [researchSecs, setResearchSecs] = useState(600);
  const [speechSecs, setSpeechSecs] = useState(120);

  const [timeLeft, setTimeLeft] = useState(
    initialMode === "research" ? 600 : 120
  );

  const [isRunning, setIsRunning] = useState(false);
  const [isRecordEnabled, setIsRecordEnabled] = useState(true);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const pendingExitActionRef = useRef<(() => void) | null>(null);
  const isProgrammaticBackRef = useRef(false);

  // Sync TimerPage history states on mount
  useEffect(() => {
    window.history.pushState({ page: 'research-timer' }, '', '');
    if (initialMode === 'speech') {
      window.history.pushState({ page: 'speech-timer' }, '', '');
    }
  }, [initialMode]);

  // Sync phase change with history push
  useEffect(() => {
    if (phase === 'speech' && initialMode !== 'speech') {
      window.history.pushState({ page: 'speech-timer' }, '', '');
    }
  }, [phase, initialMode]);

  const mediaRecording = useMediaRecording();

  const mediaRecordingStopRef = useRef(mediaRecording.stop);
  useEffect(() => {
    mediaRecordingStopRef.current = mediaRecording.stop;
  }, [mediaRecording.stop]);

  const [sessionTranscript, setSessionTranscript] = useState("");
  const [sessionFillerWords, setSessionFillerWords] = useState<FillerWordCount[]>([]);

  // Local Whisper transcription states
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [transcribePercent, setTranscribePercent] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const recordedBlobRef = useRef<Blob | null>(null);
  const conversionPromiseRef = useRef<Promise<Blob> | null>(null);

  // Smooth asymptotic percentage animation
  useEffect(() => {
    if (!isTranscribing || isModelLoading || isFinishing) {
      if (!isTranscribing) {
        setTranscribePercent(0);
      }
      return;
    }

    let animId: number;
    let currentPercent = 0;

    const tick = () => {
      // Decelerate smoothly as we approach 92%
      const delta = (92 - currentPercent) * 0.035;
      currentPercent += Math.max(0.05, delta);
      setTranscribePercent(Math.floor(currentPercent));

      if (currentPercent < 92) {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isTranscribing, isModelLoading, isFinishing]);



  const [speechStartTime, setSpeechStartTime] = useState<number | null>(null);
  const [totalSpeechDuration, setTotalSpeechDuration] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  /* ---------------- PROFESSIONAL TIMER ENGINE ---------------- */

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const endTimeRef = useRef<number>(0);

  const pausedRemainingRef = useRef<number>(0);

  const timerStartedRef = useRef(false);

  const lastTickRef = useRef(0);

  const pauseStartedRef = useRef<number | null>(null);

  const totalPausedMsRef = useRef(0);

  /* ----------------------------------------------------------- */

  const handleSelectResearchDuration = useCallback((secs: number) => {
    audioEngine.playClickSound();

    // Stop any running timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    timerStartedRef.current = false;
    pausedRemainingRef.current = 0;
    endTimeRef.current = 0;
    totalPausedMsRef.current = 0;
    pauseStartedRef.current = null;

    setResearchSecs(secs);

    if (phase === "research") {
      setIsRunning(false);
      setTimeLeft(secs);
    }
  }, [phase]);

  const continueSpeechAnyway = useCallback(async () => {

    try {
      mediaRecording.reset();
      recordedBlobRef.current = null;
      conversionPromiseRef.current = null;
      setTranscriptionError(null);

      totalPausedMsRef.current = 0;
      pauseStartedRef.current = null;

      const now = Date.now();

      setSpeechStartTime(now);

      pausedRemainingRef.current = speechSecs;
      endTimeRef.current = now + speechSecs * 1000;
      timerStartedRef.current = true;

      if (isRecordEnabled) {
        await mediaRecording.start();
      }

      setTimeLeft(speechSecs);
      setIsRunning(true);

    } catch (err) {
      console.error(err);
    }

  }, [speechSecs, mediaRecording, isRecordEnabled]);

  const handleSelectSpeechDuration = useCallback((secs: number) => {
    audioEngine.playClickSound();

    // Stop any running timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    timerStartedRef.current = false;
    pausedRemainingRef.current = 0;
    endTimeRef.current = 0;
    totalPausedMsRef.current = 0;
    pauseStartedRef.current = null;

    setSpeechSecs(secs);

    if (phase === "speech") {
      setIsRunning(false);
      setTimeLeft(secs);

      mediaRecording.reset();
      recordedBlobRef.current = null;
      conversionPromiseRef.current = null;

      setSpeechStartTime(null);
      setTotalSpeechDuration(0);
    }
  }, [phase, mediaRecording]);

  const handleResearchComplete = useCallback(() => {
    audioEngine.playClickSound();
    setIsRunning(false);
    timerStartedRef.current = false;
    setPhase('speech');
    setTimeLeft(speechSecs);

    mediaRecording.reset();
    recordedBlobRef.current = null;
    conversionPromiseRef.current = null;
  }, [speechSecs, mediaRecording]);

  // Start Speech: starts both the countdown timer and the microphone recording/transcription
  const handleStartSpeech = useCallback(async () => {
    audioEngine.playClickSound();

    // Feature detect capabilities
    if (
      typeof window === 'undefined' ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia ||
      typeof MediaRecorder === 'undefined'
    ) {
      setTranscriptionError("Audio recording is not supported in this browser. Please use Chrome or Safari.");
      return;
    }

    if (typeof WebAssembly === 'undefined') {
      setTranscriptionError("Local transcription requires WebAssembly, which is not supported by your browser.");
      return;
    }

    continueSpeechAnyway();
  }, [continueSpeechAnyway]);



  const toggleTimer = useCallback(async () => {
    audioEngine.playClickSound();

    if (phase === "research") {
      setIsRunning(prev => !prev);
      return;
    }

    const isSpeechActive = isRecordEnabled ? mediaRecording.isRecording : timerStartedRef.current;

    if (!isSpeechActive) {
      handleStartSpeech();
      return;
    }

    if (isRunning) {

      // ----- PAUSE -----

      pauseStartedRef.current = Date.now();

      pausedRemainingRef.current = timeLeft;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      setIsRunning(false);

      if (isRecordEnabled) {
        mediaRecording.pause();
      }

    } else {

      // ----- RESUME -----

      if (pauseStartedRef.current) {
        totalPausedMsRef.current += Date.now() - pauseStartedRef.current;
      }

      pauseStartedRef.current = null;

      endTimeRef.current =
        Date.now() + pausedRemainingRef.current * 1000;

      setIsRunning(true);

      if (isRecordEnabled) {
        mediaRecording.resume();
      }
    }

  }, [
    phase,
    isRunning,
    timeLeft,
    mediaRecording,
    handleStartSpeech,
    isRecordEnabled,
  ]);

  const resetTimer = () => {

    audioEngine.playClickSound();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    timerStartedRef.current = false;
    pausedRemainingRef.current = 0;
    endTimeRef.current = 0;
    totalPausedMsRef.current = 0;
    pauseStartedRef.current = null;

    setIsRunning(false);

    setTimeLeft(
      phase === "research"
        ? researchSecs
        : speechSecs
    );

    if (phase === "speech") {

      mediaRecording.reset();
      recordedBlobRef.current = null;
      conversionPromiseRef.current = null;
      setTranscriptionError(null);

      setSpeechStartTime(null);
      setTotalSpeechDuration(0);
    }
  };
  const performTranscription = useCallback(async (audioBlob: Blob, duration: number, skipSummary?: boolean) => {
    if (!skipSummary) {
      setIsTranscribing(true);
      setTranscriptionError(null);
      setIsFinishing(false);
      setTranscribePercent(0);
    }

    const modelReady = transcriptionService.isReady();
    if (!skipSummary) {
      setIsModelLoading(!modelReady);
      if (!modelReady) {
        setLoadingMessage("Preparing transcription…");
      } else {
        setLoadingMessage("");
      }
    }

    if (!skipSummary) {
      transcriptionService.setProgressCallback((progress) => {
        if (progress.status === 'loading') {
          setIsModelLoading(true);
          setLoadingMessage(progress.message);
        } else if (progress.status === 'ready') {
          setIsModelLoading(false);
          setLoadingMessage('');
        } else if (progress.status === 'transcribing') {
          setIsModelLoading(false);
          setLoadingMessage(progress.message);
        } else if (progress.status === 'error') {
          setIsModelLoading(false);
          setIsTranscribing(false);
          setTranscriptionError(progress.message);
        }
      });
    }

    try {
      const text = await transcriptionService.transcribe(audioBlob);

      if (!skipSummary) {
        // Smoothly animate progress bar to 100% before transitioning
        setIsFinishing(true);

        await new Promise<void>((resolve) => {
          let startPercent = 0;
          setTranscribePercent((prev) => {
            startPercent = prev;
            return prev;
          });

          const durationMs = 350; // Animate to 100% in 350ms
          const startTime = performance.now();

          const anim = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / durationMs);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = startPercent + (100 - startPercent) * eased;

            setTranscribePercent(Math.floor(current));

            if (progress < 1) {
              requestAnimationFrame(anim);
            } else {
              setTranscribePercent(100);
              setTimeout(resolve, 200); // Hold 100% momentarily for luxury feeling
            }
          };
          requestAnimationFrame(anim);
        });

        setSessionTranscript(text);
      }

      const lowerTranscript = text.toLowerCase();
      const fillerCounts: FillerWordCount[] = [];

      for (const word of FILLER_WORDS) {
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`\\b${escaped}\\b`, "gi");
        const matches = lowerTranscript.match(regex);
        if (matches && matches.length > 0) {
          fillerCounts.push({
            word,
            count: matches.length,
          });
        }
      }

      if (!skipSummary) {
        setSessionFillerWords(fillerCounts);
      }
      const wordCount = countWords(text);
      const wpm = calculateWPM(text, duration);

      saveSession({
        id: generateSessionId(),
        topic: activeTopic.title,
        topicCategory: activeTopic.category,
        date: new Date().toISOString(),
        duration,
        transcript: text,
        wordsPerMinute: wpm,
        totalWords: wordCount,
        fillerWords: fillerCounts,
      });

      if (!skipSummary) {
        setTimerView("summary");
      }
    } catch (err) {
      console.error('Local transcription failed:', err);
      // Stay on current page, error state handled via overlay
    } finally {
      if (!skipSummary) {
        setIsTranscribing(false);
        setIsFinishing(false);
      }
    }
  }, [activeTopic]);

  const handleRetryTranscription = async () => {
    if (recordedBlobRef.current) {
      await performTranscription(recordedBlobRef.current, totalSpeechDuration);
    }
  };

  const handleDoneSpeaking = useCallback(async (options?: { skipSummary?: boolean }) => {
    audioEngine.playClickSound();
    setIsRunning(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    timerStartedRef.current = false;
    endTimeRef.current = 0;
    pausedRemainingRef.current = 0;

    const duration = speechStartTime
      ? Math.max(
        1,
        Math.round(
          (Date.now() -
            speechStartTime -
            totalPausedMsRef.current) /
          1000
        )
      )
      : speechSecs - timeLeft;

    console.log(`[Audio] Recording timer duration: ${duration} seconds`);
    if (!options?.skipSummary) {
      setTotalSpeechDuration(duration);
    }

    if (!isRecordEnabled) {
      // Just save a simplified session and go to summary!
      saveSession({
        id: generateSessionId(),
        topic: activeTopic.title,
        topicCategory: activeTopic.category,
        date: new Date().toISOString(),
        duration,
        transcript: "",
        wordsPerMinute: 0,
        totalWords: 0,
        fillerWords: [],
      });
      if (!options?.skipSummary) {
        setSessionTranscript("");
        setSessionFillerWords([]);
        setTimerView("summary");
      }
      return;
    }

    const blob = await mediaRecording.stop();
    recordedBlobRef.current = blob;

    const actualDuration = (blob as any).actualDuration;

    // Start background MP3 conversion immediately!
    console.log("Starting background WebM to MP3 conversion...");
    conversionPromiseRef.current = convertWebMToMP3(blob, actualDuration).catch(err => {
      console.error("Background MP3 conversion failed:", err);
      throw err;
    });

    // Trigger local Whisper transcription
    await performTranscription(blob, duration, options?.skipSummary);

  }, [
    speechSecs,
    timeLeft,
    speechStartTime,
    mediaRecording.stop,
    performTranscription,
    isRecordEnabled,
    activeTopic,
  ]);

  // Listen for back button / popstate events to implement smart back behavior
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();

      if (isProgrammaticBackRef.current) {
        isProgrammaticBackRef.current = false;
        if (pendingExitActionRef.current) {
          const action = pendingExitActionRef.current;
          pendingExitActionRef.current = null;
          action();
        }
        return;
      }

      if (showExitConfirm) {
        window.history.pushState({ page: phase === 'speech' ? 'speech-timer' : 'research-timer' }, '', '');
        return;
      }

      if (phase === 'speech') {
        const isTimerActive = isRunning || mediaRecording.isRecording || mediaRecording.isPaused;

        if (isTimerActive && timerView === 'timer') {
          setShowExitConfirm(true);
          pendingExitActionRef.current = () => {
            handleDoneSpeaking({ skipSummary: true });
            setPhase('research');
            setTimeLeft(researchSecs);
            setIsRunning(false);
            setTimerView('timer');
          };
          window.history.pushState({ page: 'speech-timer' }, '', '');
        } else {
          setPhase('research');
          setTimeLeft(researchSecs);
          setIsRunning(false);
          setTimerView('timer');
        }
      } else if (phase === 'research') {
        const isTimerActive = isRunning || timeLeft < researchSecs;

        if (isTimerActive && timerView === 'timer') {
          setShowExitConfirm(true);
          pendingExitActionRef.current = () => {
            onClose();
          };
          window.history.pushState({ page: 'research-timer' }, '', '');
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [phase, isRunning, timeLeft, researchSecs, mediaRecording.isRecording, mediaRecording.isPaused, handleDoneSpeaking, onClose, timerView, showExitConfirm]);

  const handleClose = () => {
    audioEngine.playClickSound();
    if (timerView !== 'timer') {
      isProgrammaticBackRef.current = true;
      window.history.go(-2);
      onClose();
    } else {
      window.history.back();
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

      mediaRecordingStopRef.current();
    };
  }, []);

  // Using a clean effect that correctly handles setInterval ticking down by referencing
  // the state value directly or decrementing it safely.

  /* ===========================================================
   RESEARCH TIMER
=========================================================== */
  useEffect(() => {

    if (phase !== "research") return;

    if (!isRunning) {

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

  }, [
    phase,
    isRunning,
  ]);

  // Handle research completion side effects when timeLeft reaches 0
  useEffect(() => {
    if (phase === "research" && isRunning && timeLeft === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRunning(false);
      audioEngine.playTimerEnd();
      handleResearchComplete();
    }
  }, [timeLeft, phase, isRunning, handleResearchComplete]);
  /* ===========================================================
   SPEECH TIMER
=========================================================== */
  useEffect(() => {

    if (phase !== "speech") return;

    if (!isRunning || !timerStartedRef.current) {

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      return;
    }

    intervalRef.current = setInterval(() => {

      const now = Date.now();

      const remaining = Math.max(
        0,
        Math.ceil(
          (endTimeRef.current - now) / 1000
        )
      );

      if (remaining !== lastTickRef.current) {

        lastTickRef.current = remaining;

        setTimeLeft(remaining);

      }

      if (remaining <= 0) {

        clearInterval(intervalRef.current!);

        intervalRef.current = null;

        setIsRunning(false);

        audioEngine.playTimerEnd();

        handleDoneSpeaking();

      }

    }, 100);

    return () => {

      if (intervalRef.current) {

        clearInterval(intervalRef.current);

        intervalRef.current = null;

      }

    };

  }, [
    phase,
    isRunning,
    handleDoneSpeaking,
  ]);
  useEffect(() => {
    if (!mediaRecording.analyserNode || !canvasRef.current || !mediaRecording.isRecording || mediaRecording.isPaused) {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = mediaRecording.analyserNode;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
    gradient.addColorStop(0, '#C58A55');
    gradient.addColorStop(1, '#7CC8F3');

    const render = () => {
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
        x += barWidth + 1;
      }
      animFrameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [mediaRecording.analyserNode, mediaRecording.isRecording, mediaRecording.isPaused]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const isSpeechActive = isRecordEnabled ? mediaRecording.isRecording : timerStartedRef.current;

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formattedTime =
    `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const currentDuration = phase === 'research' ? researchSecs : speechSecs;
  const radius = 160;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = currentDuration > 0 ? timeLeft / currentDuration : 0;
  const strokeDashoffset = circumference - progressRatio * circumference;

  const handleCopyPromptWithTranscript = () => {
    const promptText = `I will provide a transcript of my spoken speech.

Analyze it as a communication coach.

Please evaluate ONLY these sections:

## 1. Grammar
- Point out all grammar mistakes.
- Show the original sentence.
- Show the corrected sentence.

---

## 2. Vocabulary
- Evaluate the richness and appropriateness of my vocabulary.
- Suggest better words or phrases where applicable.
- Mention any repetitive or weak vocabulary.

---

## 3. Improved Version
- Rewrite my entire speech.
- Preserve my original meaning and ideas.
- Only improve grammar, sentence structure, clarity, flow, and vocabulary.
- Do not add new ideas or remove important points.

The topic I was asked to speak about was:

"${activeTopic.title}"

Here is my speech transcript:

"${sessionTranscript}"`;

    audioEngine.playClickSound();
    navigator.clipboard.writeText(promptText);
  };

  if (timerView === 'summary') {
    const wordCount = countWords(sessionTranscript);
    const wpm = calculateWPM(sessionTranscript, totalSpeechDuration);

    return (
      <SessionSummary
        speakingTime={totalSpeechDuration}
        totalWords={wordCount}
        wpm={wpm}
        topicTitle={activeTopic.title}
        fillerWords={sessionFillerWords}
        onViewTranscript={() => setTimerView('transcript')}
        onPracticeAgain={() => {
          audioEngine.playClickSound();
          isProgrammaticBackRef.current = true;
          window.history.go(-2);
          onClose();
        }}
        onCopyTranscript={handleCopyPromptWithTranscript}
        audioUrl={mediaRecording.audioUrl}
        audioBlob={mediaRecording.audioBlob}
        conversionPromise={conversionPromiseRef.current}
        actualAudioDuration={mediaRecording.audioDuration}
        isRecordEnabled={isRecordEnabled}
      />
    );
  }

  if (timerView === 'transcript') {
    return (
      <TranscriptView
        transcript={sessionTranscript}
        topicTitle={activeTopic.title}
        onBack={() => setTimerView('summary')}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#090909] text-[#F5F2EC] flex flex-col justify-between items-center p-4 sm:p-6 lg:p-10 overflow-y-auto animate-fadeIn">
      {/* Top Header */}
      <div className="w-full max-w-4xl flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C58A55]">
            {activeTopic.category} • {activeTopic.difficulty}
          </span>
          <span className="text-xs font-mono uppercase text-[#7CC8F3] tracking-widest mt-0.5">
            {phase === 'research' ? 'RESEARCHING' : 'SPEAKING LIVE'}
          </span>
        </div>

        <button
          onClick={handleClose}
          className="p-2.5 rounded-full bg-[#181818] border border-white/[0.1] text-[#AAAAAA] hover:text-[#F5F2EC] cursor-pointer transition-all flex items-center gap-2 text-xs font-mono"
        >
          <X className="w-4 h-4" /> Close
        </button>
      </div>

      {/* Unified Center Content */}
      <div className="flex-1 w-full max-w-md sm:max-w-4xl flex flex-col items-center justify-center gap-10 sm:gap-6 my-auto py-4">

        {/* Center Topic Header */}
        <div className="w-full text-center px-2 animate-scale-up">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-7xl text-[#F5F2EC] tracking-tighter leading-[1.05] break-words font-medium">
            "{activeTopic.title}"
          </h1>
        </div>

        {/* Giant Clock Radial Timer Display */}
        <div className="relative flex items-center justify-center shrink-0 my-5 sm:my-3" style={{ width: 'min(78vw, 290px)', height: 'min(78vw, 290px)' }}>
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 360 360">
            <circle
              cx="180"
              cy="180"
              r={radius}
              className="stroke-white/[0.08]"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="180"
              cy="180"
              r={radius}
              className={`transition-all duration-1000 ${phase === 'research' ? 'stroke-[#7CC8F3]' : 'stroke-[#C58A55]'
                }`}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-serif text-[#AAAAAA] tracking-tighter" style={{
              fontSize: 'clamp(5.5rem, 15vw, 6.8rem)',
              lineHeight: 1,
            }}>
              {formattedTime}
            </span>
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#AAAAAA] mt-1">
              {phase === 'research' ? 'Research & Brainstorm.' : 'Speak Now.'}
            </span>
          </div>
        </div>

        {/* Preset Duration Selector */}
        <div className="flex items-center gap-2 bg-[#111111] p-1.5 rounded-full border border-white/[0.08] flex-wrap justify-center shrink-0">
          {phase === 'research'
            ? [
              { label: '5m', secs: 300 },
              { label: '10m', secs: 600 },
              { label: '15m', secs: 900 },
              { label: '20m', secs: 1200 },
            ].map((p) => (
              <button
                key={p.secs}
                onClick={() => handleSelectResearchDuration(p.secs)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all border cursor-pointer ${researchSecs === p.secs
                  ? 'bg-[#7CC8F3] text-[#090909] font-bold border-[#7CC8F3]'
                  : 'border-transparent text-[#AAAAAA] hover:text-[#F5F2EC]'
                  }`}
              >
                {p.label}
              </button>
            ))
            : [
              { label: '1m', secs: 60 },
              { label: '2m', secs: 120 },
              { label: '3m', secs: 180 },
              { label: '5m', secs: 300 },
              { label: '10m', secs: 600 },
            ].map((p) => (
              <button
                key={p.secs}
                onClick={() => handleSelectSpeechDuration(p.secs)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all border cursor-pointer ${speechSecs === p.secs
                  ? 'bg-[#C58A55] text-[#090909] font-bold border-[#C58A55]'
                  : 'border-transparent text-[#AAAAAA] hover:text-[#F5F2EC]'
                  }`}
              >
                {p.label}
              </button>
            ))}
        </div>

        {/* Speech Phase: Waveform or Text Prompt */}
        {phase === 'speech' && isSpeechActive && (
          <div className="w-full max-w-xl flex flex-col items-center gap-2.5 shrink-0">
            {isRecordEnabled ? (
              <>
                <canvas ref={canvasRef} width={500} height={40} className="w-full h-15 bg-[#111111] rounded-xl border border-white/[0.05]" />

                {mediaRecording.isRecording && !mediaRecording.isPaused && (
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E05D5D]">
                    <div className="w-2 h-2 rounded-full bg-[#E05D5D] animate-pulse" />
                    Recording...
                    <div className="flex items-center gap-2 text-xs font-mono text-white">
                      <div className="w-2 h-2 rounded-full bg-[#7CC8F3] animate-pulse" />
                      Live Transcripting... </div>
                  </div>
                )}
                {mediaRecording.isPaused && (
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E0A85D]">
                    <div className="w-2 h-2 rounded-full bg-[#E0A85D]" />
                    Paused
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-4 px-6 rounded-2xl bg-[#111111] border border-white/[0.05] w-full animate-fadeIn flex flex-col gap-1 items-center justify-center">
                <span className="text-sm font-mono text-[#7CC8F3] uppercase tracking-wider font-semibold">
                  Start your speech now
                </span>
                <span className="text-[10px] font-mono text-[#AAAAAA] uppercase tracking-widest">
                  Focus on your pacing and presentation
                </span>
              </div>
            )}
          </div>
        )}

        {/* Speech Controls Container */}
        <div className={`flex flex-col items-center justify-center gap-[26px] sm:gap-[20px] w-full shrink-0 ${
          phase === 'research' ? 'mt-2.5 sm:mt-[20px]' : ''
        }`}>

          {/* Speech Phase Toggle */}
          {phase === 'speech' && !timerStartedRef.current && (
            <div className="flex items-center justify-between gap-4
                w-[calc(100vw-32px)] sm:w-full sm:max-w-md
                bg-[#111111]/90
                px-5 sm:px-6
                py-4 sm:py-3.5
                rounded-2xl
                border border-white/[0.08]
                transition-all">

              <div className="flex flex-col min-w-0">
                <span className="text-[12px] sm:text-[11px] font-mono text-[#F5F2EC] uppercase tracking-wider font-semibold whitespace-nowrap">
                  Record & Transcribe Speech
                </span>

                <span className="text-[8px] sm:text-[9px] font-mono text-[#AAAAAA] uppercase tracking-widest mt-0.5 whitespace-nowrap">
                  {isRecordEnabled
                    ? 'Microphone & AI Coach enabled'
                    : 'Timer only (Offline / No recording)'}
                </span>
              </div>

              {/* Record Toggle (Apple Style Capsule Switch) */}
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  setIsRecordEnabled(prev => !prev);
                }}
                style={{
                  boxShadow: isRecordEnabled
                    ? '0 0 20px rgba(120, 178, 106, 0.25)'
                    : 'none',
                }}
                className={`relative shrink-0
                  w-20 h-6 sm:w-12 sm:h-7
                  rounded-full
                  transition-all duration-300
                  outline-none cursor-pointer border
                  ${isRecordEnabled
                    ? 'bg-[#78B26A]/20 border-[#78B26A]/45'
                    : 'bg-[#181818] border-white/[0.08]'
                  }`}
                aria-label="Toggle recording and transcription"
              >
                <div
                  className={`absolute
                    top-0.5 left-0.5
                    w-10 h-10 sm:w-5 sm:h-5
                    rounded-full
                    transition-all duration-300
                    ${isRecordEnabled
                      ? 'translate-x-9 sm:translate-x-6 bg-[#78B26A]'
                      : 'bg-[#666666]'
                    }`}
                />
              </button>

            </div>
          )}

          {/* Main Action Buttons */}
          <div className="flex items-center justify-center gap-[17px] sm:gap-4 w-full">

            {phase === 'research' ? (
              <>
                <button
                  onClick={toggleTimer}
                  className="px-6 sm:px-5 py-3 rounded-full bg-[#C58A55] text-[#090909] text-xs font-mono uppercase tracking-wider font-bold shadow-glow-gold hover:opacity-90 cursor-pointer transition-all flex items-center gap-2"
                >
                  {isRunning ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                  {isRunning ? 'PAUSE TIMER' : 'START TIMER'}
                </button>

                <button
                  onClick={handleResearchComplete}
                  className="px-6 sm:px-8 py-3 rounded-full bg-[#181818] border border-white/[0.1] text-[#F5F2EC] text-xs font-mono uppercase tracking-wider font-bold hover:opacity-90 cursor-pointer transition-all flex items-center gap-2"
                >
                  Skip Research <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                {!isSpeechActive ? (
                  <button
                    onClick={handleStartSpeech}
                    className="px-6 sm:px-8 py-3 rounded-full bg-[#E05D5D] text-white text-xs font-mono uppercase tracking-wider font-bold shadow-lg hover:opacity-90 cursor-pointer transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    {isRecordEnabled ? 'START SPEECH' : 'START TIMER'}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={toggleTimer}
                      className="px-6 sm:px-8 py-3 rounded-full bg-[#C58A55] text-[#090909] text-xs font-mono uppercase tracking-wider font-bold shadow-glow-gold hover:opacity-90 cursor-pointer transition-all flex items-center gap-2"
                    >
                      {isRunning ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 fill-current" />
                      )}
                      {isRunning ? 'PAUSE' : 'RESUME TIMER'}
                    </button>

                    <button
                      onClick={() => handleDoneSpeaking()}
                      className="px-6 sm:px-8 py-3 rounded-full bg-[#78B26A] text-[#090909] text-xs font-mono uppercase tracking-wider font-bold hover:opacity-90 cursor-pointer transition-all flex items-center gap-2"
                    >
                      <Square className="w-4 h-4 fill-current" />
                      {isRecordEnabled ? 'Done Speaking' : 'Finish'}
                    </button>
                  </>
                )}
              </>
            )}

            {isSpeechActive && (
              <button
                onClick={resetTimer}
                className="p-3 rounded-full bg-[#181818] border border-white/[0.1] text-[#AAAAAA] hover:text-[#F5F2EC] cursor-pointer animate-fadeIn"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

          </div>
        </div>

      </div>

      {/* Local Whisper Transcription Overlays */}
      {
        isTranscribing && (
          <div className="fixed inset-0 z-[100] bg-[#090909]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in select-none">
            <div className="w-full max-w-md p-8 rounded-3xl bg-[#111111] border border-white/[0.08] shadow-[0_0_50px_-12px_rgba(197,138,85,0.15)] relative overflow-hidden animate-scale-up">
              {/* Ambient gold glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C58A55]/[0.08] rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

              <div className="relative z-10 flex flex-col items-center gap-8 py-4">
                {/* Header */}
                <div className="space-y-1">
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F2EC] tracking-tight leading-tight">
                    {isModelLoading ? 'Preparing' : 'Transcribing'}
                  </h3>
                  <p className="font-serif text-3xl sm:text-4xl text-[#F5F2EC]/80 tracking-tight leading-tight italic">
                    {isModelLoading ? 'transcription…' : 'your speech'}
                  </p>
                </div>

                {/* Progress Percentage Display */}
                <div className="my-2">
                  <span className="font-serif text-6xl md:text-7xl font-normal text-[#C58A55] tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(197,138,85,0.25)]">
                    {isModelLoading ? '...' : `${transcribePercent}%`}
                  </span>
                </div>

                {/* Premium Progress Bar */}
                <div className="w-full px-4">
                  <div className="w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#C58A55] to-[#D4995F] shadow-[0_0_8px_#C58A55] rounded-full transition-all duration-300 ease-out"
                      style={{ width: isModelLoading ? '15%' : `${transcribePercent}%` }}
                    />
                  </div>
                </div>

                {/* Sub-status Message */}
                <div className="min-h-[20px]">
                  <p className="text-xs font-mono text-[#AAAAAA] uppercase tracking-widest animate-pulse">
                    {isModelLoading
                      ? (loadingMessage || 'Configuring local speech engine...')
                      : (isFinishing ? 'Transcript Ready' : 'Analyzing your recording...')}
                  </p>
                </div>

                {/* Privacy/Offline Footer Notice */}
                <p className="text-[10px] text-[#666666] leading-relaxed max-w-xs mt-2">
                  Please wait while we transcribe your speech…
                </p>
              </div>
            </div>
          </div>
        )
      }

      {
        transcriptionError && (
          <div className="fixed inset-0 z-[100] bg-[#090909]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-full max-w-md p-8 rounded-3xl bg-[#111111] border border-white/[0.08] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E05D5D]/[0.05] rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="text-4xl">⚠️</div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-[#F5F2EC]">
                    Offline Transcription Alert
                  </h3>
                  <p className="text-xs text-[#E05D5D] font-mono uppercase tracking-wider">
                    {transcriptionError}
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 w-full">
                  {recordedBlobRef.current && (
                    <button
                      onClick={handleRetryTranscription}
                      className="w-full py-3 rounded-xl bg-[#C58A55] text-[#090909] text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#D99C66] transition-all cursor-pointer shadow-glow-gold"
                    >
                      Retry Transcription
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSessionTranscript("");
                      setTimerView("summary");
                      setTranscriptionError(null);
                    }}
                    className="w-full py-3 rounded-xl bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Skip to Summary
                  </button>
                </div>
                <p className="text-[10px] text-[#666666] leading-relaxed max-w-xs">
                  Your audio recording remains fully available for playback and download.
                </p>
              </div>
            </div>
          </div>
        )
      }

      {
        showExitConfirm && (
          <div className="fixed inset-0 z-[110] bg-[#090909]/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/[0.1] shadow-2xl relative space-y-6 text-center animate-fadeIn">
              <h3 className="font-serif text-2xl text-[#F5F2EC] leading-snug">
                Do you want to end this session here?
              </h3>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    setShowExitConfirm(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC] cursor-pointer font-mono text-xs uppercase tracking-wider transition-all animate-fadeIn"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    setShowExitConfirm(false);
                    isProgrammaticBackRef.current = true;
                    window.history.back();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#E05D5D] text-white hover:opacity-90 cursor-pointer font-mono text-xs uppercase tracking-wider transition-all animate-fadeIn"
                >
                  End Session
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};
