import type { Metadata } from "next";
import GithubDashboard from "@/components/Shared/dashboard/github/GithubDashboard";

export const metadata: Metadata = {
  title: "GitHub | Stack Forge",
};

export default function Page() {
  return <GithubDashboard />;
}