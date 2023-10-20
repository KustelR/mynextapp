"use client";


import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ImageButton from '../ui/ImageButton';
import TextButton from '../ui/TextButton';
import CustomInput from '../ui/inputs/CustomInput';
const classNames = require('classnames');
import ShowIf from '../ui/ShowIf'


export default function Navbar() {
  const [visbility, setVisibility] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) setIsLoggedIn(true);
  }, [])

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
          <li className={navbarItemClasses + ' block md:hidden'}><Link href="/profile">Profile</Link></li>
            <li className={navbarItemClasses}><Link href="/">Home</Link></li>
            <li className={navbarItemClasses}>About</li>
            <li className={navbarItemClasses}><Link href="/articles">Read</Link></li>
            <li className={navbarItemClasses}><Link href="/write">Write</Link></li>
            <li className={navbarItemClasses}>Contact</li>
            <li className={navbarItemClasses + ' block md:hidden'}><Link href="/login">Log in / Sign up</Link></li>
            <li className={navbarItemClasses + ' block md:hidden'} onClick={() => {localStorage.clear(); window.location.reload()}}>Log out</li>
        </ul>
      </div>
      <div className='flex md:items-center'>
        <ShowIf
        isVisible={isLoggedIn}
        className="hidden md:flex">
          <div className='text-xl font-bold md:text-base md:font-normal py-2 px-4 h-full md:h-fit flex items-center'>
            <Link href="/profile">Profile</Link>
          </div>
          <div className='md:mr-8'>
            <TextButton onClick={() => {localStorage.clear(); window.location.reload()}}>Log out</TextButton>
          </div>
        </ShowIf>
        <ShowIf isVisible={!isLoggedIn}>
          <div className='mr-12 hidden lg:block'>
            <Link href="/login">
              <TextButton >Log in / Register</TextButton>
            </Link>
          </div>
        </ShowIf>
        <div className='hidden md:block mr-12'><CustomInput  placeholder="Search..." /></div>
        <ImageButton onClick={toggleTheme} className="h-9 w-9 relative items-center">{getThemeImage()}</ImageButton>
      </div>
      </div>
    </div>
    
  )
}
