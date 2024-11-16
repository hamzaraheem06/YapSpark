import React from "react";
import { Signup } from "../components/Index";

function SignUpPage() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex items-center justify-center lg:text-left">
          <img src="src\assets\logo.svg" alt="logo" />
        </div>
        <Signup />
      </div>
    </div>
  );
}

export default SignUpPage;
