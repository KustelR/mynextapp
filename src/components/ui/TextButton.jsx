import React from 'react'
import classNames from 'classnames'


const buttonClasses = classNames(
  'p-2',
  'bg-black',
  'text-white',
  'dark:rounded-2xl',
  'hover:bg-neutral-500',
  'dark:bg-white',
  'dark:text-black',
  'drop-shadow-lg',
  'dark-shadow-inner',
  'active:drop-shadow-sm',
  'disabled:opacity-70',
  'disabled:hover:bg-black',
  'disabled:drop-shadow-none',
  'dark:disabled:hover:bg-white',
  'transition-colors',
  'transition-100'
)


export default function CustomButton({children, onClick, disabled, type}) {
  return (
    <button className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            type={type}>
            {children}
            </button>
  )
}
