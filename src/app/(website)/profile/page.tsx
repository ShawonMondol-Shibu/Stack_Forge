import React from 'react'
import ProfilePage from './ProfilePage';
import ProfileSkills from '@/app/(website)/profile/ProfileSkills';
import ProfileEducations from './ProfileEducations';

export default function Page() {
  return (
    <main className={'py-10 px-4 md:px-8 grid justify-center'}>
      <div className={'w-full max-w-4xl space-y-6'}>

        <ProfilePage/>
        <ProfileSkills/>
        <ProfileEducations/>
      </div>
    </main>
  )
}
