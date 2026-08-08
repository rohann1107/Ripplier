import { pipeline, env } from '@huggingface/transformers';

// Configure environment for browser
env.allowLocalModels = false;

export interface TranscriptionProgress {
  status: 'idle' | 'loading' | 'ready' | 'transcribing' | 'done' | 'error';
  message: string;
  progress?: number;
}
export function sanitizePathologicalHallucinations(
  text: string,
  durationSec: number
): string {
  const trimmed = text.trim();

  if (!trimmed) return "";

  // Ignore very short audio only when the output is clearly suspicious.
  if (durationSec < 1.5 && trimmed.length > 80) {
    console.warn(
      `[TRANSCRIPTION SAFETY] Suspicious output for very short audio (${durationSec.toFixed(1)}s).`
    );
    return "Unable to confidently transcribe this portion.";
  }

  // Only flag extremely unrealistic character rates.
  // This is intentionally generous so normal fast speech is not rejected.
  const charsPerSec = trimmed.length / Math.max(durationSec, 0.5);

  if (durationSec > 1 && charsPerSec > 100) {
    console.warn(
      `[TRANSCRIPTION SAFETY] Extremely high character rate: ${charsPerSec.toFixed(
        1
      )} chars/sec.`
    );
    return "Unable to confidently transcribe this portion.";
  }

  // Detect obvious repeated-character hallucinations.
  const repeatSingle = /(.)\1{7,}/i;
  const repeatDouble = /([a-zA-Z]{2})\1{5,}/i;
  const repeatTriple = /([a-zA-Z]{3})\1{4,}/i;
  const repeatQuad = /([a-zA-Z]{4,})\1{3,}/i;

  const hasCharacterHallucination =
    repeatSingle.test(trimmed) ||
    repeatDouble.test(trimmed) ||
    repeatTriple.test(trimmed) ||
    repeatQuad.test(trimmed);

  // Only reject if the repetition is extreme.
  if (hasCharacterHallucination && trimmed.length > 60) {
    console.warn(
      `[TRANSCRIPTION SAFETY] Strong character repetition detected.`
    );
    return "Unable to confidently transcribe this portion.";
  }

  // Detect extreme repeated words, but allow natural repetition.
  const words = trimmed
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 1);

  if (words.length >= 12) {
    const uniqueWords = new Set(words);
    const uniqueRatio = uniqueWords.size / words.length;

    // Much softer threshold than before.
    if (uniqueRatio < 0.2) {
      console.warn(
        `[TRANSCRIPTION SAFETY] Strong word repetition detected: ratio=${uniqueRatio.toFixed(
          2
        )}.`
      );
      return "Unable to confidently transcribe this portion.";
    }
  }

  return trimmed;
}

export class TranscriptionService {
  private transcriber: any = null;
  private isInitializing: boolean = false;
  private initPromise: Promise<any> | null = null;
  private progressCallback: ((progress: TranscriptionProgress) => void) | null = null;

  public isReady(): boolean {
    return this.transcriber !== null;
  }

  public getIsInitializing(): boolean {
    return this.isInitializing;
  }

  public setProgressCallback(callback: (progress: TranscriptionProgress) => void) {
    this.progressCallback = callback;
  }

  private notify(progress: TranscriptionProgress) {
    if (this.progressCallback) {
      this.progressCallback(progress);
    }
  }

  public async initialize(): Promise<void> {
    if (this.transcriber) return;
    if (this.isInitializing) {
      return this.initPromise || Promise.resolve();
    }

    this.isInitializing = true;
    this.notify({ status: 'loading', message: 'Preparing offline transcription…' });

    this.initPromise = (async () => {
      const modelName = 'onnx-community/whisper-base.en';
      let hasWebGPU = false;

      // 1. Detect if WebGPU is generally supported in the environment
      if (navigator && (navigator as any).gpu) {
        try {
          const adapter = await (navigator as any).gpu.requestAdapter();
          if (adapter) {
            hasWebGPU = true;
          }
        } catch (e) {
          console.warn('WebGPU request adapter failed:', e);
        }
      }

      const loadPipeline = async (deviceType: 'webgpu' | 'wasm') => {
        return await pipeline('automatic-speech-recognition', modelName, {
          device: deviceType,
          progress_callback: (data: any) => {
            if (data.status === 'progress') {
              this.notify({
                status: 'loading',
                message: `Downloading speech engine: ${Math.round(data.progress)}%`,
                progress: data.progress,
              });
            } else if (data.status === 'ready') {
              this.notify({ status: 'loading', message: 'Configuring model...' });
            }
          }
        });
      };

      try {
        let transcriber;
        if (hasWebGPU) {
          try {
            console.log(`[TRANSCRIPTION] Attempting to load model ${modelName} on WebGPU...`);
            transcriber = await loadPipeline('webgpu');
            console.log('[TRANSCRIPTION] Using WebGPU');
          } catch (webGpuErr) {
            console.warn('[TRANSCRIPTION] WebGPU initialization failed, falling back to WASM:', webGpuErr);
            console.log(`[TRANSCRIPTION] Attempting to load model ${modelName} on WASM...`);
            transcriber = await loadPipeline('wasm');
            console.log('[TRANSCRIPTION] WebGPU initialization failed, falling back to WASM');
          }
        } else {
          console.log('[TRANSCRIPTION] WebGPU unavailable, using WASM');
          console.log(`[TRANSCRIPTION] Attempting to load model ${modelName} on WASM...`);
          transcriber = await loadPipeline('wasm');
          console.log('[TRANSCRIPTION] Using WASM');
        }

        this.transcriber = transcriber;
        this.isInitializing = false;
        this.notify({ status: 'ready', message: 'Transcription engine ready' });
        return transcriber;
      } catch (err) {
        this.isInitializing = false;
        this.initPromise = null;
        console.error('[TRANSCRIPTION] WASM initialization failed:', err);
        this.notify({ status: 'error', message: 'Failed to prepare offline transcription.' });
        throw err;
      }
    })();

    await this.initPromise;
  }

