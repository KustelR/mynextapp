"use client";


import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ImageButton from '../ui/ImageButton';
import TextButton from '../ui/TextButton';
import CustomInput from '../ui/CustomInput';
const classNames = require('classnames');


export default function Navbar() {
  const [visbility, setVisibility] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  function toggleVisibility() {
    setVisibility(!visbility);
  }

  const navbarClasses = classNames(
    'md:flex',
    'font-sans',
    {
      'visible': visbility, 
      'hidden': !visbility
    },
    'md:visible'
  )

  const navbarItemClasses = classNames(
    'mx-1',
    'hover:bg-neutral-200',
    'dark:hover:bg-neutral-600',
    'my-5',
    'px-1',
    'md:rounded-md',
  )
  
  function toggleTheme() {
    isDarkTheme ? document.body.classList.remove('dark') : document.body.classList.add('dark');
    setIsDarkTheme(!isDarkTheme)
  }

  function getThemeImage() {
    if (isDarkTheme) {
      return (<Image fill={true} alt='Theme change' src="/../../assets/theme/icons8-sun-50.png" />)
    }
    else {
      return (<Image fill={true} alt='Theme change' src="/../../assets/theme/icons8-moon-50.png" />)
    }
  }

  return (
    <div className='flex w-full place-content-between shadow-inner border-bottom border-neutral-200 border-b-2 dark:border-transparent dark:bg-neutral-700 p-1 md:items-center'>
      <div className='flex w-full justify-between'>
        <div className='md:flex justify-between md:justify-normal items-center'>
          <div className='flex'>
            <button onClick={toggleVisibility} className='mr-4 border-2 border-neutral-500 hover:border-neutral-800 p-1 h-fit md:mr-0 md:invisible md:w-0'>
                |||
            </button>
            <h1 className=' md:hover:rotate-1 md:hover:scale-105 text-2xl'><Link href="/">KUST</Link></h1>
          </div>
          <ul className={navbarClasses}>
          <li className={navbarItemClasses + ' block md:hidden'}><CustomInput placeholder="Search..." /></li>
            <li className={navbarItemClasses}><Link href="/">Home</Link></li>
            <li className={navbarItemClasses}>About</li>
            <li className={navbarItemClasses}><Link href="/Main">Articles</Link></li>
            <li className={navbarItemClasses}>Contact</li>
            <li className={navbarItemClasses + ' block md:hidden'}><Link href="/Login">Log in / Register</Link></li>
        </ul>
      </div>
      <div className='flex md:items-center'>
        <div className='mr-12 hidden lg:block'><Link href="/Login"><TextButton >Log in / Register</TextButton></Link></div>
        <div className='hidden md:block mr-12'><CustomInput  placeholder="Search..." /></div>
        <ImageButton onClick={toggleTheme} className="h-9 w-9 relative items-center">{getThemeImage()}</ImageButton>
      </div>
      </div>
    </div>
    
  )
}
