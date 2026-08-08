import { Mp3Encoder } from '@breezystack/lamejs';

/**
 * Converts a WebM/Opus audio Blob into a real MP3 Blob client-side.
 */
export async function convertWebMToMP3(audioBlob: Blob): Promise<Blob> {
  const arrayBuffer = await audioBlob.arrayBuffer();
  
  // Create AudioContext to decode the audio
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  const tempCtx = new AudioCtx();
  
  let audioBuffer: AudioBuffer;
  try {
    audioBuffer = await tempCtx.decodeAudioData(arrayBuffer);
  } catch (err) {
    console.error('Error decoding WebM audio data for MP3 conversion:', err);
    tempCtx.close();
    throw new Error('Could not decode audio data.');
  }
  tempCtx.close();

  const sampleRate = audioBuffer.sampleRate;
  const numChannels = audioBuffer.numberOfChannels;
  
  console.log(`Starting WebM to MP3 conversion: sampleRate=${sampleRate}, channels=${numChannels}`);

  let mp3Encoder: Mp3Encoder;
  const mp3Data: Uint8Array[] = [];
  const bitrate = 128; // Standard speech bitrate
  const sampleBlockSize = 1152;

  if (numChannels >= 2) {
    // Encode as Stereo
    mp3Encoder = new Mp3Encoder(2, sampleRate, bitrate);
    const leftChannel = audioBuffer.getChannelData(0);
    const rightChannel = audioBuffer.getChannelData(1);
    
    const leftInt16 = new Int16Array(leftChannel.length);
    const rightInt16 = new Int16Array(rightChannel.length);
    
    for (let i = 0; i < leftChannel.length; i++) {
      let sL = Math.max(-1, Math.min(1, leftChannel[i]));
      leftInt16[i] = sL < 0 ? sL * 0x8000 : sL * 0x7FFF;
      
      let sR = Math.max(-1, Math.min(1, rightChannel[i]));
      rightInt16[i] = sR < 0 ? sR * 0x8000 : sR * 0x7FFF;
    }
    
    for (let i = 0; i < leftInt16.length; i += sampleBlockSize) {
      const leftChunk = leftInt16.subarray(i, i + sampleBlockSize);
      const rightChunk = rightInt16.subarray(i, i + sampleBlockSize);
      const mp3buf = mp3Encoder.encodeBuffer(leftChunk, rightChunk);
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }
  } else {
    // Encode as Mono
    mp3Encoder = new Mp3Encoder(1, sampleRate, bitrate);
    const monoChannel = audioBuffer.getChannelData(0);
    const monoInt16 = new Int16Array(monoChannel.length);
    
    for (let i = 0; i < monoChannel.length; i++) {
      let s = Math.max(-1, Math.min(1, monoChannel[i]));
      monoInt16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    
    for (let i = 0; i < monoInt16.length; i += sampleBlockSize) {
      const chunk = monoInt16.subarray(i, i + sampleBlockSize);
      const mp3buf = mp3Encoder.encodeBuffer(chunk);
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }
  }

  const mp3buf = mp3Encoder.flush();
  if (mp3buf.length > 0) {
    mp3Data.push(mp3buf);
  }

  console.log('WebM to MP3 conversion complete.');
  return new Blob(mp3Data as any[], { type: 'audio/mp3' });
}
