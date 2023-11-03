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
  const [themeIconSrc, setThemeIconSrc] = useState("/../../assets/theme/icons8-moon-50.png");

  function toggleVisibility() {
    setVisibility(!visbility);
  }

  const navbarClasses = classNames(
    'h-fit',
    'md:flex',
    {
      'visible': visbility, 
      'hidden': !visbility
    },
    'md:visible'
  )

  const navbarItemClasses = classNames(
    'h-fit',
    'mr-3',
    'md:my-0',
    'hover:bg-opacity-30',
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
    <nav className='flex h-fit bg-primary text-white text-2xl w-full place-content-between shadow-inner border-bottom border-neutral-200 border-b-2 dark:border-transparent dark:bg-neutral-700 p-1'>
        <div className='flex h-fit justify-between md:justify-normal items-end'>
        <div className='md:w-0 md:h-0'>
          <button 
              aria-label='toggle mobile navigaton'
              onClick={toggleVisibility} 
              className='mr-1 p-1 h-fit md:mr-0 md:invisible md:w-0'>
              <FontAwesomeIcon className='fa-2x' icon={faBars} />
            </button>
        </div>
          <h1 className=' md:ml-3 mr-3 md:hover:rotate-1 md:hover:scale-105 text-4xl'><NextLink className='font-bold' href="/">KUST</NextLink></h1>
          <ul className={navbarClasses}>
          <li className={navbarItemClasses + ' block md:hidden'}><CustomInput placeholder="Search..." /></li>
          <li className={navbarItemClasses + ' block md:hidden'}><Link to="/app/profile">Profile</Link></li>
            <li className={navbarItemClasses}><Link to="/app/browse">Read</Link></li>
            <li className={navbarItemClasses}><Link to="/app/article/write">Write</Link></li>
            <li className={navbarItemClasses}><Link to="/about">About</Link></li>
            <li className={navbarItemClasses}>Contact</li>
            <li className={navbarItemClasses + ' block md:hidden'}><Link to="app/login">Log in / Sign up</Link></li>
            <li className={navbarItemClasses + ' block md:hidden'} onClick={() => {localStorage.clear(); window.location.reload()}}>Log out</li>
        </ul>
      </div>
      <div className='flex md:items-end'>
        <ShowIf
        isVisible={isLoggedIn}
        className="hidden md:flex h-fit items-end mr-8">
            <Link to="/app/profile">Profile</Link>
        </ShowIf>
        <ShowIf isVisible={!isLoggedIn}>
          <div className='mr-12 hidden lg:block'>
            <Link to="/app/login">
              <TextButton className='p-0'>Log in / Register</TextButton>
            </Link>
          </div>
        </ShowIf>
        <div className='hidden md:block mr-12'><CustomInput className='text-black' placeholder="Search..." /></div>
        <ImageButton onClick={toggleTheme} className="h-9 w-9 relative items-center">
          <Image fill={true} alt='Theme change' src={themeIconSrc} />
        </ImageButton>
      </div>
    </nav>
  )
}
