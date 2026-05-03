"use client";

import { useState, useCallback } from "react";
import { ChatWidget } from "@/lib/chat/components";
import type { WidgetConfig } from "@/lib/chat/types/widget";

const config: WidgetConfig = {
  id: "portfolio-bot",
  name: "Portfolio Assistant",
  greeting: "Hello, this is Nova, Shandon Hicks' AI Assistant. Ask me any questions about his work and I'll do my best to answer them.",
  voiceGreeting: "Hello, thanks for calling! This is Nova, Shandon Hicks' AI assistant. Ask me any questions about his work and I'll do my best to answer them.",
  agentName: "Nova",
  primaryColor: "#6366F1",
  voiceEnabled: true,
  position: "bottom-right",
};

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const handleForceClose = useCallback(() => setIsOpen(false), []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      <div
        className={`
          w-[370px] h-[540px] rounded-2xl shadow-2xl overflow-hidden border border-white/10
          transition-all duration-300 origin-bottom-right
          ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <ChatWidget config={config} appUrl="" onForceClose={handleForceClose} />
      </div>

      {/* Launcher button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ background: "linear-gradient(135deg, #C9A84C, #E8C97A)" }}
      >
        {isOpen ? (
          <svg className="w-6 h-6" style={{ color: "#0D2147" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" style={{ color: "#0D2147" }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
