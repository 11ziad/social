"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { store } from "@/redux/stor";
import { Provider, useDispatch } from "react-redux";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/app/navbar/page";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserContextProvider, { UserContext } from "@/context/page";
import { useContext, useEffect } from "react";
import { userPosts } from "@/redux/Posts";
import { jwtDecode } from "jwt-decode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ مكون داخلي لتحديث بيانات المستخدم بمجرد دخول التوكن
function InitUserData() {
  const { refreshUserProfile } = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      refreshUserProfile(token); // تحديث بيانات البروفايل
      dispatch(userPosts(decoded.user)); // تحديث بوستات المستخدم
    }
  }, []);

  return null; // مش بيعرض أي حاجة، بس وظيفته تشغيل التحديثات دي
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <UserContextProvider>
            <Navbar />
            <InitUserData /> {/* ✅ تشغيل التحديث التلقائي */}
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </UserContextProvider>
        </Provider>
      </body>
    </html>
  );
}