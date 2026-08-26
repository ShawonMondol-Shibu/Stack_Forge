"use client";
import { Button } from "@/components/ui/button";
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
import { Filter } from "@animateicons/react/lucide";
import React from "react";
import {
  CommonFilterType,
  SelectItemsType,
} from "@/lib/types/CommonFilterType";

export default function CommonFilter({
  searchPlaceholder,
  selectPlaceholder,
  selectPlaceholder_2,
  sortPlaceholder,
  selectItems,
  selectItems2,
  sortitems,
}: CommonFilterType) {
  const handleSelect = () => {
    return null;
  };
  const handleFilter = () => {
    return null;
  };

  return (
    <div className="flex flex-row flex-wrap lg:flex-nowrap items-center justify-between gap-6">
      <search className="w-xs">
        <InputGroup>
          <InputGroupAddon align={"inline-end"}>
            <InputGroupButton>
              <Search />
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupInput type={"search"} placeholder={searchPlaceholder} />
        </InputGroup>
      </search>

      {/* Filter by Tech Stack */}
      {!selectPlaceholder ? null : (
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder={selectPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {selectItems?.map((stack: SelectItemsType) => (
                <SelectItem key={stack?.value} value={stack?.value}>
                  {stack?.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {/* Filter by Status */}
      {!selectPlaceholder_2 ? null : (
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder={selectPlaceholder_2} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {selectItems2?.map((item: { value: string; label: string }) => (
                <SelectItem
                  key={item?.value}
                  value={item?.value}
                  onClick={handleSelect}
                >
                  {item?.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {/* Sort by Recent Updates */}
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={sortPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sortitems?.map((item: SelectItemsType) => (
              <SelectItem key={item?.value} value={item?.value}>
                {item?.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button variant={"default"} size={"icon"} onClick={handleFilter}>
        <Filter />
      </Button>
    </div>
  );
}
