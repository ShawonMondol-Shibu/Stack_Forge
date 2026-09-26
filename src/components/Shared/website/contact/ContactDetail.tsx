import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ContactDetailProps = {
  icon: LucideIcon;
  title: string;
  value: string;
  href?: string;
};

export default function ContactDetail({
  icon: Icon,
  title,
  value,
  href,
}: ContactDetailProps) {
  const content = (
    <>
      <span className="grid size-10 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <span>
        <strong className="block text-sm">{title}</strong>
        <span className="text-sm text-muted-foreground">{value}</span>
      </span>
    </>
  );

  return href ? (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl border border-border p-4 transition hover:border-primary/40"
    >
      {content}
    </Link>
  ) : (
    <div className="flex items-center gap-3 rounded-2xl border border-border p-4">
      {content}
    </div>
  );
}
