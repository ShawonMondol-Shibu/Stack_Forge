"use client"
import TaskCard from '@/components/Shared/dashboard/tasks/TaskCard';
import { ItemGroup } from '@/components/ui/item';
import { useTaskContext } from '@/context/TaskContext';
import React from 'react'

export default function Completed() {
  const {tasks} = useTaskContext()
  return (
    // Completed Tasks...
    <section>
      <ItemGroup>
        {tasks.map((data, i) => (
          <TaskCard data={data} key={i} />
        ))}
      </ItemGroup>
    </section>
  )
}
