import React from "react";
import { CodeBlock } from "../../CodeBlock";
import { cn } from "@/lib/utils";
import { UserProfile } from "@/lib/types/profile-type";

export default function PortfolioCodeBlock({
  className,
  profile,
  skills,
}: {
  className?: string;
  profile?: UserProfile;
  skills?: { id: string; image: string; name: string }[];
}) {
  const code = `const developer = { 
    name: "${profile?.fullName || "Shibu Mondol"}",
    role: "${profile?.headline || "Full Stack Developer"}",
    skills: [ ${skills?.map((skill) => `"${skill.name}"`)?.join(",")} ],
    location: "${profile?.location || "Dhaka, Bangladesh"}"
};
    
console.log(developer);`;
  return (
    <div className={cn(className)}>
      <CodeBlock language="javascript" code={code} />
    </div>
  );
}
