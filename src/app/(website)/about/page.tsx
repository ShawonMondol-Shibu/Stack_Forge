import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const stats = [
  { value: "12K+", label: "Developers", icon: Users },
  { value: "5K+", label: "Projects", icon: BriefcaseBusiness },
  { value: "1K+", label: "GitHub Repos", icon: Code2 },
  { value: "120+", label: "Countries", icon: Globe2 },
];

const values = [
  {
    title: "Community First",
    description: "We believe in the power of connection and collaboration.",
    icon: HeartHandshake,
  },
  {
    title: "Innovation",
    description:
      "We embrace new ideas and modern technology to build better solutions.",
    icon: Lightbulb,
  },
  {
    title: "Trust & Quality",
    description:
      "We prioritize security, reliability, and a great user experience.",
    icon: ShieldCheck,
  },
  {
    title: "Growth",
    description:
      "We are committed to helping every developer reach their full potential.",
    icon: Rocket,
  },
];

const technologies = [
  "Next.js",
  "TypeScript",
  "NestJS",
  "PostgreSQL",
  "Drizzle ORM",
  "Better Auth",
  "Tailwind CSS",
];

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 pb-10">
      <section className="relative overflow-hidden rounded-[2rem] bg-primary/5 px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="absolute -right-20 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-3 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" /> About StackForge
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Building a stronger{" "}
              <span className="text-primary">developer community</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
              StackForge is a modern platform where developers can showcase
              their work, build professional portfolios, and connect with
              like-minded creators, collaborators, and opportunities.
            </p>
            <div className="mt-9 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <strong className="block text-sm font-bold">{value}</strong>
                    <span className="text-[11px] text-muted-foreground">
                      {label}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] border border-primary/10 bg-background/60 shadow-xl shadow-primary/10" />
            <Image
              src="/brain.jpg"
              alt="Developer working at a laptop"
              width={640}
              height={480}
              className="relative aspect-4/3 w-full rounded-2xl object-cover shadow-lg"
              priority
            />
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-border bg-background p-4 shadow-lg sm:-left-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Code2 className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold">Built for builders</p>
                  <p className="text-[11px] text-muted-foreground">
                    Share. Grow. Connect.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-muted/30 p-3">
          <Image
            src="/project.png"
            alt="A developer project preview"
            width={900}
            height={620}
            className="aspect-4/3 w-full rounded-2xl object-cover"
          />
        </div>
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
            <span className="size-1.5 rounded-full bg-primary" /> Our story
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From idea to impact
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            StackForge started with a simple idea: create a space where
            developers can showcase their skills, share their projects, and grow
            together. We noticed that many talented developers struggled to get
            noticed, find the right opportunities, or even connect with others
            in their field.
          </p>
          <p className="mt-4 leading-7 text-muted-foreground">
            So, we built StackForge, a platform designed to empower developers,
            help them build their personal brand, and open doors to new
            opportunities in the tech world.
          </p>
          <Link
            href="/devs"
            className="mt-7 inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
          >
            Meet the community <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-8 max-w-md">
          <span className="text-xs font-semibold text-primary">Our values</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            What drives us
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            We believe in creating a supportive, inclusive, and innovative space
            for developers to grow and succeed.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border-y border-primary/10 bg-primary/5 px-6 py-12 sm:px-10">
        <div className="max-w-xl">
          <span className="text-xs font-semibold text-primary">
            Our tech stack
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Built with modern tools
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            We use industry-leading technologies to provide a fast, secure, and
            scalable platform for our community.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {technologies.map((technology) => (
            <div
              key={technology}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium shadow-sm"
            >
              <Check className="size-4 text-primary" /> {technology}
            </div>
          ))}
        </div>
      </section>

      <section>
        <span className="text-xs font-semibold text-primary">Our impact</span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          Numbers that matter
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          We&apos;re proud of the growing community and the impact we&apos;re
          making together.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <strong className="block text-lg">{value}</strong>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-primary/10 px-6 py-8 sm:flex-row sm:items-center sm:px-10">
        <div>
          <p className="text-xs font-semibold text-primary">
            Join our community
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            Ready to build your future?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join StackForge and be part of a growing community of passionate
            developers.
          </p>
        </div>
        <Link
          href="/signup"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90"
        >
          Get started <ArrowRight className="size-4" />
        </Link>
      </section>
    </main>
  );
}
