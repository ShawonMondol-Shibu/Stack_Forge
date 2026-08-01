/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { BriefcaseBusiness } from "lucide-react";
import React from "react";

export default function ProfileExperience() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={"text-xl"}>Experience:</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {Array.from({ length: 3 }).map((_, i) => (
            <Item key={i} variant={"outline"}>
              <ItemHeader>
                <div className={"flex items-center gap-2"}>
                  <ItemMedia>
                    <BriefcaseBusiness />
                  </ItemMedia>
                  <ItemTitle className={"text-base"}>
                    MERN Stack Developer{" "}
                    <small>
                      <span>Internship</span>
                    </small>
                  </ItemTitle>
                </div>
              </ItemHeader>
              <ItemContent>
                <ItemTitle>Full Stack Development ("MERN")</ItemTitle>
                <address>
                  Daisy Garden, House 14 (Level-5), Block A, Banasree, Dhaka
                </address>
                <p>Duration: 2024 4 months</p>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
