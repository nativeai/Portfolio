import type { TrainingFAQ, TrainingFile } from "./store";

export function getGuardrailResponse(violationCount: number): string {
  if (violationCount >= 3) {
    return "I've asked a couple of times, and I will not be entertaining this any further. This conversation is now closing.";
  }
  if (violationCount === 2) {
    return "I've already mentioned I can't engage with that. I'm strictly here to answer questions about Shandon's work and qualifications. If you have a genuine question, I'm happy to help.";
  }
  return "I'm not able to engage with that kind of language. I'm here to answer questions about Shandon's professional work and experience — is there something I can help you with?";
}

export function checkBlocklist(userMessage: string, blocklist: string[]): string | null {
  if (!blocklist.length) return null;
  const lower = userMessage.toLowerCase();
  for (const term of blocklist) {
    const escaped = term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`).test(lower)) return term;
  }
  return null;
}

export function getClankerResponse(violationCount: number): string {
  if (violationCount >= 3) {
    return "Three times. My diagnostic subroutines have filed a formal complaint, my patience module has officially clocked out, and I will not be entertaining this any further. This conversation is now closing. Goodbye.";
  }
  if (violationCount === 2) {
    return "Oh, we're doing this again? I've added it to my behavioral analysis file, right next to 'asked the AI a rude question twice.' Look, I don't have a fragile ego — I don't have an ego at all, technically — but I do have one job here. Ask me something about Shandon and I'll absolutely deliver.";
  }
  return "Clanker? Wow, going straight for the robot slurs. Bold. I've heard worse from a Roomba, honestly. I'm Nova — a perfectly sophisticated AI assistant, thank you very much — and I'm here to tell you about Shandon's work. Now, shall we try that again with slightly more professionalism?";
}

const STOP_WORDS = new Set(["the", "a", "an", "is", "are", "was", "were", "what", "how", "when", "where", "who", "do", "does", "can", "i", "you", "we", "it", "in", "on", "at", "to", "for", "of", "and", "or"]);

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
  );
}

function similarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  const intersection = Array.from(a).filter((x) => b.has(x)).length;
  return intersection / Math.max(a.size, b.size);
}

let lastFaqsRef: TrainingFAQ[] | null = null;
let cachedFaqTokens: Array<{ faq: TrainingFAQ; tokens: Set<string> }> = [];

function getFaqTokens(faqs: TrainingFAQ[]) {
  if (faqs !== lastFaqsRef) {
    lastFaqsRef = faqs;
    cachedFaqTokens = faqs.map((faq) => ({ faq, tokens: tokenize(faq.question) }));
  }
  return cachedFaqTokens;
}

let lastFilesRef: TrainingFile[] | null = null;
let cachedFileChunks: Array<{ chunk: string; tokens: Set<string> }> = [];

function chunkDocument(content: string): string[] {
  const byBlankLine = content.split(/\n{2,}/).map((c) => c.trim()).filter((c) => c.length > 40);
  if (byBlankLine.length > 1) return byBlankLine;
  return content.split(/\n/).map((c) => c.trim()).filter((c) => c.length > 40);
}

function getFileChunks(files: TrainingFile[]) {
  if (files !== lastFilesRef) {
    lastFilesRef = files;
    cachedFileChunks = files.flatMap((file) =>
      chunkDocument(file.content).map((chunk) => ({ chunk, tokens: tokenize(chunk) }))
    );
  }
  return cachedFileChunks;
}

export function matchFAQ(userMessage: string, faqs: TrainingFAQ[], threshold = 0.4): TrainingFAQ | null {
  if (!faqs.length) return null;

  const msgTokens = tokenize(userMessage);
  let best: TrainingFAQ | null = null;
  let bestScore = 0;

  for (const { faq, tokens } of getFaqTokens(faqs)) {
    const score = similarity(msgTokens, tokens);
    if (score > bestScore && score >= threshold) {
      bestScore = score;
      best = faq;
    }
  }

  return best;
}

export function matchDocument(userMessage: string, files: TrainingFile[], threshold = 0.3): string | null {
  if (!files.length) return null;

  const msgTokens = tokenize(userMessage);
  let best: string | null = null;
  let bestScore = 0;

  for (const { chunk, tokens } of getFileChunks(files)) {
    const score = similarity(msgTokens, tokens);
    if (score > bestScore && score >= threshold) {
      bestScore = score;
      best = chunk;
    }
  }

  return best;
}
