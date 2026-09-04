"use client"
import TaskCard from '@/components/Shared/dashboard/tasks/TaskCard'
import { ItemGroup } from '@/components/ui/item'
import React from 'react'
import { useTaskStore } from '@/store/TaskStore'

export default function InProgress() {
  const { inProgressTasks } = useTaskStore()
  return (
    <section>
      <ItemGroup>
        {inProgressTasks?.map((data, i) => (
          <TaskCard data={data} key={i} />
        ))}
      </ItemGroup>
    </section>
  )
}
