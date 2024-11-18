import React from "react";
import { Login } from "../components/Index";

function LogInPage() {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex items-center justify-center lg:text-left">
          <img src="src\assets\logo.svg" alt="logo" />
        </div>
        <Login />
      </div>
    </div>
  );
}

export default LogInPage;
