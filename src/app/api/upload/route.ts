export const runtime = "nodejs";

export async function POST() {
  return new Response("Chat is currently disabled", { status: 503 });
}
