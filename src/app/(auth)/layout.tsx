import { CheckCircle2, GitBranch, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "@/components/ui/card";

/**
 * Auth layout: full-bleed split screen for login / signup.
 *
 * - Left: brand header, the auth form inside a Card, small footer.
 * - Right (xl+): product teaser panel spanning full page height.
 * - The panel is light/dark themeable: all colors come from theme tokens
 *   with dark: variants, so it adapts to the active theme.
 * - Below xl the panel is hidden and the form takes the full screen.
 */

const FEATURES = [
  "Showcase projects, skills, and experience",
  "GitHub activity built into your profile",
  "Track tasks and portfolio progress in one place",
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-dvh overflow-hidden grid xl:grid-cols-5 bg-background">
      {/* Form side */}
      <div className="col-span-full xl:col-span-2 h-full flex flex-col p-6 md:p-8">
        <header className="flex items-center justify-between">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={"/logo.svg"}
              alt={"Stack Forge logo"}
              width={40}
              height={26}
              priority
              className={"aspect-square drop-shadow-primary/50 drop-shadow-md"}
            />
            <span className="font-heading text-lg font-semibold tracking-tight">
              Stack Forge
            </span>
          </Link>

          <Link
            href={"/"}
            className={
              "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            }
          >
            Back to home
          </Link>
        </header>

        <Card className={"flex-1 min-h-0 gap-0 py-0"}>
          {/* m-auto centers the form, but collapses when it overflows so the
              card stays scrollable instead of clipping tall forms (signup). */}
          <div className="h-full w-full flex overflow-y-auto">
            <div className="m-auto w-full max-w-md py-4">{children}</div>
          </div>
        </Card>

        <footer className="pt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Stack Forge — Build your developer
          profile.
        </footer>
      </div>

      {/* Teaser side (hidden below xl) — follows the light / dark theme */}
      <aside
        aria-hidden="true"
        className="hidden xl:flex xl:col-span-3 relative flex-col justify-center overflow-hidden border-l bg-muted/40 dark:bg-foreground/5 px-10 2xl:px-16"
      >
        {/* Accent glow rising from the bottom, tinted with the theme's primary */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_70%_80%_at_50%_110%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_70%)] dark:bg-[radial-gradient(ellipse_70%_80%_at_50%_110%,color-mix(in_oklab,var(--primary)_32%,transparent),transparent_70%)]" />

        {/* Faint grid, fading out toward the edges */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" />

        <div className="relative mx-auto w-full max-w-xl">
          <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground dark:text-white 2xl:text-4xl">
            Your code, projects, and progress in one profile.
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground dark:text-white/60">
            Stack Forge turns your work into a living developer portfolio.
          </p>

          <ul className="mt-8 space-y-3">
            {FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-sm text-foreground/85 dark:text-white/85"
              >
                <CheckCircle2 className="size-5 shrink-0 text-primary" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-primary">
              <GitBranch className="size-3.5" /> Open source friendly
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-primary">
              <Star className="size-3.5" /> Trusted by developers
            </span>
          </div>
        </div>
      </aside>
    </main>
  );
}
