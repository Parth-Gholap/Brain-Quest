import React from "react";

export function Button({ children, className, ...props }) {
  return (
    <button className={`custom-button ${className}`} {...props}>
      {children}
    </button>
  );
}
