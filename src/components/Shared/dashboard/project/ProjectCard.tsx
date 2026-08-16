import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Eye, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { GoRepoForked } from 'react-icons/go';

export default function ProjectCard() {
  return (
    <Card className={"w-full pt-0"}>
        <div >
            <Image src={"/brain.jpg"} alt={"project_image"} width={300} height={200} className={"w-full object-cover"}/>

        </div>
        <CardContent>
            <CardTitle>
                Stack Forge
            </CardTitle>
            <CardDescription className={"line-clamp-2"}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione esse facere corrupti, incidunt vitae cum quas dolor quos, inventore ab, possimus quidem officiis sapiente non ad assumenda quod repellat quia?
            </CardDescription>

            <div>
                {Array.from({length:3}).map((_,i)=>(
                    <Badge key={i} variant={"outline"}>nestjs</Badge>

                ))}
            </div>
        </CardContent>
        <CardFooter className={"gap-4 text-[10px] justify-between"}>
<div className={"flex items-center gap-2"}>
    <Star size={12}/> {202}
</div>
<div className={"flex items-center gap-2"}>
    <GoRepoForked /> {48}
</div>
<div className={"flex items-center gap-2"}>
    <Eye size={12}/> {612}
</div>

<span>Updated 2d ago</span>
        </CardFooter>
    </Card>
  )
}
