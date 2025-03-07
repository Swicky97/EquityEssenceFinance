import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";
import { motion } from "framer-motion";

interface Props {}

const Navbar = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isLoggedIn();
      setIsAuthenticated(authStatus);
    };

    checkAuth();
  }, [isLoggedIn, user]);

  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  return (
    <nav className="relative mx-auto px-8 py-4 bg-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-64 mt-[-16px]" />
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

        {isAuthenticated ? (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div>Welcome, {user?.userName}</div>
            <a
              onClick={async () => {
                await logout();
                setIsAuthenticated(false);
              }}
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen cursor-pointer hover:opacity-70"
            >
              Logout
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <Link to="/login" className="hover:text-darkBlue">
              Login
            </Link>
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
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="fixed top-0 right-0 h-full w-2/5 bg-gray-200 text-black shadow-lg z-50 flex flex-col space-y-4 p-6"
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end text-gray-400 hover:text-black"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {isAuthenticated ? (
            <>
              <Link
                to="/search"
                className="block px-4 py-2 font-bold rounded hover:bg-lightGreen"
                onClick={() => setIsMenuOpen(false)}
              >
                Search
              </Link>
              <a
                onClick={async () => {
                  await logout();
                  setIsAuthenticated(false);
                  setIsMenuOpen(false);
                }}
                className="block px-4 py-2 font-bold rounded cursor-pointer hover:bg-lightGreen"
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 font-bold rounded hover:bg-lightGreen"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 font-bold rounded hover:bg-lightGreen"
                onClick={() => setIsMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
