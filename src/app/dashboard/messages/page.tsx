import type { Metadata } from "next";
import MessagesPage from "@/components/Shared/dashboard/messages/MessagesPage";

export const metadata: Metadata = {
  title: "Messages | Stack Forge",
};

export default function Page() {
  return <MessagesPage />;
}
