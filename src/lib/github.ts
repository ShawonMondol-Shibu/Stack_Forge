import type { GithubActivity } from "@/lib/types/github";

export function formatRelativeDate(value: string) {
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.max(1, Math.floor(diff / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function eventLabel(event: GithubActivity) {
  return event.type
    .replace(/Event$/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2");
}
