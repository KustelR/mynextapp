import React, {useState} from 'react'

import classNames from 'classnames';
import styles from '../../styles/CustomInput.module.css';


export default function CustomTextArea({id, placeholder, className}) {

    const [isFocused, setIsFocused] = useState(false);

    function toggleFocus() {
    setIsFocused(!isFocused);
    }

    const underDiv = classNames(
        'mt-0',
        'h-0.5',
        'transition-all',
        'transition-1000',
        'ease-out',
        styles.animated,
        {
          [styles.animatedActive]: isFocused
        }
      )

    function resizeTextArea(e) {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + "px";
    }

  return (
    <div className={'mb-4 h-fit ' + className}>
        <textarea
            onChange={resizeTextArea}
            onFocus={toggleFocus}
            onBlur={toggleFocus} 
            id={id}
            placeholder={placeholder}
            cols="30" 
            rows="10"
            className='w-full outline-0 p-1 bg-neutral-100 dark:bg-neutral-700 align-top'>
        </textarea>
        <div className={underDiv}></div>
    </div>
  )
}