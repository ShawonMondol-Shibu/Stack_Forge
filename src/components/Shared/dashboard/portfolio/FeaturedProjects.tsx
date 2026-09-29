"use client"
import React from 'react'
import ProjectCard from '../project/ProjectCard';
import { useProjectStore } from '@/store/useProjectStore';

export default function FeaturedProjects() {
    const {projects} = useProjectStore()
  return (
    <section>
        <div className={"grid grid-cols-4 items-start justify-start gap-4"}>

        {projects.map((project)=>
        <ProjectCard key={project.id} project={project}/>
    )}
    </div>
    </section>
  )
}
