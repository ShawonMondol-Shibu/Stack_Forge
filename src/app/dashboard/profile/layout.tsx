import ProfileHeader from '@/components/Shared/dashboard/profile/ProfileHeader';
import React from 'react'

export default function Layout({children}: {children:React.ReactNode}) {
  return (
    <div className={"w-full max-w-7xl mx-auto space-y-4"}>
      <ProfileHeader/>
      {children}
      </div>
  )
}
