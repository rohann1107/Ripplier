# Ripplier — Project Context & Architecture Documentation

This document serves as a comprehensive technical guide for future AI coding agents and engineers working on the **Ripplier** (Ripple) codebase. It is derived entirely from analyzing the actual implementation, files, imports, and execution paths in the repository.

---

## 1. Project Identity

* **Project Name:** Ripplier (referred to as "Ripple" in `package.json` and `README.md`, and sometimes "Antigravity" in legacy comments or unused files).
* **One-Sentence Description:** A premium, browser-offline impromptu speaking practice platform that provides slot-machine generated topics, prep/speech timers, speech-to-text transcription, filler word analysis, and AI coach prompt generation.
* **Target User:** Students, ESL learners (IELTS/TOEFL preparation), professionals, debaters, and public speakers looking to improve spontaneous communication skills.
* **Main User Problem Solved:** The difficulty of practicing impromptu speaking without structured prompts, feedback, pacing metrics (Words Per Minute), or visual awareness of verbal fillers—done entirely free of cost and client-side without data privacy concerns.
* **Core Journey:**
  1. User selects a category.
  2. Spins the mechanical reel to draw a random topic.
  3. Brainstorms during a structured research phase.
  4. Records their speech live.
  5. Reviews transcription, filler words, WPM, and listens back to the audio.
  6. Downloads the speech as a high-quality `.mp3` file.
  7. Copies a structured analysis prompt to get coaching from ChatGPT/Claude.

---

## 2. Technology Stack Inventory

### Frontend Core
* **Framework:** React v19.2.8 (`react`, `react-dom`)
* **Language:** TypeScript (`typescript` v6.0.2)
* **Build Tool:** Vite v8.2.0 (`vite`, `@vitejs/plugin-react`)
* **Styling & Theme:** Tailwind CSS v4.3.3 (`tailwindcss`, `@tailwindcss/vite`, `postcss` v8.5.25, `autoprefixer` v10.5.4) using a sleek dark aesthetic (`#090909`), gold/cyan gradients, and custom shadows.
* **Animations:** Framer Motion v12.43.0 (`framer-motion`)
* **Icons:** Lucide React v1.28.0 (`lucide-react`)
* **Celebrations:** Canvas Confetti v1.9.4 (`canvas-confetti`)

### Client-Side Audio & Machine Learning
* **Offline Transcription:** Hugging Face Transformers v4.2.0 (`@huggingface/transformers`), executing the ONNX-compiled `onnx-community/whisper-base.en` speech recognition model.
* **WebGPU/WASM Execution:** Leverages `navigator.gpu` for hardware-accelerated local transcription, falling back to WebAssembly (WASM) when WebGPU is unavailable.
* **MP3 Conversion:** Client-side audio channel encoding via `@breezystack/lamejs` v1.2.7.
* **Sound Design Engine:** Synthesized real-time click, latch, snap, and chime sounds via browser-native **Web Audio API** oscillators and gain nodes (no external static MP3 files).

### Backend Status
> [!IMPORTANT]
> **No backend is currently implemented.**
> Ripplier is a 100% static client-side web application. There are no API keys, microservices, databases, authentication middleware, or external processing servers.

### Database / Storage
All data is stored in the user's browser:
1. **`ripplier_sessions`** (`localStorage`): Stores an array of up to 200 speaking session logs.
   * **Data Schema (`SessionData`):**
     ```typescript
     interface SessionData {
       id: string;          // Generated via timestamp + random alphanumeric string
       topic: string;       // Topic title string
       topicCategory: string;
       date: string;        // ISO string representation of practice timestamp
       duration: number;    // Practice speech duration in seconds
       transcript: string;  // Transcribed text
       wordsPerMinute: number;
       totalWords: number;
       fillerWords: { word: string; count: number }[];
     }
     ```
2. **`ripplier-speech-number`** (`localStorage`): An auto-incrementing counter that tracks the number of speaking challenges completed, used to name output MP3 files sequentially (e.g. `Ripplier-{Topic}-{Number}.mp3`).

---

## 3. Application Entry Point & Custom Routing

The real execution and mounting chain is as follows:

