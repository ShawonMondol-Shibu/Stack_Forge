import GithubHeader from '@/components/Shared/dashboard/github/GithubHeader';
import { Tabs } from '@/components/ui/tabs';
import React from 'react'

export default function Page() {
  return (
    <main>
      <Tabs>
        <GithubHeader/>
      </Tabs>
    </main>
  )
}
