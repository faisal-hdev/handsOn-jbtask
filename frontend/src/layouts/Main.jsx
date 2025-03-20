import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/footer";

import { NavbarSimple } from "../components/Navbar";

const Main = () => {
  return (
    <div className="overflow-hidden scroll-smooth">
      {/* Navbar */}
      <NavbarSimple />
      {/* Outlet */}
      <div className="px-5 lg:px-0 w-full lg:max-w-7xl mx-auto">
        <Outlet />
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Main;
