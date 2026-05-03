"use client";

import { useRef, useCallback, useState } from "react";

export function useTTS(appUrl: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!text.trim()) return;
    stop();
    setIsSpeaking(true);

    const browserTTS = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    };

    try {
      const res = await fetch(`${appUrl}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("TTS failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        URL.revokeObjectURL(url);
        setIsSpeaking(false);
      };
      audio.onerror = () => {
        URL.revokeObjectURL(url);
        browserTTS();
      };

      try {
        await audio.play();
      } catch {
        URL.revokeObjectURL(url);
        browserTTS();
      }
    } catch {
      browserTTS();
    }
  }, [appUrl, stop]);

  return { speak, stop, isSpeaking };
}
