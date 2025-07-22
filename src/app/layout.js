"use client"
import { Geist, Geist_Mono } from "next/font/google";
import { store } from "@/redux/stor";
import { Provider } from 'react-redux'
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Navbar from "@/app/navbar/page";
import '@fortawesome/fontawesome-free/css/all.min.css'
import UserContextProvider from "@/context/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
           <UserContextProvider>

        <Navbar></Navbar>
        <>
  <Toaster position="top-center" reverseOrder={false} />
  {/* باقي الكود */}
</>
        {children}
          </UserContextProvider>
          </Provider>  
      </body>
    </html>
  );
}
