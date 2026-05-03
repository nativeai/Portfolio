import { NextRequest } from "next/server";
import { getTrainingData, applyPronunciations } from "../lib/training/store";

export const runtime = "nodejs";

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? "XrExE9yKIg1WjnnlVkGX";

export async function POST(req: NextRequest) {
  let body: { text?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) {
    return new Response("Missing required field: text", { status: 400 });
  }

  const training = getTrainingData();
  const textWithoutUrls = text.replace(/https?:\/\/[^\s]+/g, "").replace(/\s{2,}/g, " ").trim();
  const spokenText = applyPronunciations(textWithoutUrls, training.pronunciations);

  if (!process.env.ELEVENLABS_API_KEY) {
    return new Response("ELEVENLABS_API_KEY not set", { status: 500 });
  }

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: spokenText,
        model_id: "eleven_flash_v2_5",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    }
  );

  if (!res.ok) {
    console.error(`ElevenLabs TTS error ${res.status}: ${await res.text()}`);
    return new Response("TTS service error", { status: 502 });
  }

  const audio = await res.arrayBuffer();
  return new Response(audio, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}
