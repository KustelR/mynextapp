'use client'


import React from 'react'
import classNames from 'classnames'

import ShowIf from './ShowIf';

export default function CustomInput({id, label, type, advice, placeholder, validation, validationMessage, 
                                     onChange, reference, className, autoComplete}) {
  if (validation === undefined) {
    validation = true;
  }

  const inputClasses = classNames(
    'block',
    'w-full',
    'p-1',
    'pb-0',
    'rounded-sm',
    'bg-gray-100',
    'dark:bg-neutral-700',
  
    'focus:outline-0',
    'border-2',
    {
      'border-transparent': validation,
      'border-b-neutral-300': validation,
      'focus:border-b-neutral-400': validation,
      'dark:border-b-neutral-600': validation,
      'dark:focus:border-b-neutral-500': validation,
      'border-red-300': !validation,
      'dark:border-red-500': !validation
    },
  )

  return (
    <div className={className}>
    <div className='flex items-end'>
    <label className='block mr-2' htmlFor={id}>{label}</label> 
    <ShowIf className="text-xs font-bold text-red-600 h-fit p-0.5" isVisible={!validation}>{validationMessage}</ShowIf>
    </div>
        <input 
          className={inputClasses} 
          id={id} 
          type={type ? type : "text"} 
          placeholder={placeholder} 
          onChange={onChange}
          ref={reference}
          autoComplete={autoComplete} 
          />
        <p className='pl-8 w-fit text-xs text-neutral-500 dark:text-neutral-400'>{advice}</p>
    </div>
  )
}