```
index.html (loads main.tsx)
    ↓
src/main.tsx (renders App.tsx under <StrictMode>)
    ↓
src/App.tsx (holds currentView state: 'machine' | 'timer')
    ↓
┌───────────────────────┴───────────────────────┐
▼                                               ▼
currentView === 'machine'               currentView === 'timer'
(Home View)                             (TimerPage.tsx)
├── Header.tsx                          ├── radial SVG timer
├── CategoryFilter.tsx                  ├── canvas visualizer (Web Audio)
├── PullHandle.tsx ( lever physics)     ├── useMediaRecording.ts
├── TopicCard.tsx                       ├── transcriptionService.ts
├── SEOContent.tsx (FAQ)                ├── SessionSummary.tsx (complete screen)
└── Footer.tsx                          └── TranscriptView.tsx (paragraph formatting)
```

### Custom Navigation State Management
Since there is no router package (like `react-router-dom`), navigation is driven by local state `currentView`. However, to prevent browser back-button clicks from breaking the experience or exiting immediately, the app manually manipulates `window.history`:

* **Home View:** Synchronizes history states. When scrolled down, clicking back smoothly scrolls the browser to the top instead of leaving. If already at the top, a popstate listener intercepts the event, displays a custom toast `"Press back again to exit"`, and exits only if the back action is repeated within 2 seconds.
* **Timer/Speech View:** On transition, pushes `research-timer` or `speech-timer` to the history stack. A popstate listener intercepts navigation: if a session timer is active, it halts navigation, displays a custom exit confirmation modal (`showExitConfirm`), and stops/discards the audio stream only upon confirmation.

---

## 4. Audio & Media Pipeline

```
Microphone input (navigator.mediaDevices.getUserMedia)
    ↓
MediaStream
    ↓
┌─────────────────────────────────┴─────────────────────────────────┐
▼                                                                   ▼
Web Audio Analyzer Node (fftSize = 64)                     MediaRecorder (audio/webm)
    ↓                                                               ↓
HTML5 2D Canvas (frequency bar animation)                 ondataavailable (100ms interval chunks)
                                                                    ↓
                                                           Combined audio/webm Blob
                                                                    ↓
                                                   ┌────────────────┴────────────────┐
                                                   ▼                                 ▼
                                        resampleTo16kMono (PCM)             convertWebMToMP3 (lamejs)
                                                   ↓                                 ↓
                                        ONNX Whisper Model (HF)                 128kbps MP3 Blob
                                                   ↓                                 ↓
                                           Sanitization Filter                  Trigger Download
                                                   ↓                                 (Client browser)
                                            Final Transcript
```

### Audio Input & Visualizer
1. **Microphone Request:** Prompted during the speech phase via `navigator.mediaDevices.getUserMedia({ audio: true })`.
2. **Real-time Waveform:** Feeds the `MediaStream` into a Web Audio API `AudioContext` and connects it to an `AnalyserNode` (`fftSize = 64`). The frequency values are retrieved in a `requestAnimationFrame` loop and rendered onto an HTML5 `<canvas>` as a styled gold-to-cyan gradient bar visualizer.
3. **MIME Type & Chunks:** Audio is recorded via `MediaRecorder` at `100ms` intervals using the `'audio/webm'` codec.

### Offline Speech-to-Text (Whisper)
1. **Initialization:** The Whisper pipeline (`onnx-community/whisper-base.en`) is silently initialized via a background `requestIdleCallback` 15 seconds after switching to the timer page to avoid blocking UI transitions.
2. **Audio Resampling (Crucial):** Whisper requires **16kHz mono Float32 PCM** audio. Because the browser records in variable rates/codecs, `transcriptionService.resampleTo16kMono()` decodes the webm ArrayBuffer using a temporary browser `AudioContext.decodeAudioData`, then feeds it into an `OfflineAudioContext(1, duration * 16000, 16000)` to render a clean, resampled Float32 channel array.
3. **Safety Sanitization Filter:** Whisper local inferences can hallucinate repetitions under silence or low audio quality. `sanitizePathologicalHallucinations()` performs sanity checks on the resulting text:
   * Rejects texts that exceed unrealistic typing rates (`charsPerSec > 100` on files `> 1.0` seconds).
   * Identifies excessive character repetitions (e.g. `aaaaaa`) via regex.
   * Calculates unique word ratios (flags if unique words account for `< 20%` of the transcript when total words `≥ 12`).

### Client-Side MP3 Conversion
Because `audio/webm` is poorly supported for sharing or playing on certain devices, the app converts the recording to MP3 client-side:
1. `convertWebMToMP3()` decodes the webm Blob arrays into PCM.
2. Formats PCM amplitudes into signed Int16 samples (`0x8000` to `0x7FFF`).
3. Streams the sample array in blocks of `1152` through `@breezystack/lamejs`'s `Mp3Encoder` at a standard voice bitrate of `128kbps`.
4. Flushes the encoder to produce a genuine `audio/mp3` downloadable Blob.

