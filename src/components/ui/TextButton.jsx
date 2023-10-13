import React from 'react'
import classNames from 'classnames'


const buttonClasses = classNames(
  'p-2',
  'bg-black',
  'text-white',
  'dark:rounded-2xl',
  'hover:bg-neutral',
  'dark:bg-white',
  'dark:text-black',
  'drop-shadow-lg',
  'dark-shadow-inner',
  'active:drop-shadow-sm',
  'disabled:opacity-70',
  'disabled:hover:bg-black',
  'dark:disabled:hover:bg-white'
)


export default function CustomButton({children, onClick, disabled}) {
  return (
    <button className={buttonClasses}
            onClick={onClick}
            disabled={disabled}>
            {children}
            </button>
  )
}
