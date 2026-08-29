"use client"
import ProjectCard from '@/components/Shared/dashboard/project/ProjectCard';
import { useProjectContext } from '@/context/ProjectContext';
import React from 'react'

export default function Projects() {
  const {projects} = useProjectContext()
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
