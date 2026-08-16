import GithubActivitiy from '@/components/Shared/dashboard/github/GithubActivitiy';
import RecentProjects from '@/components/Shared/dashboard/home/RecentProjects';
import AboutMe from '@/components/Shared/dashboard/profile/about/AboutMe';
import PinnedProjects from '@/components/Shared/dashboard/profile/about/PinnedProjects';
import Skills from '@/components/Shared/dashboard/profile/about/Skills';
import React from 'react'

export default function About() {
  return (
    <div className={" grid grid-cols-1 lg:grid-cols-2 gap-4 items-start justify-center"}>
        <AboutMe/>
        <Skills/>
        <PinnedProjects/>
    </div>
  )
}
