"use client";

import { useState, useRef, useCallback } from "react";

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
  large?: boolean;
}

export default function VoiceButton({ onTranscript, disabled, large }: VoiceButtonProps) {
  const [listening, setListening] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const toggle = useCallback(() => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [listening, onTranscript]);

  return (
    <button
      onClick={toggle}
      disabled={disabled}
      className={`
        ${large ? "w-20 h-20" : "w-12 h-12"} rounded-full flex items-center justify-center transition-all duration-200
        ${listening
          ? "bg-[#00C9A7] scale-110 animate-pulse shadow-lg shadow-[#00C9A7]/40"
          : "bg-indigo-500 hover:bg-indigo-600 active:scale-95"
        }
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
      aria-label={listening ? "Stop recording" : "Start voice input"}
    >
      <svg
        className={`${large ? "w-8 h-8" : "w-5 h-5"} text-white`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
      </svg>
    </button>
  );
}