  public async resampleTo16kMono(audioBlob: Blob): Promise<Float32Array> {
    console.log(`[TRANSCRIPTION DEBUG] Blob size: ${audioBlob.size} bytes, type: ${audioBlob.type}`);
    const arrayBuffer = await audioBlob.arrayBuffer();

    // Decode audio data using Browser AudioContext
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const tempCtx = new AudioCtx();

    let audioBuffer;
    try {
      audioBuffer = await tempCtx.decodeAudioData(arrayBuffer);
    } catch (e) {
      console.error('Error decoding audio data:', e);
      tempCtx.close();
      throw new Error('Unsupported or corrupted audio format.');
    }
    tempCtx.close();

    console.log(`[TRANSCRIPTION DEBUG] Decoded audio duration: ${audioBuffer.duration.toFixed(2)}s, Sample rate: ${audioBuffer.sampleRate}, Channels: ${audioBuffer.numberOfChannels}`);

    // Use OfflineAudioContext to resample to 16000Hz mono
    const targetSampleRate = 16000;
    const numberOfChannels = 1; // mono
    const duration = audioBuffer.duration;
    const length = Math.round(duration * targetSampleRate);

    const offlineCtx = new OfflineAudioContext(
      numberOfChannels,
      length,
      targetSampleRate
    );

    // Create source buffer node
    const bufferSource = offlineCtx.createBufferSource();
    bufferSource.buffer = audioBuffer;
    bufferSource.connect(offlineCtx.destination);
    bufferSource.start();

    const renderedBuffer = await offlineCtx.startRendering();
    const pcmData = renderedBuffer.getChannelData(0);
    console.log(`[TRANSCRIPTION DEBUG] PCM sample count: ${pcmData.length}, duration: ${(pcmData.length / 16000).toFixed(2)}s`);
    return pcmData;
  }


  public async transcribe(audioBlob: Blob, notifyProgress: boolean = true): Promise<string> {
    if (notifyProgress) {
      this.notify({ status: 'transcribing', message: 'Transcribing your speech…' });
    }

    try {
      // 1. Ensure model is initialized
      if (!this.transcriber) {
        await this.initialize();
      }

      if (!this.transcriber) {
        throw new Error('Transcription pipeline not initialized');
      }

      // 2. Decode and downsample audio to 16kHz Float32Array mono
      const pcmData = await this.resampleTo16kMono(audioBlob);
      console.log(`[TRANSCRIPTION DEBUG] Whisper input duration: ${(pcmData.length / 16000).toFixed(2)}s`);

      // 3. Run Whisper model
      console.log('Running Whisper transcription locally...');
      const output = await this.transcriber(pcmData, {
        chunk_length_s: 30,
        stride_length_s: 5,
        return_timestamps: false,
        repetition_penalty: 1.2,
        no_repeat_ngram_size: 4,
      });

      console.log('Local transcription complete:', output);
      const text = (output.text || '').trim();
      const sanitizedText = sanitizePathologicalHallucinations(text, pcmData.length / 16000);

      if (notifyProgress) {
        this.notify({ status: 'done', message: 'Transcript ready' });
      }
      return sanitizedText;
    } catch (err) {
      console.error('Transcription error:', err);
      if (notifyProgress) {
        this.notify({ status: 'error', message: "We couldn't transcribe this recording." });
      }
      throw err;
    }
  }
}

export const transcriptionService = new TranscriptionService();
