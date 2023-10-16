import Link from 'next/link'

import './globals.css'
import styles from '../styles/page.module.css';
const classNames = require('classnames');


 const pageClassnames = classNames([
  'fixed',
  'w-screen',
  'h-screen',
  styles.pageContainer
])


export default function Home() {
  return (
    <main>
        <div className={pageClassnames}>
        </div>
        <div className='md:fixed md:w-full'>
        </div>
        <div className='relative h-screen'>
        <div className='mx-auto w-11/12 pt-8'>
        <div className='flex w-full shadow-2xl bg-white border-x-8 border-cyan-600'>
          <div className='text-center p-3 text-4xl w-full md:p-6'>
          <h1 className='font-bold'>KUST HEIGHTS</h1>
          </div>
        </div>
            <div className=' flex mt-8 bg-white text-3xl md:text-lg md:w-fit shadow-2xl'>
            <div className='w-1 bg-red-500'></div>
            <div className='m-3'>
              <h2 className='font-bold mb-8 md:mb-0'>Navigation</h2>
                <ul className='[&>*]:mb-8 md:[&>*]:mb-0'>
                  <li className='hover:bg-gray-100 px-1 dark:hover:bg-neutral-600 rounded-md'><Link href="/articles">Get started</Link></li>
                  <li className='hover:bg-gray-100 px-1 dark:hover:bg-neutral-600 rounded-md'><Link href="/login">Log-in / Register</Link></li>
                  <li className='hover:bg-gray-100 px-1 dark:hover:bg-neutral-600 rounded-md'><Link href="/profile">My profile</Link></li>
                  <li className='hover:bg-gray-100 px-1 dark:hover:bg-neutral-600 rounded-md'>Placeholder</li>
                </ul>
            </div>
          </div>
        </div>
        <div className=' -z-10 md:absolute bottom-0 text-neutral-500 text-center w-screen text-sm'>Image by <a href="https://www.pexels.com/@quintingellar/">Quintin Gellar</a></div>
        </div>
        
    </main>
  )
}
