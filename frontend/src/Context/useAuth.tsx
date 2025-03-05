import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, logoutAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (email: string, username: string, password: string) => {
    try {
      const res = await registerAPI(email, username, password);
      if (res!.data) {
        setUser(res!.data);
        toast.success("Registration & Login Successful!");
        navigate("/search");
      }
    } catch (error) {
      toast.warning("Server error occurred");
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const res = await loginAPI(username, password);
      if (res!.data) {
        setUser(res!.data);
        toast.success("Login Successful!");
        navigate("/search");
      }
    } catch (error) {
      toast.warning("Invalid credentials");
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = async () => {
    try {
      await logoutAPI();
      setUser(null);
      navigate("/");
    } catch (error) {
      toast.warning("Server error occurred");
    }
  };

  return (
    <UserContext.Provider
      value={{ registerUser, loginUser, user, logout, isLoggedIn }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
