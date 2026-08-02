import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubCalendar } from "react-github-calendar";
import React from "react";
import PinedRepositorys from "@/components/PinedRepositorys";

export default function ProfileGithub() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>GitHub</CardTitle>
        </CardHeader>
        <CardContent className={'space-y-4'}>
          <GitHubCalendar username="shawonmondol-shibu" />
          <PinedRepositorys />
        </CardContent>
      </Card>
    </>
  );
}
