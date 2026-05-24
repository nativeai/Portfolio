import { NextRequest } from "next/server";
import { getTrainingData, saveTrainingData } from "../lib/training/store";

export const runtime = "nodejs";

function requireAdmin(req: NextRequest): Response | null {
  const key = process.env.ADMIN_API_KEY;
  if (!key) return new Response("Admin API not configured", { status: 503 });
  const provided = req.headers.get("x-admin-token") ?? "";
  const valid =
    provided.length === key.length &&
    Buffer.from(provided).equals(Buffer.from(key));
  if (!valid) return new Response("Unauthorized", { status: 401 });
  return null;
}

export async function GET(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  return Response.json(getTrainingData());
}

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  if (typeof body !== "object" || body === null || !("company" in body)) {
    return new Response("Invalid training data shape", { status: 400 });
  }
  saveTrainingData(body as Parameters<typeof saveTrainingData>[0]);
  return Response.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return new Response("Invalid request body", { status: 400 });
  }
  const { type, id } = body as { type?: unknown; id?: unknown };
  if ((type !== "faq" && type !== "file") || typeof id !== "string") {
    return new Response("Invalid type or id", { status: 400 });
  }

  const data = getTrainingData();
  if (type === "faq") data.faqs = data.faqs.filter((f) => f.id !== id);
  if (type === "file") data.files = data.files.filter((f) => f.id !== id);
  saveTrainingData(data);
  return Response.json({ ok: true });
}
