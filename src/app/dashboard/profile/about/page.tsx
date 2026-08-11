import AboutMe from '@/components/Shared/dashboard/profile/about/AboutMe';
import Skills from '@/components/Shared/dashboard/profile/about/Skills';
import React from 'react'

export default function Page() {
  return (
    <div className={"w-4xl grid grid-cols-2 gap-4 items-start justify-center"}>
        <AboutMe/>
        <Skills/>
    </div>
  )
}
