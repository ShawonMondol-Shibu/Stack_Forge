import { Github } from '@animateicons/react/huge';
import React from 'react'

export default function GithubHeader() {
  return (
    <header>
        <div className={'flex gap-6 items-center justify-between'}>
            <div className="flex items-center gap-6">

            <Github size={30}/>
    <div>
        <h1 className="text-xl font-bold">GitHub</h1>
        <span className="text-sm text-muted-foreground">Track your code, contributions and repositorise in one place.</span>
    </div>
            </div>

        </div>
    </header>
  )
}
