import { useState, useRef, useCallback, useEffect } from 'react';

interface SpeechRecognitionHook {
    transcript: string;
    interimTranscript: string;
    isListening: boolean;
    detectedLanguage: string;
    isSupported: boolean;
    start: () => void;
    stop: () => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
}

// Extend Window for vendor-prefixed SpeechRecognition
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

type SpeechRecognitionInstance = {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
    abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
    const w = window as unknown as Record<string, unknown>;
    return (w.SpeechRecognition || w.webkitSpeechRecognition || null) as SpeechRecognitionConstructor | null;
}

export function useSpeechRecognition(): SpeechRecognitionHook {
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [detectedLanguage, setDetectedLanguage] = useState('Unknown');

    const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
    const isPausedRef = useRef(false);
    const shouldRestartRef = useRef(false);
    const finalTranscriptRef = useRef('');

    const SpeechRecognitionClass = getSpeechRecognition();
    const isSupported = SpeechRecognitionClass !== null;

    const createRecognition = useCallback(() => {
        if (!SpeechRecognitionClass) return null;

        const recognition = new SpeechRecognitionClass();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = navigator.language || 'en-US';
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let interim = '';
            let final = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                const text = result[0].transcript;

                if (result.isFinal) {
                    final += text + ' ';
                } else {
                    interim += text;
                }
            }

            if (final) {
                finalTranscriptRef.current += final;
                setTranscript(finalTranscriptRef.current);

                // Simple language detection from content
                detectLanguage(finalTranscriptRef.current);
            }

            setInterimTranscript(interim);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            if (event.error === 'no-speech' || event.error === 'aborted') {
                // These are non-fatal, will auto-restart
                return;
            }
            console.warn('Speech recognition error:', event.error);
        };

        recognition.onend = () => {
            // Auto-restart if we're supposed to be listening and not paused
            if (shouldRestartRef.current && !isPausedRef.current) {
                try {
                    recognition.start();
                } catch {
                    // Already started or other error
                }
            } else {
                setIsListening(false);
            }
        };

        return recognition;
    }, [SpeechRecognitionClass]);

    const start = useCallback(() => {
        if (!isSupported) return;

        const recognition = createRecognition();
        if (!recognition) return;

        recognitionRef.current = recognition;
        isPausedRef.current = false;
        shouldRestartRef.current = true;
        finalTranscriptRef.current = '';
        setTranscript('');
        setInterimTranscript('');

        try {
            recognition.start();
            setIsListening(true);
        } catch {
            console.warn('Failed to start speech recognition');
        }
    }, [isSupported, createRecognition]);

    const stop = useCallback(() => {
        shouldRestartRef.current = false;
        isPausedRef.current = false;
        if (recognitionRef.current) {
            recognitionRef.current.onend = null;
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }
        setIsListening(false);
        setInterimTranscript('');
    }, []);

    const pause = useCallback(() => {
        isPausedRef.current = true;
        shouldRestartRef.current = false;
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch {
                // Ignore
            }
        }
        setIsListening(false);
    }, []);

    const resume = useCallback(() => {
        if (!isSupported || !recognitionRef.current) {
            // Create new recognition if needed
            const recognition = createRecognition();
            if (!recognition) return;
            recognitionRef.current = recognition;
        }

        isPausedRef.current = false;
        shouldRestartRef.current = true;

        try {
            recognitionRef.current!.start();
            setIsListening(true);
        } catch {
            // If start fails, try creating a fresh instance
            const recognition = createRecognition();
            if (recognition) {
                recognitionRef.current = recognition;
                try {
                    recognition.start();
                    setIsListening(true);
                } catch {
                    console.warn('Failed to resume speech recognition');
                }
            }
        }
    }, [isSupported, createRecognition]);

    const reset = useCallback(() => {
        stop();
        finalTranscriptRef.current = '';
        setTranscript('');
        setInterimTranscript('');
        setDetectedLanguage('Unknown');
    }, [stop]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            shouldRestartRef.current = false;
            if (recognitionRef.current) {
                recognitionRef.current.onend = null;
                recognitionRef.current.stop();
            }
        };
    }, []);

    return {
        transcript,
        interimTranscript,
        isListening,
        detectedLanguage,
        isSupported,
        start,
        stop,
        pause,
        resume,
        reset,
    };
}

// Simple language detection heuristic
function detectLanguage(text: string): void {
    // This is a basic heuristic — real detection would use a library
    // For now we label based on script detection
    if (!text || text.length < 10) return;

    // Check for Devanagari (Hindi/Marathi)
    if (/[\u0900-\u097F]/.test(text)) {
        // Could be Hindi or Marathi
        return;
    }

    // Check for Japanese
    if (/[\u3040-\u30FF\u4E00-\u9FFF]/.test(text)) {
        return;
    }

    // Check for Arabic
    if (/[\u0600-\u06FF]/.test(text)) {
        return;
    }

    // Check for CJK (Chinese)
    if (/[\u4E00-\u9FFF]/.test(text) && !/[\u3040-\u30FF]/.test(text)) {
        return;
    }
}
