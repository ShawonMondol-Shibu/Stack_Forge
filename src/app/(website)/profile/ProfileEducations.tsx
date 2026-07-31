import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { GraduationCap, University } from "lucide-react";
import React from "react";

export default function ProfileEducations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Education:</CardTitle>
      </CardHeader>
      <CardContent className={"px-8"}>
        <ItemGroup>
          {Array.from({ length: 2 }).map((_, i) => (
            <Item key={i} variant={"muted"}>
              <ItemHeader className={"justify-start"}>
                <ItemMedia>
                  <GraduationCap />
                </ItemMedia>
                <ItemTitle>Kishoreganj Polytechnic Instute</ItemTitle>
              </ItemHeader>
              <ItemContent className="pl-8">
                <ItemDescription>
                  Diploma in Computer Engineering
                </ItemDescription>
                <ItemFooter>
                    <div className="pl-8">

                  <ul>
                    <li>Semester: 1</li>
                    <li>Passing Year: 2025</li>
                  </ul>
                  <ul>
                    <li></li>
                    <li>Result: 4.00</li>
                  </ul>
                    </div>
                </ItemFooter>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