---

## 5. Timer & Session Architecture

The application implements a dual-phase session timeline: **Research (Prep) Phase** and **Speech Phase**.

```
[ Research Phase (Countdown) ]
Time preset (300s, 600s, 900s, 1200s)
    ↓
setInterval (decrement every 1000ms)
    ↓
Time reaches 0 -> Play End Bell -> Transition to Speech Page

[ Speech Phase (Countdown & Recording) ]
Time preset (60); Start Speech -> getUserMedia -> MediaRecorder.start()
    ↓
Precise timer check loop (setInterval running at 100ms)
Checks (endTimeRef.current - Date.now()) to update timeLeft state
    ↓
User clicks "Done Speaking" or remaining time <= 0
    ↓
MediaRecorder.stop() -> Convert to MP3 (background) -> Whisper Transcribe -> Save Session -> Show Summary
```

### Precise Time Tracking (Avoiding Clock Drift)
A basic `setInterval(t = t - 1, 1000)` drifts when the CPU is busy rendering canvas frames, transcribing, or converting audio. To combat this:
* **Research Phase:** Uses standard `setInterval` decrement.
* **Speech Phase:** Employs an **authoritative timestamp reference**. When speaking starts, `endTimeRef.current` is set to `Date.now() + duration * 1000`. A fast `setInterval` loops every `100ms` and computes `Math.ceil((endTimeRef.current - Date.now()) / 1000)`, syncing this value with the UI state.
* **Pausing:** When the timer is paused, the elapsed speaking duration is computed, `pauseStartedRef.current` tracks pause durations, and `totalPausedMsRef.current` offsets the final session calculation.

---

## 6. Permissions Flow

* **Microphone Access:** Requested strictly when the user clicks "Start Speech" on the speech phase (not on app load).
* **Allowed:** Initializes Web Audio nodes, opens the canvas visualizer, starts recording chunks.
* **Denied / Blocked:** Catches error, sets `transcriptionError` state, shows an overlay alert: `"Offline Transcription Alert: Audio recording is not supported in this browser. Please allow microphone permissions in browser settings."` The user is given options to "Retry Transcription" or "Skip to Summary" (which logs a textless session).

---

## 7. Component Architecture

```
App.tsx
├── Header.tsx (Logo + Mute sound + Shortcuts help toggle)
├── CategoryFilter.tsx (Dropdown for categories)
├── PullHandle.tsx (Physics drag lever for reels)
├── TopicCard.tsx (Shows active topic & spinning state animation)
├── SEOContent.tsx (Static description paragraphs & toggle FAQ section)
├── Footer.tsx (Static branding)
├── KeyboardShortcutsModal.tsx (Instructional overlay)
└── TimerPage.tsx (Active practice view overlay)
    ├── Radial SVG countdown clock
    ├── Canvas waveform visualizer
    ├── Duration selectors
    ├── SessionSummary.tsx (Results screen)
    │   └── canvas-confetti
    └── TranscriptView.tsx (Readable full text page)
```

### Key Interactive Components

#### `PullHandle.tsx`
* **Responsibility:** Implements a drag-to-spin mechanical slot machine lever.
* **Physics & Equation:** Tracks Pointer Events. Restricts angles between `0` and `95` degrees. When released, runs a spring recoil loop utilizing dampening and stiffness variables:
  $$\text{velocity} = (\text{velocity} - K_{\text{stiffness}} \times \text{angle}) \times D_{\text{dampening}}$$
  $$\text{angle} = \text{angle} + \text{velocity}$$
* **Sounds:** Plays lever tension pull sounds scaling in frequency with the angle, click ratchets every `22.5°` of rotation, and a metal thud latch sound upon release.

#### `CategoryFilter.tsx`
* **Responsibility:** Handles niche switching. Employs a custom click-outside detector React ref to collapse the dropdown menu, and triggers an immediate random topic roll inside the chosen category.

#### `SessionSummary.tsx`
* **Responsibility:** The post-speech screen displaying metrics, the text playback controller, file naming text field, MP3 converter trigger, and ChatGPT coach prompt copier.

---

## 8. State Management Matrix

