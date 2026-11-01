import type { Conversation } from "@/lib/types/message-type";

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

// Time shown inside a message bubble footer, e.g. "3:42 PM"
export function formatBubbleTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

// Time shown in the conversation list: time today, "Yesterday", else "Nov 2"
export function formatListTime(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  if (isSameDay(date, now)) return formatBubbleTime(iso);

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// Day separator label inside a thread
export function formatDayLabel(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  if (isSameDay(date, now)) return "Today";

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getLastMessage(conversation: Conversation) {
  return conversation.messages[conversation.messages.length - 1];
}
