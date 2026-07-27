import React from 'react'

export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <main className={'h-dvh overflow-hidden grid grid-cols-2 bg-gray-200'}>
      <div className={'overflow-hidden  p-8 h-full '}>
        <div className={'bg-white rounded-lg h-full p-8 '}>

      { children }

        </div>
      </div>
      
      <div className={' h-full w-full '}>

      </div>
      </main>
  )
}
