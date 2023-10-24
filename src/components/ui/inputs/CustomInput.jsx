'use client'


import React, {useState} from 'react'
import classNames from 'classnames'
import styles from '@/styles/CustomInput.module.css';
import ShowIf from '@/components/ui/ShowIf';


/**
 * Customizable input
 * @param {object} param0 react component props
 * @param {string} id HTML id
 * @param {string} label Label for the input
 * @param {string} type HTML input type
 * @param {string} placeholder HTML input placeholder
 * @param {function} validation Function that validates the input
 * @param {string} validationMessage Message to display when input is invalid
 * @param {function} onChange Function to be called on input change
 * @param {*} reference Refs to be set on input element
 * @param {string} className Classes (will be applied to root div of the component)
 * @param {string} autoComplete Autocomplete property
 * @returns 
 */
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
    'dark:bg-neutral-800',
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
