import type { Conversation } from "@/lib/types/message-type";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// Demo conversations until the messages API exists.
// Timestamps are relative to "now" so the list always looks fresh.
export function createDemoConversations(now = Date.now()): Conversation[] {
  const at = (msAgo: number) => new Date(now - msAgo).toISOString();

  return [
    {
      id: "c1",
      participant: {
        id: "u1",
        name: "Nadia Rahman",
        headline: "Frontend Engineer",
        avatarUrl: null,
        online: true,
      },
      unreadCount: 2,
      messages: [
        { id: "c1m1", sender: "them", text: "Hey! I saw your portfolio, the project cards look great.", createdAt: at(2 * DAY) },
        { id: "c1m2", sender: "me", text: "Thanks Nadia! I rebuilt them last week with the new card component.", createdAt: at(2 * DAY - 5 * MINUTE) },
        { id: "c1m3", sender: "them", text: "Are you open to a quick pairing session on the dashboard?", createdAt: at(12 * MINUTE) },
        { id: "c1m4", sender: "them", text: "I can do any time after 4 PM.", createdAt: at(11 * MINUTE) },
      ],
    },
    {
      id: "c2",
      participant: {
        id: "u2",
        name: "Arif Hossain",
        headline: "Backend Developer",
        avatarUrl: null,
        online: true,
      },
      unreadCount: 0,
      messages: [
        { id: "c2m1", sender: "me", text: "The GitHub endpoint is returning 503 when the token is revoked.", createdAt: at(5 * HOUR) },
        { id: "c2m2", sender: "them", text: "Good catch. I'll return connected: false for a 401 instead.", createdAt: at(4 * HOUR) },
        { id: "c2m3", sender: "me", text: "Perfect, that lets the UI show the reconnect card.", createdAt: at(4 * HOUR - 2 * MINUTE) },
      ],
    },
    {
      id: "c3",
      participant: {
        id: "u3",
        name: "Sumaiya Akter",
        headline: "UI/UX Designer",
        avatarUrl: null,
        online: false,
      },
      unreadCount: 1,
      messages: [
        { id: "c3m1", sender: "them", text: "I shared the new messages page mockups in Figma.", createdAt: at(1 * DAY + 2 * HOUR) },
        { id: "c3m2", sender: "me", text: "Looking now, the two-pane layout feels right.", createdAt: at(1 * DAY + HOUR) },
        { id: "c3m3", sender: "them", text: "Let me know if the spacing needs another pass.", createdAt: at(1 * DAY) },
      ],
    },
    {
      id: "c4",
      participant: {
        id: "u4",
        name: "Tanvir Ahmed",
        headline: "DevOps Engineer",
        avatarUrl: null,
        online: false,
      },
      unreadCount: 0,
      messages: [
        { id: "c4m1", sender: "them", text: "Deployment to staging is done. Please test the login flow.", createdAt: at(3 * DAY) },
        { id: "c4m2", sender: "me", text: "Logged in fine from Chrome. I'll check Safari tomorrow.", createdAt: at(3 * DAY - HOUR) },
      ],
    },
    {
      id: "c5",
      participant: {
        id: "u5",
        name: "Mahin Chowdhury",
        headline: "Full Stack Developer",
        avatarUrl: null,
        online: false,
      },
      unreadCount: 0,
      messages: [],
    },
  ];
}
