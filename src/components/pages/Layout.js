import { CssBaseline } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Contact from "./Contact";
import Home from "./Home";
import Navbar from "../Navbar";
const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
