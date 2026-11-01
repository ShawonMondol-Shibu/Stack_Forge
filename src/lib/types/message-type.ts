export type ChatSender = "me" | "them";

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  createdAt: string; // ISO date string
}

export interface ChatParticipant {
  id: string;
  name: string;
  headline: string;
  avatarUrl: string | null;
  online: boolean;
}

export interface Conversation {
  id: string;
  participant: ChatParticipant;
  messages: ChatMessage[];
  unreadCount: number;
}
