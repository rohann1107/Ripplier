import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, X, Mic, Square, Download, Trash2 } from 'lucide-react';
import type { Topic } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface TimerPageProps {
  topic: Topic;
  initialMode?: 'research' | 'speech';
  onClose: () => void;
}

export const TimerPage: React.FC<TimerPageProps> = ({
  topic,
  initialMode = 'research',
  onClose,
}) => {
  // Lock topic on mount so it never changes during timer ticks
  const [activeTopic] = useState<Topic>(topic);

  const [phase, setPhase] = useState<'research' | 'speech'>(initialMode);
  
  // Research duration default 10 min (600s), Speech default 2 min (120s)
  const [researchSecs, setResearchSecs] = useState(600);
  const [speechSecs, setSpeechSecs] = useState(120);
  
  const [timeLeft, setTimeLeft] = useState(initialMode === 'research' ? 600 : 120);
  const [isRunning, setIsRunning] = useState(true);

  // Audio Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [isPlayingRecord, setIsPlayingRecord] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Sync time left when phase or selected preset duration changes
  const handleSelectResearchDuration = (secs: number) => {
    audioEngine.playClickSound();
    setResearchSecs(secs);
    if (phase === 'research') {
      setTimeLeft(secs);
      setIsRunning(false);
    }
  };

  const handleSelectSpeechDuration = (secs: number) => {
    audioEngine.playClickSound();
    setSpeechSecs(secs);
    if (phase === 'speech') {
      setTimeLeft(secs);
      setIsRunning(false);
    }
  };

  const switchPhase = (newPhase: 'research' | 'speech') => {
    audioEngine.playClickSound();
    setIsRunning(false);
    setPhase(newPhase);
    setTimeLeft(newPhase === 'research' ? researchSecs : speechSecs);
  };

  // Stable timer interval loop
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            audioEngine.playTimerEnd();

            if (phase === 'research') {
              setPhase('speech');
              setTimeLeft(speechSecs);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, phase, speechSecs]);

  const toggleTimer = () => {
    audioEngine.playClickSound();
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    audioEngine.playClickSound();
    setIsRunning(false);
    setTimeLeft(phase === 'research' ? researchSecs : speechSecs);
  };

  // Waveform Visualizer
  const drawWaveform = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      analyserRef.current!.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#C58A55');
        gradient.addColorStop(1, '#7CC8F3');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
        x += barWidth + 1;
      }
      animFrameRef.current = requestAnimationFrame(render);
    };
    render();
  };

  const startRecording = async () => {
    audioEngine.playClickSound();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      drawWaveform();

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        stream.getTracks().forEach((t) => t.stop());
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (e) {
      console.error('Microphone error:', e);
    }
  };

  const stopRecording = () => {
    audioEngine.playClickSound();
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const togglePlayback = () => {
    audioEngine.playClickSound();
    if (!audioElementRef.current && recordedUrl) {
      const audio = new Audio(recordedUrl);
      audioElementRef.current = audio;
      audio.onended = () => setIsPlayingRecord(false);
    }
    if (audioElementRef.current) {
      if (isPlayingRecord) {
        audioElementRef.current.pause();
        setIsPlayingRecord(false);
      } else {
        audioElementRef.current.play();
        setIsPlayingRecord(true);
      }
    }
  };

  // Format MM:SS
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formattedTime = `${mins}:${secs.toString().padStart(2, '0')}`;

  const currentDuration = phase === 'research' ? researchSecs : speechSecs;
  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = currentDuration > 0 ? timeLeft / currentDuration : 0;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="fixed inset-0 z-50 bg-[#090909] text-[#F5F2EC] flex flex-col justify-between items-center p-6 sm:p-10 overflow-y-auto animate-fadeIn">
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
          onClick={() => {
            audioEngine.playClickSound();
            onClose();
          }}
          className="p-2.5 rounded-full bg-[#181818] border border-white/[0.1] text-[#AAAAAA] hover:text-[#F5F2EC] cursor-pointer transition-all flex items-center gap-2 text-xs font-mono"
        >
          <X className="w-4 h-4" /> Close
        </button>
      </div>

      {/* Center Topic Header - Fluid Sizing, break-words so never overflows */}
      <div className="w-full max-w-3xl text-center my-4 px-2">
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F2EC] tracking-tight leading-tight break-words">
          "{activeTopic.title}"
        </h1>
      </div>

      {/* Giant Clock Radial Timer Display */}
      <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className="stroke-white/[0.08]"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            className={`transition-all duration-1000 ${
              phase === 'research' ? 'stroke-[#7CC8F3]' : 'stroke-[#C58A55]'
            }`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Giant Numbers */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="font-serif text-6xl sm:text-7xl lg:text-8xl text-[#7CC8F3] tracking-tighter">
            {formattedTime}
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-[#AAAAAA] mt-1">
            {phase === 'research' ? 'Research & Brainstorm.' : 'Speak Now.'}
          </span>
        </div>
      </div>

      {/* Preset Duration Selector */}
      <div className="flex items-center gap-2 bg-[#111111] p-1.5 rounded-full border border-white/[0.08] mb-3">
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
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all border cursor-pointer ${
                  researchSecs === p.secs
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
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all border cursor-pointer ${
                  speechSecs === p.secs
                    ? 'bg-[#C58A55] text-[#090909] font-bold border-[#C58A55]'
                    : 'border-transparent text-[#AAAAAA] hover:text-[#F5F2EC]'
                }`}
              >
                {p.label}
              </button>
            ))}
      </div>

      {/* Waveform & Recorder Controls */}
      <div className="w-full max-w-xl flex flex-col items-center gap-2.5">
        <canvas ref={canvasRef} width={500} height={40} className="w-full h-10 bg-[#111111] rounded-xl border border-white/[0.05]" />
        
        <div className="flex items-center gap-3">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="px-4 py-2 rounded-full bg-[#E05D5D]/15 border border-[#E05D5D]/40 text-[#E05D5D] hover:bg-[#E05D5D] hover:text-white transition-all text-xs font-mono flex items-center gap-2 cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5" /> RECORD SPEECH
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-4 py-2 rounded-full bg-[#E05D5D] text-white transition-all text-xs font-mono flex items-center gap-2 cursor-pointer animate-pulse"
            >
              <Square className="w-3.5 h-3.5 fill-current" /> STOP RECORDING
            </button>
          )}

          {recordedUrl && (
            <>
              <button
                onClick={togglePlayback}
                className="px-4 py-2 rounded-full bg-[#78B26A]/15 border border-[#78B26A]/40 text-[#78B26A] hover:bg-[#78B26A] hover:text-[#090909] text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              >
                {isPlayingRecord ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                PLAYBACK
              </button>
              <a
                href={recordedUrl}
                download={`Speech-${activeTopic.id}.webm`}
                className="p-2 rounded-full bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC]"
              >
                <Download className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => {
                  if (recordedUrl) URL.revokeObjectURL(recordedUrl);
                  setRecordedUrl(null);
                }}
                className="p-2 rounded-full bg-[#181818] border border-white/[0.08] text-[#666666] hover:text-[#E05D5D]"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="flex items-center gap-4 my-3">
        {phase === 'research' ? (
          <button
            onClick={() => switchPhase('speech')}
            className="px-8 py-3 rounded-full bg-[#C58A55] text-[#090909] text-xs font-mono uppercase tracking-wider font-bold shadow-glow-gold hover:opacity-90 cursor-pointer transition-all flex items-center gap-2"
          >
            Done Researching <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={toggleTimer}
            className="px-8 py-3 rounded-full bg-[#C58A55] text-[#090909] text-xs font-mono uppercase tracking-wider font-bold shadow-glow-gold hover:opacity-90 cursor-pointer transition-all flex items-center gap-2"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            {isRunning ? 'PAUSE TIMER' : 'RESUME TIMER'}
          </button>
        )}

        <button
          onClick={resetTimer}
          className="p-3 rounded-full bg-[#181818] border border-white/[0.1] text-[#AAAAAA] hover:text-[#F5F2EC] cursor-pointer"
          title="Reset Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
