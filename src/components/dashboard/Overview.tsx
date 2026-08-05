import React from 'react'
import { ItemGroup } from '../ui/item';
import OverviewItem from '../OverviewItem';

export default function Overview() {
  return (
    <section className={"space-y-4"}>
        <h1 className={"text-xl font-bold"}>Overview</h1>
        <ItemGroup>
        <OverviewItem/>
        </ItemGroup>
    </section>
  )
}
