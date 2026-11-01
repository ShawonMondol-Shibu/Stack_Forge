import { create } from "zustand";
import { createDemoConversations } from "@/lib/mockMessages";
import type { ChatMessage, Conversation } from "@/lib/types/message-type";

interface MessageStore {
  conversations: Conversation[];
  activeId: string | null;
  isReady: boolean;
  // Loads conversations once. Swap the body for an API call when the
  // messages backend exists (see TODO below).
  init: () => void;
  setActive: (id: string | null) => void;
  sendMessage: (conversationId: string, text: string) => void;
}

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const useMessageStore = create<MessageStore>()((set, get) => ({
  conversations: [],
  activeId: null,
  isReady: false,

  // TODO: replace with `messageService.getConversations()` once the API exists.
  // It runs on the client only (called from useEffect), so the relative
  // timestamps never cause a server/client hydration mismatch.
  init: () => {
    if (get().isReady) return;
    set({ conversations: createDemoConversations(), isReady: true });
  },

  setActive: (id) =>
    set((state) => ({
      activeId: id,
      // Opening a conversation marks it as read.
      conversations: id
        ? state.conversations.map((conversation) =>
            conversation.id === id
              ? { ...conversation, unreadCount: 0 }
              : conversation,
          )
        : state.conversations,
    })),

  // TODO: replace with `messageService.send()` (optimistic update + rollback).
  sendMessage: (conversationId, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const message: ChatMessage = {
      id: createId(),
      sender: "me",
      text: trimmed,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      conversations: state.conversations.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, messages: [...conversation.messages, message] }
          : conversation,
      ),
    }));
  },
}));
