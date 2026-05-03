"use client";

import { useState } from "react";

interface WidgetLauncherProps {
  primaryColor: string;
  position: "bottom-right" | "bottom-left";
  label?: string;
}

export default function WidgetLauncher({
  primaryColor,
  position,
  label = "Chat with us",
}: WidgetLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const positionClass =
    position === "bottom-right"
      ? "bottom-4 right-4"
      : "bottom-4 left-4";

  return (
    <div className={`fixed ${positionClass} z-50`}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
        style={{ backgroundColor: primaryColor }}
        aria-label={label}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
        <span className="absolute right-16 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {label}
        </span>
      </button>
    </div>
  );
}
