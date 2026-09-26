"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ContactDetail from "@/components/Shared/website/contact/ContactDetail";
import FormField from "@/components/Shared/website/contact/FormField";
import ResourceCard from "@/components/Shared/website/contact/ResourceCard";
import { Card, CardContent } from "@/components/ui/card";

const contactDetails = [
  {
    icon: Mail,
    title: "Email us",
    value: "hello@stackforge.dev",
    href: "mailto:hello@stackforge.dev",
  },
  {
    icon: Clock3,
    title: "Response time",
    value: "Usually within 1-2 business days",
  },
  {
    icon: MapPin,
    title: "Built for everyone",
    value: "A global community of developers",
  },
];

const contactResources = [
  {
    title: "Community questions",
    description:
      "Connect with developers and find answers in the StackForge community.",
    href: "/devs",
  },
  {
    title: "Share feedback",
    description:
      "Help us shape the tools and experiences developers need most.",
    href: "mailto:feedback@stackforge.dev",
  },
  {
    title: "Partnerships",
    description:
      "Interested in working together? We are open to thoughtful collaborations.",
    href: "mailto:partners@stackforge.dev",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 pb-10">
      <section className="border-b border-border pb-12 pt-4">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-semibold text-primary">
            <MessageCircle className="size-3.5" /> Contact StackForge
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s build something{" "}
            <span className="text-primary">meaningful</span> together.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            Have a question, an idea, or feedback for the community? Send us a
            message and the StackForge team will get back to you soon.
          </p>
        </div>
      </section>

      <section className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="text-xs font-semibold text-primary">
            Get in touch
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            We&apos;re here to help
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Whether you&apos;re exploring the platform or already part of the
            community, we&apos;d love to hear from you.
          </p>

          <div className="mt-8 space-y-3">
            {contactDetails.map((detail) => (
              <ContactDetail key={detail.title} {...detail} />
            ))}
          </div>

          <div className="mt-8 border-l-2 border-primary bg-primary/5 p-5">
            <p className="text-sm font-semibold">
              Looking for fellow builders?
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Explore projects and connect with developers who are building the
              future.
            </p>
            <Link
              href="/devs"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
            >
              Explore developers <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <Card className="border border-border bg-primary/2">
            <CardContent>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill out the form and we&apos;ll be in touch.
            </p>

            {submitted ? (
              <div className="mt-8 border border-primary/20 bg-primary/5 p-6 text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Send className="size-5" />
                </div>
                <h3 className="mt-4 font-bold">Message ready to send</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Thanks for reaching out. We&apos;ll get back to you soon.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-5"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <div className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="Your name"
                    name="name"
                    placeholder="Jane Doe"
                    required
                  />
                  <FormField
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    required
                  />
                </div>
                <FormField
                  label="Subject"
                  name="subject"
                  placeholder="How can we help?"
                  required
                />
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell us a little more..."
                    required
                    className=" border-border bg-muted/30"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Send message <Send className="size-4" />
                </Button>
              </div>
            )}
          </form>
            </CardContent>
        </Card>
      </section>

      <section className="border-t border-border pt-10">
        <div className="grid gap-6 sm:grid-cols-3">
          {contactResources.map((resource) => (
            <ResourceCard key={resource.title} {...resource} />
          ))}
        </div>
      </section>
    </main>
  );
}
