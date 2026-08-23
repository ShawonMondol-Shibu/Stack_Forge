import TaskHeader from '@/components/Shared/dashboard/tasks/TaskHeader';
import { Tabs } from '@/components/ui/tabs';
import React from 'react'

export default function Page() {
  return (
    <main className={"w-full container mx-auto"}>
      <Tabs>
        <TaskHeader/>
      </Tabs>
    </main>
  )
}
