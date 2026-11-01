"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatListTime, getInitials, getLastMessage } from "@/lib/messages";
import type { Conversation } from "@/lib/types/message-type";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  isReady: boolean;
  onSelect: (id: string) => void;
}

export default function ConversationList({
  conversations,
  activeId,
  isReady,
  onSelect,
}: ConversationListProps) {
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();

    return conversations
      .filter((conversation) => {
        if (!query) return true;
        const last = getLastMessage(conversation);
        return (
          conversation.participant.name.toLowerCase().includes(query) ||
          (last?.text.toLowerCase().includes(query) ?? false)
        );
      })
      .sort((a, b) => {
        // Newest activity first; empty conversations go last.
        const aTime = getLastMessage(a)?.createdAt ?? "";
        const bTime = getLastMessage(b)?.createdAt ?? "";
        return bTime.localeCompare(aTime);
      });
  }, [conversations, search]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="space-y-3 p-4">
        <h1 className="text-xl font-semibold">Messages</h1>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search conversations..."
            aria-label="Search conversations"
            className="pl-9"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
        {!isReady ? (
          <div className="space-y-2 p-2">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-14" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <p className="p-6 text-center text-sm text-muted-foreground">
            {search ? "No conversations match your search." : "No conversations yet."}
          </p>
        ) : (
          <ul className="space-y-1">
            {visible.map((conversation) => {
              const last = getLastMessage(conversation);
              const isActive = conversation.id === activeId;
              const { participant } = conversation;

              return (
                <li key={conversation.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(conversation.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
                      isActive && "bg-muted",
                    )}
                  >
                    <Avatar size="lg">
                      {participant.avatarUrl && (
                        <AvatarImage src={participant.avatarUrl} alt={participant.name} />
                      )}
                      <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
                      {participant.online && <AvatarBadge />}
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={cn(
                            "truncate text-sm",
                            conversation.unreadCount > 0 ? "font-semibold" : "font-medium",
                          )}
                        >
                          {participant.name}
                        </p>
                        {last && (
                          <time className="shrink-0 text-[11px] text-muted-foreground">
                            {formatListTime(last.createdAt)}
                          </time>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-xs text-muted-foreground">
                          {last
                            ? `${last.sender === "me" ? "You: " : ""}${last.text}`
                            : "No messages yet"}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <span
                            className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground"
                            aria-label={`${conversation.unreadCount} unread messages`}
                          >
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
