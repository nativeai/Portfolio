export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

export interface ChatSession {
  id: string;
  widgetId: string;
  messages: ChatMessage[];
  visitorName?: string;
  visitorEmail?: string;
  createdAt: Date;
}
