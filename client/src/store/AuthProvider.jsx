import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const AuthContext = createContext({ isAuthorized: false });

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState();

  //get user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:8800/api/getuser", {
        withCredentials: true,
      });
      setUser(data.user);
      setIsAuthorized(true);
    } catch (error) {
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // logout functionality
  const LogoutUser = async () => {
    try {
      await axios.get("http://localhost:8800/api/logout", {
        withCredentials: true,
      });
      setUser();
      setIsAuthorized(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setIsAuthorized(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthorized, setIsAuthorized, user, setUser, LogoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
