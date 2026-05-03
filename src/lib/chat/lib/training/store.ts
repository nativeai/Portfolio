import fs from "fs";
import path from "path";

export interface TrainingFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface TrainingPronunciation {
  id: string;
  word: string;
  pronunciation: string;
}

export interface TrainingFile {
  id: string;
  name: string;
  content: string;
  uploadedAt: string;
}

export interface TrainingLink {
  id: string;
  label: string;
  url: string;
}

export interface TrainingData {
  company: {
    agentName: string;
    greeting: string;
    name: string;
    description: string;
    services: string;
    targetAudience: string;
    uniqueValue: string;
    website: string;
  };
  faqs: TrainingFAQ[];
  files: TrainingFile[];
  pronunciations: TrainingPronunciation[];
  links: TrainingLink[];
  blocklist: string[];
}

function resolveDataPath(): string {
  return process.env.TALKIVO_DATA_PATH ?? path.join(process.cwd(), "data", "talkivo", "training.json");
}

const DEFAULT_DATA: TrainingData = {
  company: { agentName: "", greeting: "", name: "", description: "", services: "", targetAudience: "", uniqueValue: "", website: "" },
  faqs: [],
  files: [],
  pronunciations: [],
  links: [],
  blocklist: [],
};

export function getTrainingData(): TrainingData {
  try {
    const p = resolveDataPath();
    if (!fs.existsSync(p)) return DEFAULT_DATA;
    return { ...DEFAULT_DATA, ...JSON.parse(fs.readFileSync(p, "utf-8")) };
  } catch {
    return DEFAULT_DATA;
  }
}

export function saveTrainingData(data: TrainingData): void {
  const p = resolveDataPath();
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf-8");
}

export function applyPronunciations(text: string, pronunciations: TrainingPronunciation[]): string {
  let result = text;
  for (const p of pronunciations) {
    if (!p.word.trim() || !p.pronunciation.trim()) continue;
    const escaped = p.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(`\\b${escaped}\\b`, "gi"), p.pronunciation);
  }
  return result;
}

export function resolveGreeting(greeting: string, data: TrainingData): string {
  return greeting
    .replace(/\{\{agentName\}\}/g, data.company.agentName || "")
    .replace(/\{\{companyName\}\}/g, data.company.name || "")
    .replace(/\{\{website\}\}/g, data.company.website || "")
    .replace(/\{\{services\}\}/g, data.company.services || "")
    .trim();
}

export function buildSystemContext(data: TrainingData): string {
  const parts: string[] = [];

  if (data.company.agentName) parts.push(`Your name is ${data.company.agentName}. Always introduce yourself by this name.`);

  parts.push("BUSINESS KNOWLEDGE BASE:");

  if (data.company.name) parts.push(`Company: ${data.company.name}`);
  if (data.company.description) parts.push(`About: ${data.company.description}`);
  if (data.company.services) parts.push(`Services: ${data.company.services}`);
  if (data.company.targetAudience) parts.push(`Target audience: ${data.company.targetAudience}`);
  if (data.company.uniqueValue) parts.push(`Value proposition: ${data.company.uniqueValue}`);
  if (data.company.website) parts.push(`Website: ${data.company.website}`);

  if ((data.links ?? []).length > 0) {
    parts.push("\nSHAREABLE LINKS — include the full URL in your response when relevant, never read the URL aloud:");
    for (const link of data.links) {
      parts.push(`- ${link.label}: ${link.url}`);
    }
  }

  if (data.files.length > 0) {
    for (const file of data.files) {
      parts.push(`\n--- ${file.name} ---\n${file.content}`);
    }
  }

  return parts.join("\n");
}
