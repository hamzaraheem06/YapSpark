import React from "react";
import Button from "../Buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function Header() {
  const userStatus = useSelector((state) => state.auth.status); // state.nameofslice.status

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logOut()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log("Appwrite Service:: error :: logOut :: ", error);
      });
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !userStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !userStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: userStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: userStatus,
    },
  ];

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button onClick={navigate(item.slug)}>{item.name}</button>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link
          onClick={navigate(navItems[0].slug)}
          className="btn btn-ghost text-xl"
        >
          YapSpark
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        {userStatus && (
          <Button
            children="Logout"
            onclick={logoutHandler}
            buttonType="btn-neutral"
          />
        )}
      </div>
    </div>
  );
}

export default Header;
