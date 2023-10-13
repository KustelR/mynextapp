import React from 'react'

export default function CustomButton({children, onClick, className}) {
  return (
    <button className={'p-2 hover:bg-neutral-200 rounded-2xl dark:hover:bg-neutral-800 ' + className} onClick={onClick}>{children}</button>
  )
}