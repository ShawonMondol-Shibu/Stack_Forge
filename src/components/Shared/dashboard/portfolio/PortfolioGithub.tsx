"use client";

import { GitHubCalendar } from "react-github-calendar";

function getGithubUsername(website?: string | null) {
  if (!website) return null;

  try {
    const url = new URL(
      /^https?:\/\//.test(website) ? website : `https://${website}`,
    );
    if (url.hostname !== "github.com" && url.hostname !== "www.github.com") {
      return null;
    }

    const username = url.pathname.split("/").filter(Boolean)[0];
    return username && username !== "settings" ? username : null;
  } catch {
    return null;
  }
}

export default function PortfolioGithub({
  website,
}: {
  website?: string | null;
}) {
  const username = getGithubUsername(website);

  return (
    <section className="min-w-0 border-t border-border/70 pt-6">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase text-primary">
          Open source
        </p>
        <h2 className="mt-1 text-2xl font-semibold">GitHub activity</h2>
      </div>
      <div className="min-w-0 overflow-x-auto">
        {username ? (
          <GitHubCalendar
            username={username}
            blockSize={8}
            blockMargin={3}
            showTotalCount
            colorScheme="light"
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Add a GitHub profile link to show contribution activity.
          </p>
        )}
      </div>
    </section>
  );
}
