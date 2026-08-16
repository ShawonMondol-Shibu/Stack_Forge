import ProjectCard from '@/components/Shared/dashboard/project/ProjectCard';
import React from 'react'

export default function AllProjects() {
  return (
    <div className={"w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-center"}>
      {
        Array.from({length:9}).map((_,i)=>(
          <ProjectCard key={i}/>

        ))
      }
    </div>
  )
}
