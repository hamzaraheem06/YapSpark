import React from "react";

function Button({ children, onclick = undefined, buttonType, type, ...props }) {
  return (
    <button
      className={`btn ${buttonType} text-base font-semibold `}
      {...props}
      onClick={onclick}
      type={type ? type : null}
    >
      {children}
    </button>
  );
}

export default Button;
