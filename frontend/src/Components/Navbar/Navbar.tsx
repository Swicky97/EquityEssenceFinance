import React, { useState } from "react";
import logo from "./logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

interface Props {}

const Navbar = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <nav className="relative mx-auto px-8 py-4 bg-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-64 mt-[-16px]"/>
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
        </div>
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

        </div>

        {isLoggedIn() ? (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div className="hover:text-darkBlue">Welcome, {user?.userName}</div>
            <a
              onClick={logout}
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              Logout
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <Link to="/login" className="hover:text-darkBlue">Login</Link>
            <Link
              to="/register"
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
      {isMenuOpen && (
        <div className="lg:hidden mt-4 space-y-2">
          {isLoggedIn() ? (
            <>
              <Link to="/search" className="block px-4 py-2 font-bold rounded hover:opacity-70 cursor-pointer">
                Search
              </Link>
              <a
                onClick={logout}
                className="block px-4 py-2 font-bold rounded hover:opacity-70 cursor-pointer"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 font-bold rounded hover:opacity-70 cursor-pointer">
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 font-bold rounded hover:opacity-70 cursor-pointer"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
    
  );
};

export default Navbar;
