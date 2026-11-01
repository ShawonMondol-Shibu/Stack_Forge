"use client";

import { useEffect } from "react";
import { MessagesSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMessageStore } from "@/store/useMessageStore";
import ChatThread from "./ChatThread";
import ConversationList from "./ConversationList";

export default function MessagesPage() {
  const conversations = useMessageStore((state) => state.conversations);
  const activeId = useMessageStore((state) => state.activeId);
  const isReady = useMessageStore((state) => state.isReady);
  const init = useMessageStore((state) => state.init);
  const setActive = useMessageStore((state) => state.setActive);
  const sendMessage = useMessageStore((state) => state.sendMessage);

  useEffect(() => {
    init();
  }, [init]);

  const active = conversations.find((conversation) => conversation.id === activeId) ?? null;

  return (
    <Card className="h-[calc(100dvh-9rem)] min-h-[480px] w-full flex-row gap-0 overflow-hidden py-0">
      {/* Conversation list: full width on mobile, hidden when a thread is open */}
      <aside
        className={cn(
          "min-h-0 w-full shrink-0 flex-col border-r md:flex md:w-80 lg:w-96",
          active ? "hidden" : "flex",
        )}
      >
        <ConversationList
          conversations={conversations}
          activeId={activeId}
          isReady={isReady}
          onSelect={setActive}
        />
      </aside>

      <section className={cn("min-h-0 min-w-0 flex-1 flex-col md:flex", active ? "flex" : "hidden")}>
        {active ? (
          <ChatThread
            conversation={active}
            onBack={() => setActive(null)}
            onSend={(text) => sendMessage(active.id, text)}
          />
        ) : (
          <div className="m-auto flex flex-col items-center gap-3 p-6 text-center text-muted-foreground">
            <MessagesSquare className="size-10" />
            <div>
              <p className="text-sm font-medium text-foreground">Select a conversation</p>
              <p className="text-xs">Choose someone from the list to start chatting.</p>
            </div>
          </div>
        )}
      </section>
    </Card>
  );
}
