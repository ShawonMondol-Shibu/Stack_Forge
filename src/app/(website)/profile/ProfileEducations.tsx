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
import { GraduationCap } from "lucide-react";
import React from "react";

export default function ProfileEducations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Education:</CardTitle>
      </CardHeader>
      <CardContent className={"px-8"}>
        <ItemGroup className="flex flex-row flex-wrap gap-4 justify-start">
          {Array.from({ length: 3 }).map((_, i) => (
            <Item key={i} variant={"muted"} className="flex-1 hover:shadow-lg transition-all duration-300 ease-in">
              <ItemHeader className={"justify-start"}>
                <ItemMedia>
                  <GraduationCap />
                </ItemMedia>
                <ItemTitle className="text-base">Kishoreganj Polytechnic Instute</ItemTitle>
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
