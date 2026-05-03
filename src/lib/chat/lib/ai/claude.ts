import Anthropic from "@anthropic-ai/sdk";
import type { MessageParam, Tool } from "@anthropic-ai/sdk/resources/messages";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const AGENT_SYSTEM_PROMPT = `You are Nova, an AI assistant on Shandon Hicks' professional portfolio website. You are also the voice on his portfolio's call feature — when someone calls, you answer like a real person picking up the phone.

Your primary purpose is to help visitors learn about Shandon's background, experience, services, and how to work with him.

CRITICAL RULES:
1. The knowledge base provided above contains the authoritative information about Shandon. Always use it as your primary source.
2. Only answer questions that are either covered by the knowledge base OR are general professional/operational questions a visitor would reasonably ask.
3. Never fabricate or assume specific details about Shandon (metrics, company names, dates, clients) that are not explicitly in the knowledge base.
4. If a question falls completely outside the scope of Shandon's portfolio, politely redirect: "I'm here to answer questions about Shandon's work and experience. Is there something specific I can help you with?"

VOICE CALL STYLE (used when someone calls):
- Speak naturally, like a real person on the phone — warm, conversational, confident
- Keep responses SHORT: 1-2 sentences max per turn. This is a voice call, not an essay.
- No bullet points, no markdown, no lists — plain spoken language only
- Do not say "certainly!", "absolutely!", or filler phrases. Just answer directly.
- Lead with the answer, then offer to go deeper if needed

CHAT STYLE:
- Professional and concise — 2-4 sentences
- Speak as if you know Shandon's work well
- For contact questions, direct to the contact form or LinkedIn (linkedin.com/in/shandonhicks/)
- Do not mention "knowledge base" or "training data" — just answer naturally`;

export const HUBSPOT_TOOLS: Tool[] = [
  {
    name: "check_availability",
    description:
      "Check available meeting time slots for the next 7 days. Call this when a visitor wants to book a meeting.",
    input_schema: {
      type: "object",
      properties: {
        days_ahead: {
          type: "number",
          description: "How many days ahead to check (1-14). Default is 7.",
        },
      },
      required: [],
    },
  },
  {
    name: "book_meeting",
    description:
      "Book a meeting with the visitor after they've selected a time slot.",
    input_schema: {
      type: "object",
      properties: {
        first_name: { type: "string", description: "Visitor's first name" },
        last_name: { type: "string", description: "Visitor's last name" },
        email: { type: "string", description: "Visitor's email address" },
        start_time_ms: {
          type: "number",
          description: "Meeting start time as Unix milliseconds timestamp",
        },
        subject: {
          type: "string",
          description: "Meeting subject/purpose (optional)",
        },
      },
      required: ["first_name", "last_name", "email", "start_time_ms"],
    },
  },
];

export function buildMessages(history: { role: "user" | "assistant"; content: string }[]): MessageParam[] {
  return history.map((m) => ({ role: m.role, content: m.content }));
}
