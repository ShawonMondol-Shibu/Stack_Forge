import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import React from "react";

export default function ProjectFilter() {
  const items = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
  ];
  return (
    <div className="flex flex-row flex-wrap lg:flex-nowrap items-center justify-between gap-6">
      <search className="w-xs">
        <InputGroup>
          <InputGroupAddon align={"inline-end"}>
            <InputGroupButton>
              <Search />
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupInput type="search" placeholder="Search projects..." />
        </InputGroup>
      </search>

{/* Filter by Tech Stack */}
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tech Stack" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

{/* Filter by Status */}
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      
{/* Sort by Recent Updates */}
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Sort: Recently Updated" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>


    </div>
  );
}
