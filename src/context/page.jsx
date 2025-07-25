"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userProfile, setUserProfile] = useState('');
  const [load, setLoad] = useState(false);
  const [token, setToken] = useState(null);
 
useEffect(() => {
  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }
}, [token]);

useEffect(() => {
  if (token) {
    refreshUserProfile(token);
  }
}, [token]);


   const refreshUserProfile = async (tok) => {
    const userToken = tok || token;
    if (!userToken) return;

    setLoad(true);
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/users/profile-data",
        {
          headers: { token: userToken },
        }
      );
      setUserProfile(data.user);
    } catch (err) {
      toast.error("Failed to refresh profile");
    } finally {
      setLoad(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        load,
        setLoad,
        refreshUserProfile,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}