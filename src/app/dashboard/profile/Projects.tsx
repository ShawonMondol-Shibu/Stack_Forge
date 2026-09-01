"use client"
import ProjectCard from '@/components/Shared/dashboard/project/ProjectCard';
import { useProjectStore } from '@/store/useProjectStore';
import React from 'react'

export default function Projects() {
  const {projects} = useProjectStore()
  return (
    <section>
      <div className={"grid grid-cols-3 gap-4 items-center justify-start"}>

      {
        projects.map((project)=><ProjectCard key={project.id} project={project}/>)
      }
      </div>
    </section>
  )
}
