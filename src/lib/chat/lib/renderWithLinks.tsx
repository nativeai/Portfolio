import React from "react";

const URL_PATTERN = /https?:\/\/[^\s]+/;

export function renderWithLinks(text: string, linkClassName?: string): React.ReactNode {
  const parts = text.split(/(https?:\/\/[^\s]+)/);
  return parts.map((part, i) => {
    if (URL_PATTERN.test(part)) {
      const display = part.replace(/^https?:\/\//, "").replace(/\/$/, "");
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName ?? "underline decoration-dotted underline-offset-2 break-all hover:opacity-80 transition-opacity"}
          onClick={(e) => e.stopPropagation()}
        >
          {display}
        </a>
      );
    }
    return part;
  });
}