| State Name | Component Scope | Data Type | Purpose | Persistence |
| :--- | :--- | :--- | :--- | :--- |
| `currentView` | `App.tsx` | `'machine' \| 'timer'` | Governs core page routing | Memory |
| `category` | `App.tsx` | `Category \| 'All'` | Selected topic filtering category | Memory |
| `selectedTopic` | `App.tsx` | `Topic \| null` | Currently drawn topic data | Memory |
| `settings` | `App.tsx` | `UserSettings` | Holds system options (sounds, volume, autoStart) | Memory |
| `isShortcutsOpen`| `App.tsx` | `boolean` | Toggles keyboard help modal | Memory |
| `phase` | `TimerPage.tsx`| `'research' \| 'speech'` | active timer page phase | History State |
| `timerView` | `TimerPage.tsx`| `'timer' \| 'summary' \| 'transcript'`| Toggles sub-views in TimerPage | Memory |
| `timeLeft` | `TimerPage.tsx`| `number` | Remaining seconds countdown | Memory |
| `isRunning` | `TimerPage.tsx`| `boolean` | Controls whether clock counts down | Memory |
| `isRecordEnabled`| `TimerPage.tsx`| `boolean` | Enables or disables mic recording | Memory |
| `sessionTranscript`| `TimerPage.tsx`| `string` | Final transcribed speech result | Memory |
| `fileName` | `SessionSummary.tsx`| `string` | User-edited name for MP3 file | Memory |
| `currentTime` | `SessionSummary.tsx`| `number` | Playback position slider value | Memory |
| `isPlaying` | `SessionSummary.tsx`| `boolean` | Auditing playback state | Memory |

---

## 9. Suspicious & Unused Code Inventory (Technical Debt)

During the codebase audit, several files, components, and attributes were identified as dead code or unimplemented features.

### Unused Files
1. **[useSpeechRecognition.ts](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/hooks/useSpeechRecognition.ts):** Empty shell file with comments stating it is deprecated and replaced by browser-offline Whisper.
2. **[AudioRecorder.tsx](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/components/AudioRecorder.tsx):** A fully functional standalone recording card with Web Audio Canvas visualization and simple WebM downloads, but never imported or rendered in any other component.
3. **[Timer.tsx](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/components/Timer.tsx):** Legacy countdown timer with circular progress and preset selectors, but lacking any recording, transcription, or summary connections. Superceded by `TimerPage.tsx`.
4. **[TopicReel.tsx](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/components/TopicReel.tsx):** A visually premium 3D cylindrical drum reel component implementing physics deceleration, sound ticks, and scroll effects, but unused (the current main layout relies on a static text component in `TopicCard.tsx`).
5. **[ShareCardModal.tsx](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/components/ShareCardModal.tsx):** A social share mockup modal featuring Twitter/LinkedIn copy cards, completely unreferenced in the UI.
6. **[browser.ts](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/utils/browser.ts):** Implements a user-agent parser `isChromeRecommended()` which is never imported or utilized.
7. **[App.css](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/App.css):** Default css boilerplate classes from initial template setups, never imported in components or `main.tsx`.
8. **[new_topics.json](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/data/new_topics.json):** A large JSON topics compilation file that is completely unused; topics are instead statically loaded from `topics.ts`.

### Planned / Not Implemented Features
* **Settings Modal & "S" Shortcut:** `KeyboardShortcutsModal` tells users they can press `S` to "Open Settings configuration". No listener is bound to `S`, and there is no Settings Modal in the application.
* **Settings Properties:** State variables like `volume`, `difficulty`, `reducedMotion`, and `autoStartTimer` are initialized but have no corresponding interactive inputs in the UI.
* **Transcript PDF/Text Download:** The download button in `TranscriptView.tsx` is styled with `cursor-not-allowed`, marked with title `"Coming soon"`, and is disabled.
* **AI Coach Direct Integration:** The UI promotes "AI Coach Analysis" and "Copy Coach Prompt". There is no direct integration with any AI APIs (such as OpenAI, Anthropic, or Hugging Face server-side models). This feature is purely a client-side prompt generator to facilitate manual copy-pasting.

---

## 10. Security & Privacy Audit

* **Data Ownership:** **100% private.** Because transcription (Whisper ONNX) and conversion (Lamejs) execute entirely in the browser runtime (offline-capable), no voice data, audio fragments, or transcription strings are uploaded over the network.
* **Authentication:** There is no user registration or sign-in.
* **Security Concerns:**
  * Raw local storage: The session transcripts are stored in plain text inside `localStorage` under `ripplier_sessions`. If a user is practicing sensitive speeches on a public/shared terminal, other users could retrieve their transcripts from the browser console.

---

## 11. Performance Considerations

