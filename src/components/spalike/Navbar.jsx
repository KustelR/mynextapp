import React, {useState, useEffect} from 'react';
import NextLink from 'next/link';
import { Link } from 'react-router-dom'
import Image from 'next/image';


import ImageButton from '../ui/ImageButton';
import TextButton from '../ui/TextButton';
import CustomInput from '../ui/inputs/CustomInput';
const classNames = require('classnames');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import ShowIf from '../ui/ShowIf'


export default function Navbar() {
  const [visbility, setVisibility] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [themeIconSrc, setThemeIconSrc] = useState("/");

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
    let isDarkTheme = false;
    localStorage.getItem("theme") === "dark" ? 
      isDarkTheme = true : 
      isDarkTheme = false;
    if (isDarkTheme) {
      document.body.classList.add('dark');
      setThemeIconSrc("/../../assets/theme/icons8-sun-50.png");
    }
    else {
      document.body.classList.remove('dark');
      setThemeIconSrc("/../../assets/theme/icons8-moon-50.png");
    }
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) setIsLoggedIn(true);
  }, [])

  function toggleTheme() {
    let isDarkTheme = false;
    localStorage.getItem("theme") === "dark" ? 
      isDarkTheme = true : 
      isDarkTheme = false;
    if (isDarkTheme) {
      document.body.classList.remove('dark');
      localStorage.setItem("theme", "light");
      setThemeIconSrc("/../../assets/theme/icons8-moon-50.png");
    }
    else {
      document.body.classList.add('dark');
      localStorage.setItem("theme", "dark");
      setThemeIconSrc("/../../assets/theme/icons8-sun-50.png");
    }
  }


  return (
    <div className='flex w-full place-content-between shadow-inner border-bottom border-neutral-200 border-b-2 dark:border-transparent dark:bg-neutral-700 p-1 md:items-center'>
      <div className='flex w-full justify-between'>
        <div className='md:flex justify-between md:justify-normal items-center'>
          <div className='flex'>
            <button onClick={toggleVisibility} className='mr-4 p-1 h-fit md:mr-0 md:invisible md:w-0'>
              <FontAwesomeIcon className='fa-2x' icon={faBars} />
            </button>
            <div className='flex items-center justify-center'>
              <h1 className=' md:hover:rotate-1 md:hover:scale-105 text-2xl'><NextLink href="/">KUST</NextLink></h1>
            </div>
          </div>
          <ul className={navbarClasses}>
          <li className={navbarItemClasses + ' block md:hidden'}><CustomInput placeholder="Search..." /></li>
          <li className={navbarItemClasses + ' block md:hidden'}><Link to="/app/profile">Profile</Link></li>
            <li className={navbarItemClasses}><Link to="/app/browse">Read</Link></li>
            <li className={navbarItemClasses}><Link to="/app/article/write">Write</Link></li>
            <li className={navbarItemClasses}>Contact</li>
            <li className={navbarItemClasses + ' block md:hidden'}><Link to="app/login">Log in / Sign up</Link></li>
            <li className={navbarItemClasses + ' block md:hidden'} onClick={() => {localStorage.clear(); window.location.reload()}}>Log out</li>
        </ul>
      </div>
      <div className='flex md:items-center'>
        <ShowIf
        isVisible={isLoggedIn}
        className="hidden md:flex items-center">
          <div className='text-xl font-bold md:text-base md:font-normal py-2 px-4 h-full md:h-fit flex items-center'>
            <Link to="/app/profile">Profile</Link>
          </div>
          <div className='hidden lg:flex lg:mr-8'>
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
        <ImageButton onClick={toggleTheme} className="h-9 w-9 relative items-center">
          <Image fill={true} alt='Theme change' src={themeIconSrc} />
        </ImageButton>
      </div>
      </div>
    </div>
    
  )
}
