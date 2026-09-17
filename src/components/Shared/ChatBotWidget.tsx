"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Chatbot from "@/components/Shared/ChatBot";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageScrollerProvider } from "@/components/ui/message-scroller";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowButton(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          showButton && !isOpen
            ? "translate-y-0 opacity-100 animate-bounce"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <Button
          size="icon-lg"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-full shadow-lg"
        >
          {isOpen ? (
            <X className="size-5" />
          ) : (
            <Avatar className="animate-pulse">
              <AvatarImage
                src="/only_logo.png"
                alt="Chatbot Avatar"
                className={'p-1'}
              />
              <AvatarFallback>
                <MessageSquare className="size-5" />
              </AvatarFallback>
            </Avatar>
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-end p-6 md:p-10">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
          <div className="relative flex flex-col gap-4">
            <Card className="relative z-10 w-full max-w-md h-[50vh] border-transparent rounded-2xl bg-background backdrop-blur-sm shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200">
              <CardHeader className="flex items-center justify-between border-b px-4 py-3 gap-1">
                <CardTitle className="text-sm font-semibold">
                 Stack Forge
                </CardTitle>
                
                <CardDescription>How can i help you today?</CardDescription>
                <CardAction>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          <X className="size-4" />
                        </Button>
                      }
                    />
                    <TooltipContent>
                      <p>Close</p>
                    </TooltipContent>
                  </Tooltip>
                </CardAction>
              </CardHeader>
              <MessageScrollerProvider>
                <Chatbot />
              </MessageScrollerProvider>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}