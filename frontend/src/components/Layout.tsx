import React from "react";
import Navbar from "./Navbar";
import DayTime from "./DayTime";
import Search from "./Search";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <DayTime />
      <Search />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
