// components/profile/avatar-header.tsx
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface AvatarHeaderProps {
  fullName: string;
  avatarUrl: string | null;
  availability: string;
}

export const AvatarHeader = ({ fullName, avatarUrl, availability }: AvatarHeaderProps) => {
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const isAvailable = availability === "open";

  return (
    <div className="relative flex items-end justify-between px-6 pb-4 -mt-16">
      <div className="relative">
        <Avatar className="w-32 h-32 border-4 border-background shadow-md">
          <AvatarImage src={avatarUrl || undefined} alt={fullName} />
          <AvatarFallback className="text-2xl font-bold bg-muted text-muted-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <AvatarBadge
          className={`absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-background ${
            isAvailable ? "bg-emerald-500" : "bg-amber-500"
          }`}
          title={`Status: ${availability}`}
        />
      </div>
      <Badge variant={isAvailable ? "secondary" : "destructive"} className="capitalize">
        {availability === "open" ? "Available for Work" : availability}
      </Badge>
    </div>
  );
};