import React from "react";
import classNames from "classnames";

const buttonClasses = classNames(
  "p-2",
  "bg-black",
  "text-white",
  "hover:bg-neutral-700",
  "dark:bg-white",
  "dark:text-black",
  "dark:hover:bg-neutral-300",
  "drop-shadow-lg",
  "dark-shadow-inner",
  "active:drop-shadow-sm",
  "disabled:opacity-70",
  "disabled:hover:bg-black",
  "disabled:drop-shadow-none",
  "dark:disabled:hover:bg-white",
  "transition-colors",
  "transition-100",
);

/**
 * Parses string classes to array of class names
 * @param {string} classes
 * @returns {array<string>} array of class strings
 */
function parseClasses(classes) {
  if (!classes) {
    return "";
  }
  return classes.split(" ");
}

/**
 * Meges together two class strings replacing overlapping ones with ones from the second
 * @param {string} classes1 old className string
 * @param {string} classes2 new className string to be applied over
 * @returns {string} new className string
 */
function replaceClasses(classes1, classes2) {
  const internalClasses = parseClasses(classes1);
  const newClasses = parseClasses(classes2);

  for (let i = 0; i < newClasses.length; i++) {
    if (newClasses[i].startsWith("p-")) {
      const target = internalClasses.findIndex((element) =>
        element.startsWith("p-"),
      );
      internalClasses.splice(target, 1);
    }
  }
  return internalClasses.concat(newClasses).join(" ");
}

/**
 * Customizable text button component
 * @param {object} props Component props
 * @param {*} props.children
 * @param {function} props.onClick
 * @param {boolean} props.disabled
 * @param {string} props.type
 * @param {string} props.className
 * @returns React.JSX.Element
 */
export default function CustomButton(props) {
  const { children, onClick, disabled, type, className, ariaLabel } = props;
  return (
    <button
      className={replaceClasses(buttonClasses, className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
