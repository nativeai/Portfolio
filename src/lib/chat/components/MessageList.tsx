"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "../types/chat";
import { renderWithLinks } from "../lib/renderWithLinks";

interface MessageListProps {
  messages: ChatMessage[];
  isStreaming?: boolean;
  streamingText?: string;
}

export default function MessageList({
  messages,
  isStreaming,
  streamingText,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`
              max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap
              ${msg.role === "user"
                ? "bg-indigo-500 text-white rounded-br-sm"
                : "bg-gray-100 text-gray-800 rounded-bl-sm"
              }
            `}
          >
            {renderWithLinks(
              msg.content,
              msg.role === "user"
                ? "underline decoration-dotted underline-offset-2 break-all hover:opacity-80 text-white"
                : "underline decoration-dotted underline-offset-2 break-all hover:opacity-80 text-indigo-600"
            )}
            {msg.isVoice && (
              <span className="ml-1 opacity-60 text-xs">🎤</span>
            )}
          </div>
        </div>
      ))}

      {isStreaming && streamingText && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap bg-gray-100 text-gray-800">
            {streamingText}
            <span className="inline-block w-1.5 h-4 bg-[#00C9A7] ml-0.5 animate-pulse rounded-sm" />
          </div>
        </div>
      )}

      {isStreaming && !streamingText && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
