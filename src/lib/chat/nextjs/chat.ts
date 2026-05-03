import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  anthropic,
  AGENT_SYSTEM_PROMPT,
  HUBSPOT_TOOLS,
  buildMessages,
} from "../lib/ai/claude";
import { getAvailableMeetingSlots, bookMeeting } from "../lib/hubspot/client";
import { getTrainingData, buildSystemContext } from "../lib/training/store";
import { matchFAQ, matchDocument, checkBlocklist, getGuardrailResponse, getClankerResponse } from "../lib/training/matcher";

export const runtime = "nodejs";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

const violationMap = new Map<string, number>();
const clankerViolationMap = new Map<string, number>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function OPTIONS() {
  return new Response(null, { status: 204 });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return new Response("Too many requests", { status: 429 });
  }

  let body: { messages?: unknown; widgetId?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { messages: rawMessages, widgetId } = body;
  if (!Array.isArray(rawMessages) || typeof widgetId !== "string") {
    return new Response("Missing required fields: messages, widgetId", { status: 400 });
  }
  const messages = rawMessages as { role: "user" | "assistant"; content: string }[];

  const meetingLinkSlug = process.env[`WIDGET_${widgetId}_MEETING_SLUG`]
    ?? process.env.HUBSPOT_MEETING_SLUG
    ?? "";

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  async function write(data: string) {
    await writer.write(encoder.encode(`data: ${JSON.stringify({ text: data })}\n\n`));
  }

  async function run() {
    try {
      const trainingData = getTrainingData();

      const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
      if (lastUserMessage) {
        const blockedTerm = checkBlocklist(lastUserMessage.content, trainingData.blocklist ?? []);
        if (blockedTerm) {
          let count: number;
          if (blockedTerm === "clanker") {
            const prior = clankerViolationMap.get(ip) ?? 0;
            count = prior + 1;
            clankerViolationMap.set(ip, count);
            await write(getClankerResponse(count));
          } else {
            const prior = violationMap.get(ip) ?? 0;
            count = prior + 1;
            violationMap.set(ip, count);
            await write(getGuardrailResponse(count));
          }
          if (count >= 3) {
            const closeDelay = blockedTerm === "clanker" ? 7000 : 3000;
            await writer.write(encoder.encode(`data: ${JSON.stringify({ close: true, closeDelay })}\n\n`));
          }
          await writer.write(encoder.encode("data: [DONE]\n\n"));
          await writer.close();
          return;
        }

        const faqMatch = matchFAQ(lastUserMessage.content, trainingData.faqs);
        if (faqMatch) {
          const words = faqMatch.answer.split(" ");
          for (const word of words) {
            await write(word + " ");
            await new Promise((r) => setTimeout(r, 20));
          }
          await writer.write(encoder.encode("data: [DONE]\n\n"));
          await writer.close();
          return;
        }

        const docMatch = matchDocument(lastUserMessage.content, trainingData.files);
        if (docMatch) {
          const words = docMatch.split(" ");
          for (const word of words) {
            await write(word + " ");
            await new Promise((r) => setTimeout(r, 20));
          }
          await writer.write(encoder.encode("data: [DONE]\n\n"));
          await writer.close();
          return;
        }
      }

      const knowledgeContext = buildSystemContext(trainingData);
      const fullSystemPrompt = knowledgeContext
        ? `${knowledgeContext}\n\n${AGENT_SYSTEM_PROMPT}`
        : AGENT_SYSTEM_PROMPT;

      const apiMessages = buildMessages(messages);
      let response = await anthropic.messages.create({
        model: "claude-opus-4-7",
        max_tokens: 1024,
        system: [
          {
            type: "text",
            text: fullSystemPrompt,
            cache_control: { type: "ephemeral" },
          },
        ],
        tools: HUBSPOT_TOOLS,
        messages: apiMessages,
        stream: false,
      });

      while (response.stop_reason === "tool_use") {
        const assistantContent = response.content;
        apiMessages.push({ role: "assistant", content: assistantContent });

        const toolResults: Anthropic.ToolResultBlockParam[] = [];

        for (const block of assistantContent) {
          if (block.type !== "tool_use") continue;

          let result: string;

          if (block.name === "check_availability") {
            const input = block.input as { days_ahead?: number };
            const daysAhead = input.days_ahead ?? 7;
            const nowMs = Date.now();
            const endMs = nowMs + daysAhead * 24 * 60 * 60 * 1000;

            const slots = await getAvailableMeetingSlots(meetingLinkSlug, nowMs, endMs);

            if (slots.length === 0) {
              result = "No available slots found for the requested period. Please try a different date range.";
            } else {
              const formatted = slots.slice(0, 5).map((s) => {
                const d = new Date(s.startTime);
                return `• ${d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at ${d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} (start_time_ms: ${s.startTime})`;
              });
              result = `Available slots:\n${formatted.join("\n")}`;
            }
          } else if (block.name === "book_meeting") {
            const input = block.input as {
              first_name: string;
              last_name: string;
              email: string;
              start_time_ms: number;
              subject?: string;
            };
            const booking = await bookMeeting(meetingLinkSlug, {
              firstName: input.first_name,
              lastName: input.last_name,
              email: input.email,
              startTime: input.start_time_ms,
              subject: input.subject,
            });
            result = booking.success
              ? `Meeting booked successfully! Confirmation ID: ${booking.confirmationId}. A confirmation email will be sent to ${input.email}.`
              : `Booking failed: ${booking.error}`;
          } else {
            result = "Unknown tool";
          }

          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: result,
          });
        }

        apiMessages.push({ role: "user", content: toolResults });

        response = await anthropic.messages.create({
          model: "claude-opus-4-7",
          max_tokens: 1024,
          system: [
            {
              type: "text",
              text: AGENT_SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          tools: HUBSPOT_TOOLS,
          messages: apiMessages,
          stream: false,
        });
      }

      for (const block of response.content) {
        if (block.type === "text") {
          const words = block.text.split(" ");
          for (const word of words) {
            await write(word + " ");
            await new Promise((r) => setTimeout(r, 20));
          }
        }
      }

      await writer.write(encoder.encode("data: [DONE]\n\n"));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      await writer.write(
        encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`)
      );
    } finally {
      await writer.close();
    }
  }

  run();

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
