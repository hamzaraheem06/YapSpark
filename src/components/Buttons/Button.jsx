import React from "react";

function Button({ children, onclick, buttonType, ...props }) {
  return (
    <button className={`btn ${buttonType}`} {...props} onClick={onclick}>
      {children}
    </button>
  );
}

export default Button;
