"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTTS } from "../hooks/useTTS";
import { renderWithLinks } from "../lib/renderWithLinks";
import type { WidgetConfig } from "../types/widget";

interface TranscriptLine {
  id: string;
  speaker: "agent" | "user";
  text: string;
}

interface CallScreenProps {
  config: WidgetConfig;
  appUrl: string;
  onEndCall: () => void;
}

type ListenState = "idle" | "listening" | "processing";

export default function CallScreen({ config, appUrl, onEndCall }: CallScreenProps) {
  const [callState, setCallState] = useState<"ringing" | "connected">("ringing");
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [listenState, setListenState] = useState<ListenState>("idle");
  const [interimText, setInterimText] = useState("");

  const { speak, stop, isSpeaking: isAgentSpeaking } = useTTS(appUrl);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const closeAfterSpeakRef = useRef(false);

  const sendMessageRef = useRef<(text: string) => void>(() => {});

  useEffect(() => {
    if (callState !== "connected") return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [callState]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [transcript, interimText]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming || isAgentSpeaking) return;

    setTranscript((prev) => [...prev, { id: Date.now().toString(), speaker: "user", text: trimmed }]);
    historyRef.current = [...historyRef.current, { role: "user", content: trimmed }];
    setIsStreaming(true);

    try {
      const res = await fetch(`${appUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyRef.current, widgetId: config.id }),
      });
      if (!res.ok) throw new Error();

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value, { stream: true }).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") break;
          try {
            const parsed = JSON.parse(raw) as { text?: string; close?: boolean };
            if (parsed.close) closeAfterSpeakRef.current = true;
            if (parsed.text) fullText += parsed.text;
          } catch { /* skip */ }
        }
      }

      const reply = fullText.trim();
      historyRef.current = [...historyRef.current, { role: "assistant", content: reply }];
      setTranscript((prev) => [...prev, { id: (Date.now() + 1).toString(), speaker: "agent", text: reply }]);
      speak(reply);
    } catch {
      const fallback = "Sorry, I didn't catch that. Could you try again?";
      setTranscript((prev) => [...prev, { id: Date.now().toString(), speaker: "agent", text: fallback }]);
      speak(fallback);
    } finally {
      setIsStreaming(false);
    }
  }, [isStreaming, isAgentSpeaking, config.id, appUrl, speak]);

  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.onresult = null;
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    setListenState("idle");
    setInterimText("");
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition: any = new SR();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListenState("listening");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setInterimText("");
          setListenState("processing");
          recognition.abort();
          sendMessageRef.current(t.trim());
          return;
        }
        interim += t;
      }
      setInterimText(interim);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      if (event.error !== "aborted") {
        recognitionRef.current = null;
        setListenState("idle");
        setInterimText("");
      }
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      setInterimText("");
      setListenState((prev) => {
        if (prev === "listening") {
          setTimeout(() => startListening(), 150);
        }
        return prev === "listening" ? "idle" : prev;
      });
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, []);

  useEffect(() => {
    if (callState !== "connected") return;

    if (isAgentSpeaking || isStreaming) {
      stopListening();
    } else {
      const t = setTimeout(() => startListening(), 400);
      return () => clearTimeout(t);
    }
  }, [callState, isAgentSpeaking, isStreaming, startListening, stopListening]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCallState("connected");
      const greeting = config.voiceGreeting ?? config.greeting;
      historyRef.current = [{ role: "assistant", content: greeting }];
      setTranscript([{ id: "greeting", speaker: "agent", text: greeting }]);
      speak(greeting);
    }, 1500);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isAgentSpeaking && closeAfterSpeakRef.current) {
      closeAfterSpeakRef.current = false;
      setTimeout(() => {
        stopListening();
        stop();
        onEndCall();
      }, 800);
    }
  }, [isAgentSpeaking, stopListening, stop, onEndCall]);

  useEffect(() => {
    return () => { stopListening(); stop(); };
  }, [stopListening, stop]);

  const handleEndCall = () => {
    stopListening();
    stop();
    onEndCall();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        color: "#fff",
        background: "linear-gradient(160deg, #060D1A, #0D1F3C, #1A3560)",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 16px 16px", position: "relative" }}>
        {callState === "ringing" && (
          <>
            <div style={{ position: "absolute", top: 20, width: 112, height: 112, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", animation: "ping 1.5s ease-out infinite" }} />
            <div style={{ position: "absolute", top: 8, width: 140, height: 140, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", animation: "ping 1.5s ease-out infinite", animationDelay: "0.4s" }} />
          </>
        )}

        <div style={{ position: "relative", zIndex: 10 }}>
          <div
            style={{
              width: 80, height: 80, borderRadius: "50%",
              background: `linear-gradient(135deg, ${config.primaryColor}, #1A3560)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, fontWeight: 700,
              boxShadow: listenState === "listening"
                ? "0 0 0 4px rgba(74,222,128,0.35), 0 0 20px rgba(74,222,128,0.2)"
                : listenState === "processing"
                ? "0 0 0 4px rgba(250,204,21,0.35)"
                : "0 8px 32px rgba(0,0,0,0.5)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            {config.agentName[0]}
          </div>
        </div>

        <p style={{ margin: "10px 0 0", fontWeight: 600, fontSize: 17, letterSpacing: "0.01em" }}>{config.agentName}</p>

        {callState === "ringing" ? (
          <p style={{ margin: "4px 0 0", fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.12em", animation: "pulse 1.5s ease-in-out infinite" }}>
            Ringing…
          </p>
        ) : (
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#4ade80", fontVariantNumeric: "tabular-nums" }}>
            {formatTime(elapsed)}
          </p>
        )}
      </div>

      {/* Transcript */}
      <div
        ref={transcriptRef}
        style={{ flex: 1, overflowY: "auto", padding: "8px 16px", display: "flex", flexDirection: "column", gap: 14 }}
      >
        {callState === "connected" && transcript.map((line) => (
          <div
            key={line.id}
            style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: line.speaker === "user" ? "flex-end" : "flex-start" }}
          >
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", padding: "0 4px" }}>
              {line.speaker === "user" ? "You" : config.agentName}
            </span>
            <p style={{
              margin: 0, fontSize: 13, lineHeight: 1.55, maxWidth: "88%",
              padding: "8px 12px",
              borderRadius: line.speaker === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: line.speaker === "user" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)",
            }}>
              {renderWithLinks(line.text, "underline decoration-dotted text-indigo-300 hover:text-indigo-200")}
            </p>
          </div>
        ))}

        {interimText && (
          <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-end" }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", padding: "0 4px" }}>You</span>
            <p style={{
              margin: 0, fontSize: 13, lineHeight: 1.55, maxWidth: "88%",
              padding: "8px 12px",
              borderRadius: "16px 16px 4px 16px",
              background: "rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.5)",
              fontStyle: "italic",
            }}>
              {interimText}
            </p>
          </div>
        )}

        {callState === "connected" && (isStreaming || isAgentSpeaking) && !interimText && (
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <div style={{ background: "rgba(255,255,255,0.07)", padding: "10px 14px", borderRadius: "16px 16px 16px 4px", display: "flex", gap: 5, alignItems: "center" }}>
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  style={{
                    display: "inline-block", width: 6, height: 6, borderRadius: "50%",
                    background: "rgba(255,255,255,0.45)",
                    animation: "bounce 1s ease-in-out infinite",
                    animationDelay: `${delay}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Status + End call */}
      <div style={{ padding: "16px 24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        {callState === "connected" && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, height: 20 }}>
            {isAgentSpeaking || isStreaming ? (
              <>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#C9A84C", display: "inline-block", animation: "pulse 1s ease-in-out infinite" }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>
                  {isStreaming ? "Thinking…" : "Speaking…"}
                </span>
              </>
            ) : listenState === "listening" ? (
              <>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 1s ease-in-out infinite" }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>Listening…</span>
              </>
            ) : (
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>Just a moment…</span>
            )}
          </div>
        )}

        <button
          onClick={handleEndCall}
          aria-label={callState === "ringing" ? "Decline call" : "End call"}
          style={{
            width: 60, height: 60, borderRadius: "50%",
            background: "#ef4444",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(239,68,68,0.4)",
            transition: "transform 0.15s, background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#dc2626")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#ef4444")}
        >
          <svg width={26} height={26} fill="white" viewBox="0 0 24 24" style={{ transform: "rotate(135deg)" }}>
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
          </svg>
        </button>

        {callState === "ringing" && (
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: 0 }}>Decline</p>
        )}
      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
