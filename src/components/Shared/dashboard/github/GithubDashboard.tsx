"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
import {
  Activity,
  ArrowUpRight,
  GitBranch,
  GitFork,
  Globe2,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useGithubDashboard } from "@/hooks/queries/use-github";
import { eventLabel, formatRelativeDate } from "@/lib/github";
import type { GithubActivity, GithubRepository } from "@/lib/types/github";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function MetricCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <Card className="shadow-none">
      <CardContent className="flex items-center justify-between p-5">
        <div><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-semibold tracking-tight">{value.toLocaleString()}</p></div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">{icon}</div>
      </CardContent>
    </Card>
  );
}

function RepositoryCard({ repository }: { repository: GithubRepository }) {
  return (
    <Card className="group border-border/70 shadow-none transition-colors hover:border-border hover:bg-muted/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <GitBranch className="size-4 shrink-0 text-muted-foreground" />
              <CardTitle className="truncate text-base font-semibold">
                {repository.name}
              </CardTitle>
              <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {repository.private ? "Private" : "Public"}
              </span>
            </div>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {repository.fullName}
            </p>
          </div>
          <Button
            render={
              <a
                href={repository.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${repository.name} on GitHub`}
              />
            }
            variant="ghost"
            size="icon-sm"
            className="shrink-0"
          >
            <ArrowUpRight />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
          {repository.description || "No description provided."}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          {repository.language && (
            <span className="font-medium text-foreground">{repository.language}</span>
          )}
          <span className="inline-flex items-center gap-1.5"><Star className="size-3.5" />{repository.stars}</span>
          <span className="inline-flex items-center gap-1.5"><GitFork className="size-3.5" />{repository.forks}</span>
          <span>{formatRelativeDate(repository.updatedAt)}</span>
        </div>
        {repository.topics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {repository.topics.slice(0, 4).map((topic) => (
              <span key={topic} className="rounded-md bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                {topic}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function GithubActivityList({ activity }: { activity: GithubActivity[] }) {
  if (!activity.length) {
    return <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">No recent public activity found.</div>;
  }

  return (
    <div className="divide-y rounded-xl border">
      {activity.map((item) => (
        <div key={item.id} className="flex items-center gap-4 px-4 py-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
            <Activity className="size-4 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{eventLabel(item)}</p>
            <p className="truncate text-xs text-muted-foreground">{item.repository}</p>
          </div>
          <time className="shrink-0 text-xs text-muted-foreground">{formatRelativeDate(item.createdAt)}</time>
        </div>
      ))}
    </div>
  );
}

export default function GithubDashboard() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("overview");
  const [isConnecting, setIsConnecting] = useState(false);
  const { resolvedTheme } = useTheme();

  const query = useGithubDashboard();

  const repositories = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return query.data?.repositories ?? [];
    return (query.data?.repositories ?? []).filter((repo) =>
      [repo.name, repo.description ?? "", repo.language ?? "", ...repo.topics]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query.data?.repositories, search]);

  const connectGithub = async () => {
    if (isConnecting) return;
    setIsConnecting(true);
    try {
      const { error } = await authClient.linkSocial({
        provider: "github",
        callbackURL: `${window.location.origin}/dashboard/github`,
      });
      if (error) throw new Error(error.message);
    } catch (error) {
      toast.add({
        type: "error",
        title:
          error instanceof Error && error.message
            ? error.message
            : "Could not connect GitHub",
      });
      setIsConnecting(false);
    }
  };

  if (query.isLoading) {
    return (
      <main className="space-y-6">
        <div className="h-24 animate-pulse rounded-2xl bg-muted" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-28 animate-pulse rounded-2xl bg-muted" />)}
        </div>
        <div className="h-72 animate-pulse rounded-2xl bg-muted" />
      </main>
    );
  }

  if (query.isError) {
    return (
      <main className="flex min-h-[420px] items-center justify-center">
        <Card className="max-w-md text-center shadow-none">
          <CardHeader>
            <CardTitle>GitHub data could not be loaded</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{query.error instanceof Error ? query.error.message : "Something went wrong."}</p>
            <div className="flex items-center justify-center gap-2">
              <Button onClick={() => query.refetch()} disabled={query.isFetching}>
                <RefreshCw className={query.isFetching ? "animate-spin" : ""} /> Retry
              </Button>
              <Button variant="outline" onClick={connectGithub} disabled={isConnecting}>
                <FaGithub /> {isConnecting ? "Redirecting..." : "Reconnect GitHub"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  const data = query.data;

  if (!data?.connected || !data.profile) {
    return (
      <main className="mx-auto flex min-h-[620px] max-w-3xl items-center justify-center py-10">
        <Card className="w-full overflow-hidden border-border/70 shadow-sm">
          <CardContent className="p-8 text-center md:p-12">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-foreground text-background">
              <FaGithub className="size-8" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">GitHub workspace</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Bring your GitHub work into Stack Forge.</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              Connect your GitHub account to see repositories, activity, contribution history, and account metrics without leaving your developer workspace.
            </p>
            <Button className="mt-7" onClick={connectGithub} disabled={isConnecting}>
              <FaGithub /> {isConnecting ? "Redirecting..." : "Connect GitHub"}
            </Button>
            <div className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-5 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-3.5" /> OAuth</span>
              <span className="inline-flex items-center gap-1.5"><GitBranch className="size-3.5" /> Repositories</span>
              <span className="inline-flex items-center gap-1.5"><Activity className="size-3.5" /> Activity</span>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  const profile = data.profile;
  // Count only repos the user owns, not repos they forked from others
  const ownRepositories = data.repositories.filter((repo) => !repo.fork);
  const totalStars = ownRepositories.reduce((sum, repo) => sum + repo.stars, 0);
  const totalForks = ownRepositories.reduce((sum, repo) => sum + repo.forks, 0);

  return (
    <main className="space-y-6 pb-10">
      <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div className="flex items-start gap-4">
          <Image src={profile.avatarUrl} alt={profile.name || profile.login} width={56} height={56} className="size-14 rounded-2xl border object-cover" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">GitHub</h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400"><span className="size-1.5 rounded-full bg-emerald-500" /> Connected</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">@{profile.login} · {profile.name || "GitHub account"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => query.refetch()} disabled={query.isFetching}>
            <RefreshCw className={query.isFetching ? "animate-spin" : ""} /> Refresh
          </Button>
          <Button
            render={<a href={profile.profileUrl} target="_blank" rel="noreferrer" />}
            size="sm"
          >
            Open GitHub <ArrowUpRight />
          </Button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Repositories" value={data.repositories.length} icon={<GitBranch />} />
        <MetricCard label="Stars" value={totalStars} icon={<Star />} />
        <MetricCard label="Followers" value={profile.followers} icon={<Users />} />
        <MetricCard label="Following" value={profile.following} icon={<Users />} />
      </section>

      <Tabs value={tab} onValueChange={setTab} className="gap-5">
        <TabsList variant="line" className="w-full justify-start border-b rounded-none px-0">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-5">
          <div className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
            <Card className="shadow-none">
              <CardHeader><CardTitle className="text-base">Contribution history</CardTitle></CardHeader>
              <CardContent className="overflow-x-auto pb-6">
                <GitHubCalendar username={profile.login} colorScheme={resolvedTheme === "dark" ? "dark" : "light"} blockSize={12} blockMargin={4} fontSize={12} />
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {profile.bio && <p className="text-sm leading-6 text-muted-foreground">{profile.bio}</p>}
                <div className="space-y-3 text-sm">
                  {profile.location && <div className="flex gap-2 text-muted-foreground"><MapPin className="size-4 shrink-0" /> {profile.location}</div>}
                  {profile.company && <div className="flex gap-2 text-muted-foreground"><GitBranch className="size-4 shrink-0" /> {profile.company}</div>}
                  {profile.website && <a className="flex gap-2 text-muted-foreground hover:text-foreground" href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`} target="_blank" rel="noreferrer"><Globe2 className="size-4 shrink-0" /> Website</a>}
                </div>
                <div className="grid grid-cols-2 gap-3 border-t pt-4 text-sm">
                  <div><p className="text-xs text-muted-foreground">Public repos</p><p className="mt-1 font-semibold">{profile.publicRepos}</p></div>
                  <div><p className="text-xs text-muted-foreground">Forks received</p><p className="mt-1 font-semibold">{totalForks}</p></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between"><h2 className="text-base font-semibold">Recently updated</h2><Button variant="ghost" size="sm" onClick={() => setTab("repositories")}>View all <ArrowUpRight /></Button></div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.repositories.slice(0, 3).map((repo) => <RepositoryCard key={repo.id} repository={repo} />)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="repositories" className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="text-base font-semibold">Repositories</h2><p className="text-xs text-muted-foreground">{data.repositories.length} repositories available through your connected account.</p></div>
            <div className="relative w-full sm:w-72"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search repositories..." className="pl-9" /></div>
          </div>
          {repositories.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{repositories.map((repo) => <RepositoryCard key={repo.id} repository={repo} />)}</div> : <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">No repositories match your search.</div>}
        </TabsContent>

        <TabsContent value="activity" className="space-y-5">
          <div><h2 className="text-base font-semibold">Recent activity</h2><p className="text-xs text-muted-foreground">Public GitHub events from your connected account.</p></div>
          <GithubActivityList activity={data.activity} />
        </TabsContent>
      </Tabs>
    </main>
  );
}