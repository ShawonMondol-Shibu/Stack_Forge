import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ResourceCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function ResourceCard({
  title,
  description,
  href,
}: ResourceCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-border p-5 transition hover:border-primary/40 hover:bg-primary/5"
    >
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <ArrowRight className="mt-4 size-4 text-primary transition group-hover:translate-x-1" />
    </Link>
  );
}
