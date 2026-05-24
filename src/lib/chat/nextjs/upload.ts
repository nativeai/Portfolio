import { NextRequest } from "next/server";
import { getTrainingData, saveTrainingData } from "../lib/training/store";
import mammoth from "mammoth";

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

const ALLOWED_EXTENSIONS: Record<string, string> = {
  ".txt": "text",
  ".md": "text",
  ".json": "text",
  ".csv": "text",
  ".docx": "docx",
  ".doc": "docx",
};

async function extractText(file: File, ext: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  if (ALLOWED_EXTENSIONS[ext] === "docx") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  return await file.text();
}

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return new Response("No file provided", { status: 400 });

  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!ALLOWED_EXTENSIONS[ext]) {
    return new Response(
      `Unsupported file type. Allowed: ${Object.keys(ALLOWED_EXTENSIONS).join(", ")}`,
      { status: 400 }
    );
  }

  let content: string;
  try {
    content = await extractText(file, ext);
  } catch {
    return new Response("Failed to extract text from file", { status: 422 });
  }

  const data = getTrainingData();
  data.files.push({
    id: Date.now().toString(),
    name: file.name,
    content: content.slice(0, 15000),
    uploadedAt: new Date().toISOString(),
  });
  saveTrainingData(data);

  return Response.json({ ok: true, name: file.name });
}
