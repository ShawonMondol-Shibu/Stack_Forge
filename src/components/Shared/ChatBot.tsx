"use client";

import React from "react";
import { Loader, Send, Square } from "lucide-react";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function Chatbot() {
  const [input, setInput] = React.useState("");

  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_BACKEND_API_KEY}/ai`,
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = input.trim();

    if (!text || isLoading) {
      return;
    }

    sendMessage({ text });
    setInput("");
  };

  return (
    <>
      <CardContent className="min-h-0 flex-1 overflow-hidden px-3 py-3">
        <MessageScroller className="h-full">
          <MessageScrollerViewport>
            <MessageScrollerContent className="gap-4 pb-2">
              {error && (
                <MessageScrollerItem>
                  <div
                    role="alert"
                    className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
                  >
                    {error.message}
                  </div>
                </MessageScrollerItem>
              )}

              {messages.map((message, messageIndex) => {
                const isUser = message.role === "user";
                const isStreamingMessage =
                  status === "streaming" &&
                  !isUser &&
                  messageIndex === messages.length - 1;

                return (
                  <MessageScrollerItem key={message.id} className="px-1 py-1">
                    <Message
                      align={isUser ? "end" : "start"}
                      className="items-end gap-2"
                    >
                      {!isUser && (
                        <MessageAvatar className="mb-1">
                          <Avatar size="sm">
                            <AvatarImage src="/logo.svg" alt="Stack Forge" />
                            <AvatarFallback>SF</AvatarFallback>
                          </Avatar>
                        </MessageAvatar>
                      )}

                      <MessageContent className="w-auto max-w-[85%] sm:max-w-[75%]">
                        <span
                          className={cn(
                            "mb-1 px-1 text-[11px] font-medium text-muted-foreground",
                            isUser && "text-right",
                          )}
                        >
                          {isUser ? "You" : "Stack Forge"}
                        </span>

                        <Bubble
                          variant={isUser ? "outline" : "default"}
                          align={isUser ? "end" : "start"}
                          className="max-w-full"
                        >
                          <BubbleContent
                            aria-live={
                              isStreamingMessage ? "polite" : undefined
                            }
                            className={cn(
                              "wrap-break-word whitespace-pre-wrap",
                              isUser
                                ? "border-primary/20 bg-primary/10"
                                : "border-orange-500/20 bg-orange-500/10 text-foreground",
                            )}
                          >
                            {message.parts.map((part, partIndex) => {
                              if (part.type !== "text") {
                                return null;
                              }

                              return (
                                <span key={`${message.id}-${partIndex}`}>
                                  {part.text}
                                </span>
                              );
                            })}

                            {isStreamingMessage && (
                              <span
                                aria-hidden="true"
                                className="ml-1 inline-block h-4 w-1 animate-pulse rounded-sm bg-current align-middle"
                              />
                            )}
                          </BubbleContent>
                        </Bubble>
                      </MessageContent>

                      {isUser && (
                        <MessageAvatar className="mb-1">
                          <Avatar size="sm">
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        </MessageAvatar>
                      )}
                    </Message>
                  </MessageScrollerItem>
                );
              })}

              {status === "submitted" && (
                <MessageScrollerItem className="px-1 py-1">
                  <Message align="start" className="items-end gap-2">
                    <MessageAvatar className="mb-1">
                      <Avatar size="sm">
                        <AvatarImage src="/logo.svg" alt="Stack Forge" />
                        <AvatarFallback>SF</AvatarFallback>
                      </Avatar>
                    </MessageAvatar>

                    <MessageContent className="w-auto">
                      <span className="mb-1 px-1 text-[11px] font-medium text-muted-foreground">
                        Stack Forge
                      </span>

                      <Bubble variant="secondary" align="start">
                        <BubbleContent className="px-4 py-3">
                          <Loader
                            aria-label="Generating response"
                            className="size-4 animate-spin text-muted-foreground"
                          />
                        </BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              )}
            </MessageScrollerContent>
          </MessageScrollerViewport>
        </MessageScroller>
      </CardContent>

      <CardFooter className="border-t px-3 py-3">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Enter your prompt here..."
              disabled={isLoading}
              className="min-w-0 flex-1"
            />

            {isLoading ? (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={stop}
                aria-label="Stop generating response"
              >
                <Square className="size-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <Send className="size-4" />
              </Button>
            )}
          </div>
        </form>
      </CardFooter>
    </>
  );
}
