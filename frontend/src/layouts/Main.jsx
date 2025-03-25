import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import { NavbarSimple } from "../components/Navbar";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <NavbarSimple />

      {/* Main content (Outlet) */}
      <main className="flex-grow px-5 lg:px-0 w-full lg:max-w-7xl mx-auto">
        <Outlet />
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Main;
