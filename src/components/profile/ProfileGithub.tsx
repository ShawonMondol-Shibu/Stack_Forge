import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubCalendar } from "react-github-calendar";
import React from "react";
import PinedRepositorys from "../Shared/PinedRepositorys";

export default function ProfileGithub() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>GitHub</CardTitle>
        </CardHeader>
        <CardContent className={'space-y-4'}>
          <GitHubCalendar username="shawonmondol-shibu" colorScheme="light"/>
          <PinedRepositorys />
        </CardContent>
      </Card>
    </>
  );
}
