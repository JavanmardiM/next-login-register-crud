import React from "react";
import Header from "@/components/layout/Header";

function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="bg-white max-w-6xl mx-auto container">{children}</div>
    </>
  );
}

export default UserLayout;
