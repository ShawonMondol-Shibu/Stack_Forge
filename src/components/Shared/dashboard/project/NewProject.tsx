
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import React from 'react'
import { IoRocketSharp } from 'react-icons/io5';
import AddProject from './AddProject';

export default function NewProject() {
  return (
    <Card>
        <CardContent className={"flex items-start gap-4"}>
            <span className={"border p-4 rounded-full"}>

            <IoRocketSharp className={"size-14 text-primary drop-shadow-primary/50 drop-shadow-lg"}/>
            </span>
            <div>
                <CardTitle>Ship more. Ship better</CardTitle>
                <CardDescription>Create new project, collaborate with your team, and build amazing products.</CardDescription>
            </div>
        </CardContent>
        <CardFooter className={" justify-center"}>
            <AddProject/>
        </CardFooter>
    </Card>
  )
}
