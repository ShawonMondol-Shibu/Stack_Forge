"use client";

import FeaturedProjects from "@/components/Shared/dashboard/portfolio/FeaturedProjects";
import PortfolioExperience from "@/components/Shared/dashboard/portfolio/PortfolioExperience";
import PortfolioHeader from "@/components/Shared/dashboard/portfolio/PortfolioHeader";
import Skills from "@/components/Shared/dashboard/profile/about/Skills";
import ProfileEducations from "@/components/Shared/website/profile/ProfileEducations";
import PortfolioGithub from "@/components/Shared/dashboard/portfolio/PortfolioGithub";
import { profileQuery } from "@/hooks/queries/use-profile";
import { useProfileStore } from "@/store/ProfileStore";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

export default function PortfolioPage({ id }: { id?: string }) {
  const {
    data: publicProfile,
    isPending,
    isError,
  } = profileQuery.GetProfileById(id ?? "");
  const ownProfile = useProfileStore((state) => state.profile);
  const profile = id ? publicProfile : ownProfile;

  if (id && isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <LoaderCircle className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (id && (isError || !profile)) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-sm text-destructive">
          Could not load this portfolio.
        </CardContent>
      </Card>
    );
  }

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-10 pb-12 sm:gap-12">
      <PortfolioHeader profile={profile} isReadOnly={Boolean(id)} />
      <FeaturedProjects userId={profile?.userId} isReadOnly={Boolean(id)} />
      <section className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="grid min-w-0 gap-8">
          <PortfolioExperience id={profile?.id ?? id ?? ""} />
          {profile?.userId && <ProfileEducations id={profile.userId} />}
        </div>
        <div className="grid min-w-0 gap-8">
          <Skills userId={id ? profile?.userId : undefined} />
          <PortfolioGithub website={profile?.website} />
        </div>
      </section>
    </main>
  );
}
