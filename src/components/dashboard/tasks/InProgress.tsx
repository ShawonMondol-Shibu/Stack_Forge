import { Badge } from '@/components/ui/badge';
import { Item, ItemContent, ItemGroup, ItemTitle } from '@/components/ui/item';
import React from 'react'

export default function InProgress() {
  return (
  <div className="space-y-2 border-r-2 px-2">
      <h3 className="text-sm font-semibold">In Progress</h3>
      <ItemGroup>
        <Item variant={"muted"} size={"xs"} className={"p-2"}>
          <ItemContent>
            <ItemTitle className="font-normal">Build Dashboard UI</ItemTitle>
            <div className="flex items-center justify-between text-xs">
              <Badge variant={"destructive"}>High</Badge>
              {/* <span className="text-red-500">May 28</span> */}
            </div>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  )
}
