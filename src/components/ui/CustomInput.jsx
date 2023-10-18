'use client'


import React, {useState} from 'react'
import classNames from 'classnames'
import styles from '../../styles/CustomInput.module.css';
import ShowIf from './ShowIf';

export default function CustomInput({id, label, type, advice, placeholder, validation, validationMessage, 
                                     onChange, reference, className, autoComplete}) {
  if (validation === undefined) {
    validation = true;
  }

  const [isFocused, setIsFocused] = useState(false);

  function toggleFocus() {
    setIsFocused(!isFocused);
  }

  const inputClasses = classNames(
    'block',
    'w-full',
    'p-1',
    'pb-0',
    'bg-gray-100',
    'dark:bg-neutral-700',
    'outline-0',
    {
      'outline-1': !validation,
      'outline-red-500': !validation,
    },
  )

  const underDiv = classNames(
    'h-0.5',
    'transition-all',
    'transition-1000',
    'ease-out',
    styles.animated,
    {
      [styles.animatedActive]: isFocused
    }
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
          onFocus={toggleFocus}
          onBlur={toggleFocus}
          />
          <div className={underDiv}></div>
        <p className='pl-8 w-fit text-xs text-neutral-500 dark:text-neutral-400'>{advice}</p>
    </div>
  )
}
