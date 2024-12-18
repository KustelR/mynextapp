import React from "react";

export default function ShowIF({ children, isVisible, className }) {
  if (isVisible) return <div className={className}>{children}</div>;
  else return null;
}
