import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import {
  Header,
  Footer,
  Container,
  Loading,
  PostCard,
  Login,
  Signup,
} from "./components/Index";

function App() {
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          // dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-wrap justify-center items-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <Signup />
      </div>
    );
  }
}

export default App;
