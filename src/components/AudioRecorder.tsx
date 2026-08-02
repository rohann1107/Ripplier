import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Download, Trash2, Radio } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface AudioRecorderProps {
  topicTitle?: string;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Clean up recorded audio object URL on unmount
  useEffect(() => {
    return () => {
      if (recordedUrl) URL.revokeObjectURL(recordedUrl);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [recordedUrl]);

  // Visualizer drawing loop
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

      const barWidth = (canvas.width / bufferLength) * 2.5;
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
      setHasPermission(true);

      // Web Audio Analyser setup for waveform
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;

      drawWaveform();

      // MediaRecorder setup
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedUrl(url);

        // Stop stream tracks
        stream.getTracks().forEach((track) => track.stop());

        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
      setHasPermission(false);
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
      audio.onended = () => setIsPlaying(false);
    }

    if (audioElementRef.current) {
      if (isPlaying) {
        audioElementRef.current.pause();
        setIsPlaying(false);
      } else {
        audioElementRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const clearRecording = () => {
    audioEngine.playClickSound();
    if (recordedUrl) URL.revokeObjectURL(recordedUrl);
    setRecordedUrl(null);
    setIsPlaying(false);
    audioElementRef.current = null;
  };

  return (
    <div className="w-full max-w-3xl my-4 p-6 rounded-2xl bg-[#111111] border border-white/[0.08] flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C58A55] tracking-wider">
        <Radio className="w-4 h-4" /> Live Speech Recording & Waveform
      </div>

      {/* Real-time Waveform Canvas */}
      <div className="w-full h-16 bg-[#090909] rounded-xl border border-white/[0.05] overflow-hidden flex items-center justify-center relative">
        <canvas ref={canvasRef} width={600} height={64} className="w-full h-full" />

        {!isRecording && !recordedUrl && (
          <span className="absolute text-xs font-mono text-[#666666]">
            Press Record to practice your speech
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-5 py-2.5 rounded-full bg-[#E05D5D]/15 border border-[#E05D5D]/50 text-[#E05D5D] hover:bg-[#E05D5D] hover:text-white transition-all text-xs font-mono tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Mic className="w-4 h-4" /> RECORD SPEECH
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-5 py-2.5 rounded-full bg-[#E05D5D] text-white transition-all text-xs font-mono tracking-wider flex items-center gap-2 cursor-pointer animate-pulse"
          >
            <Square className="w-4 h-4 fill-current" /> STOP RECORDING
          </button>
        )}

        {recordedUrl && (
          <>
            <button
              onClick={togglePlayback}
              className="px-5 py-2.5 rounded-full bg-[#78B26A]/15 border border-[#78B26A]/40 text-[#78B26A] hover:bg-[#78B26A] hover:text-[#090909] transition-all text-xs font-mono tracking-wider flex items-center gap-2 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              {isPlaying ? 'PAUSE' : 'PLAYBACK'}
            </button>

            <a
              href={recordedUrl}
              download={`Antigravity-Speech-${Date.now()}.webm`}
              className="p-2.5 rounded-full bg-[#181818] border border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC] hover:border-white/[0.2] transition-all cursor-pointer"
              title="Download Audio Recording"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={clearRecording}
              className="p-2.5 rounded-full bg-[#181818] border border-white/[0.08] text-[#666666] hover:text-[#E05D5D] hover:border-[#E05D5D]/30 transition-all cursor-pointer"
              title="Discard Recording"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {hasPermission === false && (
        <p className="text-xs text-[#E05D5D] font-mono">
          Microphone access denied. Please allow microphone permissions in browser settings.
        </p>
      )}
    </div>
  );
};
