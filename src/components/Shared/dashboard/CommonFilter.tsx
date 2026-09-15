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
import React, { useState } from "react";
import {
  CommonFilterType,
  SelectItemsType,
} from "@/lib/types/CommonFilterType";
import { cn } from "@/lib/utils";

export default function CommonFilter({
  searchPlaceholder,
  selectPlaceholder,
  selectPlaceholder_2,
  sortPlaceholder,
  selectItems,
  selectItems2,
  sortitems,
  handleSelect,
  handleFilter = () => {},
  isNote
}: CommonFilterType) {
  const [search, setSearch] = useState<string | null>();

  return (
    <div className={cn(`grid items-center justify-between gap-2`, isNote? "flex flex-row lg:flex-nowrap": "grid-cols-8")}>
      <search className={cn("w-full col-span-4")}>
        <InputGroup>
          <InputGroupAddon align={"inline-end"}>
            <InputGroupButton onClick={()=>handleFilter?.(search as string)}>
              <Search />
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupInput
            type={"search"}
            value={search as string}
            onBlur={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
          />
        </InputGroup>
      </search>

      {/* Filter by Tech Stack */}
      {!selectPlaceholder ? null : (
        <Select>
          <SelectTrigger className="w-full">
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
          <SelectTrigger className="w-full">
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
      {!sortPlaceholder ? null : (
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
      )}

      <Button
        variant={"default"}
        size={"icon"}
        type="submit"
        onClick={() => handleFilter?.(search as string)}
      >
        <Filter />
      </Button>
    </div>
  );
}