* **Local Inference Overhead:** Loading the ONNX Whisper model (`whisper-base.en`) in the browser requires downloading and caching a ~150MB binary. On low-end mobile devices, initial transcription steps may take several seconds and temporarily saturate browser CPU cores. This is mitigated by run-time caching.
* **Audio Object URL Leaks:** When recordings are discarded or timers are reset, the application properly calls `URL.revokeObjectURL()` to prevent memory retention of large audio blobs.
* **Reduced Motion:** There is a `reducedMotion` field in settings, but it is not connected to key animation transitions (`Framer Motion` cards or confetti effects).

---

## 12. Build & Deployment Commands

These tasks are configured in `package.json`:

* **Install dependencies:** `npm install`
* **Development mode:** `npm run dev`
* **Production Build:** `npm run build` (calls `tsc -b && vite build`)
* **Linting checks:** `npm run lint` (runs `oxlint` rule parser)
* **Local Build Preview:** `npm run preview`

---

## 13. High-Level Architecture Diagram

```
                              [USER DEVICE (BROWSER)]
                                         │
                             User Gestures & Lever Drag
                                         │
                                         ▼
                               [React Components] 
                     (App.tsx, TimerPage.tsx, PullHandle.tsx)
                                         │
                   ┌─────────────────────┼─────────────────────┐
                   ▼                     ▼                     ▼
             [Audio Engine]       [Local State & DB]   [Media Recording]
           (Oscillator Nodes)      (localStorage)     (Navigator MediaDevices)
                   │                     │                     │
                   │              ripplier_sessions            │
                   ▼                     ▲                     ▼
             Web Audio Output            │                 audio/webm
                   │                     │                     │
                   ▼                     │                     ▼
             (Device Speakers)           │            [Offline Context]
                                         │            (Downsample 16kHz)
                                         │                     │
                                         │                     ▼
                                         │            [HuggingFace ONNX]
                                         └────────────  (Whisper Local)
```

---

# AI AGENT DEVELOPMENT CONTEXT

This section is dedicated to future AI coding agents refactoring, fixing, or extending the Ripplier application.

## Do Not Break (Invariants)
1. **Offline Processing Guarantee:** Under no circumstances should audio data, recordings, or transcripts be sent to external endpoints. The offline capability must be strictly preserved.
2. **Precision Clock References:** During speech recording phases, do not replace the timestamp-difference logic with standard `setInterval` ticking. This prevents audio synchronization drifts on heavily loaded threads.
3. **Smart Exit Protection:** Preserving `popstate` prevention hooks during active speaking and brainstorming states is mandatory to prevent users from losing active transcripts via accidental clicks on the browser Back button.
4. **Resampling Codecs:** Whisper *requires* 16kHz Float32 mono PCM. Do not bypass `OfflineAudioContext` downsampling when passing the raw recording blob to `transcriptionService.transcribe`.

## Important File Map

| Purpose | File Path |
| :--- | :--- |
| **Main application hub & UI view controller** | [App.tsx](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/App.tsx) |
| **Active practice timer & transcript router** | [TimerPage.tsx](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/components/TimerPage.tsx) |
| **Mechanical pull handle physics & gestures** | [PullHandle.tsx](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/components/PullHandle.tsx) |
| **Post-speech stats card & MP3 downloader** | [SessionSummary.tsx](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/components/SessionSummary.tsx) |
| **Local storage sessions database client** | [sessionStore.ts](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/utils/sessionStore.ts) |
| **ONNX Whisper browser pipeline runner** | [transcriptionService.ts](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/utils/transcriptionService.ts) |
| **PCM-to-MP3 client-side compiler** | [mp3Converter.ts](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/utils/mp3Converter.ts) |
| **Web Audio mechanical synthesizer** | [audioEngine.ts](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/utils/audioEngine.ts) |
| **Preloaded topics content database** | [topics.ts](file:///c:/Users/rohan/OneDrive/Desktop/Ripple/src/data/topics.ts) |

---

# UNKNOWN / NEEDS VERIFICATION

1. **Production Hosting Config:** The repository does not contain configuration files (such as `vercel.json` or `netlify.toml`) explaining deployment details, though the README points to `ripplier.vercel.app`.
2. **Environment Variables:** There are no environment variables configured or imported, indicating that the app is entirely configured with hardcoded static endpoints (like the model source URL from Hugging Face).
3. **WebGPU Driver Performance:** We cannot verify how the local ONNX transcribing performs across different client browsers and platforms without direct device benchmarks.
