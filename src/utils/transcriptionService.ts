import { pipeline, env } from '@huggingface/transformers';

// Configure environment for browser
env.allowLocalModels = false;

export interface TranscriptionProgress {
  status: 'idle' | 'loading' | 'ready' | 'transcribing' | 'done' | 'error';
  message: string;
  progress?: number;
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
      try {
        let device = 'wasm';
        // Feature detect WebGPU
        if (navigator && navigator.gpu) {
          try {
            const adapter = await navigator.gpu.requestAdapter();
            if (adapter) {
              device = 'webgpu';
              console.log('Transcription service using WebGPU');
            }
          } catch (e) {
            console.warn('WebGPU request adapter failed, falling back to WASM/CPU', e);
          }
        }

        // Initialize pipeline
        const modelName = 'onnx-community/whisper-tiny.en';
        console.log(`Loading model ${modelName} on ${device}...`);
        
        const transcriber = await pipeline('automatic-speech-recognition', modelName, {
          device: device as any,
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

        this.transcriber = transcriber;
        this.isInitializing = false;
        this.notify({ status: 'ready', message: 'Transcription engine ready' });
        return transcriber;
      } catch (err) {
        this.isInitializing = false;
        this.initPromise = null;
        console.error('Failed to initialize transcription engine:', err);
        this.notify({ status: 'error', message: 'Failed to prepare offline transcription.' });
        throw err;
      }
    })();

    await this.initPromise;
  }

  public async resampleTo16kMono(audioBlob: Blob): Promise<Float32Array> {
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
    return renderedBuffer.getChannelData(0);
  }

  public async transcribe(audioBlob: Blob): Promise<string> {
    this.notify({ status: 'transcribing', message: 'Transcribing your speech…' });

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

      // 3. Run Whisper model
      console.log('Running Whisper transcription locally...');
      const output = await this.transcriber(pcmData, {
        chunk_length_s: 30,
        stride_length_s: 5,
        return_timestamps: false,
      });

      console.log('Local transcription complete:', output);
      const text = (output.text || '').trim();

      this.notify({ status: 'done', message: 'Transcript ready' });
      return text;
    } catch (err) {
      console.error('Transcription error:', err);
      this.notify({ status: 'error', message: "We couldn't transcribe this recording." });
      throw err;
    }
  }
}

export const transcriptionService = new TranscriptionService();
