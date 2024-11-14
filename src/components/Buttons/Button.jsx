import React from "react";

function Button({ children, onclick, buttonType, type, ...props }) {
  return (
    <button
      className={`btn ${buttonType} text-base font-semibold `}
      {...props}
      onClick={onclick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
