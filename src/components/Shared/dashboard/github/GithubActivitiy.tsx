"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Circle, Star } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { useGithubDashboard } from "@/hooks/queries/use-github";
import { formatRelativeDate } from "@/lib/github";

const PINNED_COUNT = 4;
const PUSH_COUNT = 5;

function EmptyText({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground">{children}</p>;
}

export default function GithubActivitiy() {
  const { data, isLoading, isError, error, refetch } = useGithubDashboard();
  const { resolvedTheme } = useTheme();

  if (isLoading) {
    return (
      <Card size="sm" className="w-full gap-1">
        <CardHeader>
          <CardTitle className="text-xl">GitHub Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-24 animate-pulse rounded-2xl bg-muted" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 animate-pulse rounded-2xl bg-muted" />
            <div className="h-32 animate-pulse rounded-2xl bg-muted" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card size="sm" className="w-full gap-1">
        <CardHeader>
          <CardTitle className="text-xl">GitHub Activity</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-3">
          <EmptyText>
            {error instanceof Error ? error.message : "Could not load GitHub data."}
          </EmptyText>
          <Button size="sm" variant="outline" onClick={() => refetch()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!data?.connected || !data.profile) {
    return (
      <Card size="sm" className="w-full gap-1">
        <CardHeader>
          <CardTitle className="text-xl">GitHub Activity</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-3">
          <EmptyText>
            Connect your GitHub account to see contributions, top repositories
            and recent pushes here.
          </EmptyText>
          <Button size="sm" render={<Link href="/dashboard/github" />}>
            Connect GitHub
          </Button>
        </CardContent>
      </Card>
    );
  }

  // GitHub's REST API has no "pinned" endpoint, so show the most-starred
  // repositories you own (most recently updated wins a tie).
  const topRepositories = data.repositories
    .filter((repo) => !repo.fork)
    .sort(
      (a, b) =>
        b.stars - a.stars ||
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, PINNED_COUNT);

  const recentPushes = data.activity
    .filter((event) => event.type === "PushEvent")
    .slice(0, PUSH_COUNT);

  return (
    <Card size="sm" className="w-full gap-1">
      <CardHeader>
        <CardTitle className="text-xl">GitHub Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <section className="overflow-x-auto">
          <GitHubCalendar
            username={data.profile.login}
            colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
            blockSize={8}
            blockMargin={3}
            showTotalCount
          />
        </section>

        <section className="grid grid-cols-2 items-start gap-4">
          {/* Top repositories */}
          <div>
            <h2 className="text-md font-semibold">Top Repositories</h2>
            {topRepositories.length ? (
              <ItemGroup>
                {topRepositories.map((repo) => (
                  <Item
                    key={repo.id}
                    size="xs"
                    className="p-1"
                    render={
                      <a href={repo.url} target="_blank" rel="noreferrer" />
                    }
                  >
                    <ItemMedia>
                      <Avatar>
                        <AvatarFallback>
                          {repo.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="text-xs">{repo.name}</ItemTitle>
                      <ItemDescription className="text-xs">
                        {repo.language || "No language"}
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions className="text-muted-foreground">
                      <Star size={12} /> {repo.stars}
                    </ItemActions>
                  </Item>
                ))}
              </ItemGroup>
            ) : (
              <EmptyText>No repositories yet.</EmptyText>
            )}
          </div>

          {/* Recent pushes */}
          <div>
            <h2 className="text-md font-semibold">Recent Pushes</h2>
            {recentPushes.length ? (
              <ItemGroup>
                {recentPushes.map((event) => (
                  <Item key={event.id} size="xs" className="p-1">
                    <ItemMedia>
                      <Circle size={8} />
                    </ItemMedia>
                    <ItemContent>
                      <div className="flex items-center justify-between gap-2">
                        <ItemTitle className="min-w-0 truncate text-xs">
                          {event.repository}
                        </ItemTitle>
                        <small className="shrink-0 text-muted-foreground">
                          {formatRelativeDate(event.createdAt)}
                        </small>
                      </div>
                    </ItemContent>
                  </Item>
                ))}
              </ItemGroup>
            ) : (
              <EmptyText>No recent pushes.</EmptyText>
            )}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}