"use client";

import React, { useState } from "react";
import classNames from "classnames";
import styles from "@/styles/CustomInput.module.css";
import ShowIf from "@/components/ui/ShowIf";

/**
 * Customizable input element
 * @param {object} props react component props
 * @param {string} props.id HTML id
 * @param {string} props.label Label for the input
 * @param {string} props.type HTML input type
 * @param {string} props.placeholder HTML input placeholder
 * @param {function} props.validation Function that validates the input
 * @param {string} props.validationMessage Message to display when input is invalid
 * @param {function} props.onChange Function to be called on input change
 * @param {*} props.reference Refs to be set on input element
 * @param {string} props.className Classes (will be applied to root div of the component)
 * @param {string} props.inputClassName Classes (will be applied to input component)
 * @param {string} props.autoComplete Autocomplete property
 * @returns ```React.JSX.Element```
 */
export default function CustomInput(props) {
  const {
    id,
    label,
    type,
    advice,
    placeholder,
    validation,
    validationMessage,
    onChange,
    reference,
    className,
    inputClassName,
    autoComplete,
    onInput,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  function toggleFocus() {
    setIsFocused(!isFocused);
  }

  const inputClasses = classNames(
    "block",
    "w-full",
    "p-1",
    "pb-0",
    "bg-gray-100",
    "dark:bg-neutral-700",
    "outline-0",
    {
      "outline-1": validation === false,
      "outline-red-500": validation === false,
    }
  );

  const underDiv = classNames(
    "h-0.5",
    "transition-all",
    "transition-1000",
    "ease-out",
    styles.animated,
    {
      [styles.animatedActive]: isFocused,
    }
  );

  return (
    <div className={className}>
      <div className="flex items-end">
        <label className="block mr-2" htmlFor={id}>
          {label}
        </label>
        <ShowIf
          className="text-xs font-bold text-red-600 h-fit p-0.5"
          isVisible={validation === false}
        >
          {validationMessage}
        </ShowIf>
      </div>
      <input
        className={inputClasses + " " + inputClassName}
        onInput={onInput}
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
      <p className="pl-8 w-fit text-xs text-neutral-500 dark:text-neutral-400">
        {advice}
      </p>
    </div>
  );
}
