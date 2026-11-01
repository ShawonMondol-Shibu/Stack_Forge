"use client";

import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { cn } from "@/lib/utils";
import {
  formatBubbleTime,
  formatDayLabel,
  getInitials,
  isSameDay,
} from "@/lib/messages";
import type { Conversation } from "@/lib/types/message-type";

interface ChatThreadProps {
  conversation: Conversation;
  onBack: () => void;
  onSend: (text: string) => void;
}

export default function ChatThread({ conversation, onBack, onSend }: ChatThreadProps) {
  const [draft, setDraft] = useState("");
  const { participant, messages } = conversation;

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    onSend(text);
    setDraft("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // isComposing keeps Enter from sending while an IME (e.g. Bangla) is mid-word.
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <>
      <header className="flex items-center gap-3 border-b px-4 py-3">
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={onBack}
          aria-label="Back to conversations"
        >
          <ArrowLeft />
        </Button>
        <Avatar size="lg">
          {participant.avatarUrl && (
            <AvatarImage src={participant.avatarUrl} alt={participant.name} />
          )}
          <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
          {participant.online && <AvatarBadge />}
        </Avatar>
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold">{participant.name}</h2>
          <p className="truncate text-xs text-muted-foreground">
            {participant.online ? "Online" : participant.headline}
          </p>
        </div>
      </header>

      <div className="min-h-0 flex-1">
        {/* key resets scroll position to the bottom when switching conversations */}
        <MessageScrollerProvider key={conversation.id} defaultScrollPosition="end">
          <MessageScroller className="h-full">
            <MessageScrollerViewport>
              <MessageScrollerContent className="gap-1 px-4 py-4">
                {messages.length === 0 && (
                  <p className="m-auto text-sm text-muted-foreground">
                    No messages yet. Say hello to {participant.name.split(" ")[0]}!
                  </p>
                )}

                {messages.map((message, index) => {
                  const previous = messages[index - 1];
                  const next = messages[index + 1];
                  const isMine = message.sender === "me";
                  const isNewDay =
                    !previous ||
                    !isSameDay(new Date(previous.createdAt), new Date(message.createdAt));
                  const isLastInGroup =
                    !next ||
                    next.sender !== message.sender ||
                    !isSameDay(new Date(next.createdAt), new Date(message.createdAt));

                  return (
                    <MessageScrollerItem key={message.id} messageId={message.id}>
                      {isNewDay && (
                        <div className="my-3 flex justify-center">
                          <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
                            {formatDayLabel(message.createdAt)}
                          </span>
                        </div>
                      )}

                      <Message
                        align={isMine ? "end" : "start"}
                        className={cn("items-end", !isLastInGroup && "pb-0")}
                      >
                        {!isMine &&
                          (isLastInGroup ? (
                            <MessageAvatar>
                              <Avatar size="sm">
                                {participant.avatarUrl && (
                                  <AvatarImage src={participant.avatarUrl} alt={participant.name} />
                                )}
                                <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
                              </Avatar>
                            </MessageAvatar>
                          ) : (
                            <div className="w-8 shrink-0" aria-hidden="true" />
                          ))}

                        <MessageContent className="w-auto max-w-[85%] sm:max-w-[75%]">
                          <Bubble variant={isMine ? "default" : "muted"} align={isMine ? "end" : "start"}>
                            <BubbleContent className="whitespace-pre-wrap">
                              {message.text}
                            </BubbleContent>
                          </Bubble>
                          {isLastInGroup && (
                            <MessageFooter>
                              <time dateTime={message.createdAt}>
                                {formatBubbleTime(message.createdAt)}
                              </time>
                            </MessageFooter>
                          )}
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  );
                })}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        className="flex items-end gap-2 border-t p-3"
      >
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder={`Message ${participant.name.split(" ")[0]}...`}
          aria-label="Write a message"
          className="max-h-32 min-h-10 py-2.5"
        />
        <Button type="submit" size="icon" disabled={!draft.trim()} aria-label="Send message">
          <Send />
        </Button>
      </form>
    </>
  );
}
