'use client'

import classNames from 'classnames';
import React from 'react'
import styles from '../../styles/CustomInput.module.css';

export default function AnimatedUnderline({isActive}) {

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
          [styles.animatedActive]: isActive
        }
      )

  return (
    <div className={underDiv}></div>
  )
}
