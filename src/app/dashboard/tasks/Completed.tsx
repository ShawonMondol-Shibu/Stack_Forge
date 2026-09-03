"use client"
import TaskCard from '@/components/Shared/dashboard/tasks/TaskCard';
import { ItemGroup } from '@/components/ui/item';
import { useTaskStore } from '@/store/TaskStore';
import React from 'react'

export default function Completed() {
  const {completedTasks} = useTaskStore()
  
  return (
    // Completed Tasks...
    <section>
      <ItemGroup>
        {completedTasks?.map((data, i) => (
          <TaskCard data={data} key={i} />
        ))}
      </ItemGroup>
    </section>
  )
}
