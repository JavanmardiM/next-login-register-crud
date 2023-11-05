import React from "react";
import Header from "@/components/layout/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="bg-white max-w-6xl mx-auto container">{children}</div>
      <ToastContainer />
    </>
  );
}

export default UserLayout;
