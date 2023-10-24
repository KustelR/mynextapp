import React from 'react'
import Head from 'next/head'
import Navbar from "./Navbar"
import FooterComponent from "./FooterComponent"

export default function PageComponent({children, title}) {
  return (
    <div>
        <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        </Head>
        <div className="bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-200 w-full min-h-screen">
        <header className="mb-10">
        <Navbar />
        </header>
        <div className='mb-8 min-h-screen'>{children}</div>
        <footer className='w-full'>
          <FooterComponent />
        </footer>
        </div>
        
    </div>
  )
}
