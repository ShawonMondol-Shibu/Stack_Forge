// components/profile/profile-meta-info.tsx
import { MapPin, Globe, Calendar } from "lucide-react";
import Link from "next/link";

interface ProfileMetaInfoProps {
  location: string | null;
  website: string | null;
  createdAt: string;
}

export const ProfileMetaInfo = ({ location, website, createdAt }: ProfileMetaInfoProps) => {
  const joinedDate = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
      {location && (
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
      )}
      {website && (
        <div className="flex items-center gap-1.5">
          <Globe className="h-4 w-4" />
          <Link
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-foreground transition-colors"
          >
            {website.replace(/^https?:\/\//, "")}
          </Link>
        </div>
      )}
      <div className="flex items-center gap-1.5">
        <Calendar className="h-4 w-4" />
        <span>Joined {joinedDate}</span>
      </div>
    </div>
  );
};
