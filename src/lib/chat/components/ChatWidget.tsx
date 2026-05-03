"use client";

import { useState, useCallback, useRef } from "react";
import MessageList from "./MessageList";
import VoiceButton from "./VoiceButton";
import CallScreen from "./CallScreen";
import type { ChatMessage } from "../types/chat";
import type { WidgetConfig } from "../types/widget";

type Mode = "call" | "chat" | null;

interface ChatWidgetProps {
  config: WidgetConfig;
  appUrl: string;
  onForceClose?: () => void;
}

const brand = {
  navyDeep:    "#0A1628",
  navyPrimary: "#0D2147",
  navyMid:     "#1A3A6B",
  navyLight:   "#2A5298",
  steel:       "#4A7BC4",
  frost:       "#B8D4F5",
  gold:        "#C9A84C",
  goldLight:   "#E8C97A",
};

export default function ChatWidget({ config, appUrl, onForceClose }: ChatWidgetProps) {
  const [mode, setMode] = useState<Mode>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "greeting",
      role: "assistant",
      content: config.greeting,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = useCallback(
    async (text: string, isVoice = false) => {
      if (!text.trim() || isStreaming) return;

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
        isVoice,
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInputText("");
      setIsStreaming(true);
      setStreamingText("");

      const history = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const res = await fetch(`${appUrl}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history, widgetId: config.id }),
        });

        if (!res.ok) throw new Error("Chat request failed");

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let fullText = "";
        let shouldClose = false;
        let closeDelay = 3000;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data) as { text?: string; error?: string; close?: boolean; closeDelay?: number };
              if (parsed.error) throw new Error(parsed.error);
              if (parsed.close) { shouldClose = true; closeDelay = parsed.closeDelay ?? 3000; }
              if (parsed.text) {
                fullText += parsed.text;
                setStreamingText(fullText);
              }
            } catch {
              // skip malformed SSE lines
            }
          }
        }

        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: fullText.trim(),
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);

        if (shouldClose) {
          setTimeout(() => {
            onForceClose?.();
            setTimeout(() => {
              setMessages([{ id: "greeting", role: "assistant", content: config.greeting, timestamp: new Date() }]);
              setMode(null);
            }, 400);
          }, closeDelay);
        }
      } catch {
        const errMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsStreaming(false);
        setStreamingText("");
        inputRef.current?.focus();
      }
    },
    [messages, isStreaming, config.id, appUrl, config.greeting, onForceClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const unlockAndCall = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    ctx.resume().catch(() => {});
    setMode("call");
  };

  if (mode === "call") {
    return (
      <CallScreen
        config={config}
        appUrl={appUrl}
        onEndCall={() => setMode(null)}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: brand.navyDeep,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Gold accent line */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${brand.gold}, ${brand.goldLight})`, flexShrink: 0 }} />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          background: `linear-gradient(135deg, ${brand.navyPrimary} 0%, ${brand.navyMid} 100%)`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${brand.gold}, ${brand.goldLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 700,
            color: brand.navyPrimary,
            flexShrink: 0,
          }}
        >
          {config.agentName[0]}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#fff", lineHeight: "1.3" }}>
            {config.agentName}
          </p>
          <p style={{ margin: 0, fontSize: 11, color: brand.frost, opacity: 0.7, lineHeight: "1.3" }}>
            AI Assistant&nbsp;•&nbsp;
            <span style={{ color: "#4ade80" }}>●</span>&nbsp;Online
          </p>
        </div>
        {mode !== null && (
          <button
            onClick={() => setMode(null)}
            aria-label="Back to menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: brand.frost,
              opacity: 0.7,
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
          >
            <svg width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Body */}
      {mode === null ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 20px",
            gap: 24,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>
              How would you like to connect?
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: brand.frost, opacity: 0.55 }}>
              Choose your preferred way to reach out
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, width: "100%" }}>
            {(
              [
                {
                  key: "call",
                  label: "Voice Call",
                  sub: "Speak naturally",
                  icon: (
                    <svg width={26} height={26} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                    </svg>
                  ),
                },
                {
                  key: "chat",
                  label: "Text Chat",
                  sub: "Type your message",
                  icon: (
                    <svg width={26} height={26} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                    </svg>
                  ),
                },
              ] as const
            ).map(({ key, label, sub, icon }) => (
              <ModeCard
                key={key}
                label={label}
                sub={sub}
                icon={icon}
                onClick={key === "call" ? unlockAndCall : () => setMode(key)}
                brand={brand}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <MessageList
            messages={messages}
            isStreaming={isStreaming}
            streamingText={streamingText}
          />
          {/* Input row */}
          <div
            style={{
              borderTop: `1px solid ${brand.navyMid}`,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: brand.navyPrimary,
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              disabled={isStreaming}
              style={{
                flex: 1,
                fontSize: 13,
                backgroundColor: brand.navyDeep,
                border: `1px solid ${brand.navyMid}`,
                borderRadius: 9999,
                padding: "8px 16px",
                color: "#fff",
                outline: "none",
                opacity: isStreaming ? 0.5 : 1,
                fontFamily: "inherit",
              }}
            />
            {config.voiceEnabled && (
              <VoiceButton
                onTranscript={(t) => sendMessage(t, true)}
                disabled={isStreaming}
              />
            )}
            <button
              onClick={() => sendMessage(inputText)}
              disabled={!inputText.trim() || isStreaming}
              aria-label="Send message"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${brand.gold}, ${brand.goldLight})`,
                border: "none",
                cursor: inputText.trim() && !isStreaming ? "pointer" : "not-allowed",
                opacity: !inputText.trim() || isStreaming ? 0.4 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "opacity 0.15s, transform 0.15s",
                flexShrink: 0,
              }}
            >
              <svg width={15} height={15} fill={brand.navyPrimary} viewBox="0 0 24 24" style={{ transform: "translateX(1px)" }}>
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function ModeCard({
  label,
  sub,
  icon,
  onClick,
  brand,
}: {
  label: string;
  sub: string;
  icon: React.ReactNode;
  onClick: () => void;
  brand: Record<string, string>;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        height: 148,
        borderRadius: 12,
        border: `1.5px solid ${hovered ? brand.gold + "80" : brand.navyMid}`,
        backgroundColor: hovered ? brand.navyMid : brand.navyPrimary,
        cursor: "pointer",
        transition: "background-color 0.2s, border-color 0.2s, transform 0.15s",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 24px rgba(10,22,40,0.5)` : "none",
        padding: 0,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${brand.gold}, ${brand.goldLight})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: brand.navyPrimary,
          transition: "transform 0.2s",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#fff" }}>{label}</p>
        <p style={{ margin: "2px 0 0", fontSize: 11, color: brand.frost, opacity: 0.6 }}>{sub}</p>
      </div>
    </button>
  );
}
