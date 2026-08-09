import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from '../ui/item';
import { CalendarRange } from 'lucide-react';

export default function NextUp() {
  return (
    <Card size={"sm"}>
        <CardHeader>
            <CardTitle className={"text-xl"}>Next Up</CardTitle>
        </CardHeader>
<CardContent>
    <ItemGroup className={'gap-0!'}>
        {
            Array.from({length:3}).map((_,i )=>(
        <Item key={i} variant={"default"} size={"xs"} className={"p-0 pb-1"}>
            <ItemMedia>
                <CalendarRange size={16} className={"text-primary drop-shadow-primary/50 drop-shadow-md"}/>
            </ItemMedia>
            <ItemContent>
                <div className={'flex items-center justify-between gap-6'}>

                <ItemTitle className={"text-sm"}>Team Stendup</ItemTitle>
                <small>Tomorros, 10:0 AM</small>
                </div>
                
            </ItemContent>
        </Item>

            ))
        }
    </ItemGroup>
</CardContent>
    </Card>
  )
}
