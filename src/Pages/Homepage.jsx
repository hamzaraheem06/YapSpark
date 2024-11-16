import React, { useEffect, useState } from "react";
import authSlice from "../store/authSlice";
import AllPosts from "./AllPosts";
import { useSelector } from "react-redux";
import { Loading, Button } from "../components/Index";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [loading, setLoading] = useState(true);

  const authStatus = useSelector((state) => {
    setLoading(false);
    return state.auth.status;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-wrap justify-center items-center">
        <Loading />
      </div>
    );
  } else {
    if (authStatus) {
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Yap Spark</h1>
            <p className="py-6">
              Unleash your voice on YapSpark, where ideas ignite and stories
              come to life. Dive into a world of untold passions and bold
              expressions, connecting with curious minds eager to discover new
              perspectives.
            </p>
            <Button
              buttonType="btn-primary"
              children="Get Started"
              onclick={() => {
                useNavigate("/signup");
              }}
            />
          </div>
        </div>
      </div>;
    } else {
      <AllPosts />;
    }
  }
}

export default Homepage;
