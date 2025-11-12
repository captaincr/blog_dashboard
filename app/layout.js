"use client"

import { AuthProvider } from "@/context/AuthContext";
import "./globals.css"
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/ui/Navbar";


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
