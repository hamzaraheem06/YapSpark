import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { Input, Button, AlertError } from "../Index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.logIn(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full flex max-w-80 flex-col gap-5 justify-between p-2">
      {error && <AlertError error={error} />}

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-neutral ">
          Log in to{" "}
          <span className="text-4xl text-primary underlineEffect">
            YapSpark
          </span>
          !
        </h1>
        <p className="text-sm opacity-65">Enter your details below</p>
      </div>
      <form onSubmit={handleSubmit(login)} className="flex flex-col gap-3">
        <Input
          label="Email: "
          placeHolder="Email Address"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        <Input
          label="Password: "
          placeHolder="Enter your password"
          type="password"
          {...register("password", {
            required: true,
          })}
        />
        <p className="text-sm opacity-65">
          Don't have an account?{" "}
          <Link
            className="transition-all hover:text-primary font-semibold"
            to="/signup"
          >
            Sign Up
          </Link>
        </p>
        <div className="py-1">
          <Button children="Login" buttonType="btn-primary" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Login;
