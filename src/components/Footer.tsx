import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FacebookIcon, LinkedInIcon } from './ui/icons';

export default function Footer() {
  const footerLinks = [
    {url: "#", lable: "About"},
    {url: "#", lable: "Developers"},
    {url: "#", lable: "Terms"},
    {url: "#", lable: "Privacy"},
  ]
  return (
    <footer className={"w-full max-w-4xl mx-auto space-y-4 py-10 text-gray-500 text-sm"}>
      <div className={"flex items-center justify-between"}>
        <Image src={"/logo.svg"} alt={"logo_image"} width={60} height={40}/>

        <div className={"flex items-center gap-4"}>
          <Link href={'#'}> <FacebookIcon/>  </Link>
          <Link href={'#'}> <LinkedInIcon/>  </Link>
        </div>
      </div>
      <hr className={'border border-primary/20'}/>
      <div className={"flex items-center justify-between"}>
        <div className={'flex items-center gap-4'}>
          {
            footerLinks.map((footer, i)=>(
              <Link key={i} href={footer.url}>{footer.lable}</Link>

            ))
          }
        </div>
        <p>

        © 2026 StackForge. All rights reserved.
        </p>

      </div>
    </footer>
  )
}
