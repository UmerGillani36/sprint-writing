import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Label,
  Drawer,
  Box,
  createStyles,
} from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { Tab, Tabs, withStyles } from "@mui/material";
import { useNavigate, NavLink, Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import "./Style.css";
import CreateNovel from "./CreateNovel";
import ViewNovel from "./ViewNovel";
import { AuthContext } from "./auth";
// import ProgressBar from 'react-bootstrap/ProgressBar';
const styles = (theme) =>
  createStyles({
    root: {
      fontWeight: "bold",
    },
    selected: {
      color: "#ffc107",
    },
    indicator: {
      backgroundColor: "#ffc107",
    },
    wrapper: {
      margin: theme.spacing(1),
    },
  });

const Novel = (props) => {
  // Use the useState hook to create state for the active page
  const [activePage, setActivePage] = useState("page1");

  // Define a function for switching between pages
  const handlePageSwitch = (page) => {
    setActivePage(page);
  };
  const [activeTab, setActiveTab] = useState("tab1");
  const {user} = useContext(AuthContext);
  return (
    <>
    {user ? 
      <div className="page">
        <Navbar />
        <div className="container-fluid nav_bg">
          <div className="row">
            <div className="col-10 mx-auto">
              <h5>
                On this page users can choose between viewing their already
                created novels or Create a new novel.
              </h5>
              <div id="tabs">
                {/* Render the tabs */}
                <div
                  id="tab-1"
                  className={`tab ${activeTab === "tab1" ? "active" : ""}`}
                  onClick={() => setActiveTab("tab1")}
                >
                  Create Novel
                </div>
                <div
                  id="tab-2"
                  className={`tab ${activeTab === "tab2" ? "active" : ""}`}
                  onClick={() => setActiveTab("tab2")}
                >
                  View Novel
                </div>

                {/* Render the active tab content */}
                {activeTab === "tab1" && (
                  <div id="tab-content-1" className="tab-content">
                    {/* Tab 1 content goes here */}
                    <CreateNovel />
                  </div>
                )}
                {activeTab === "tab2" && (
                  <div id="tab-content-2" className="tab-content">
                    {/* Tab 2 content goes here */}
                    <ViewNovel />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      <Navigate to="/"/>
    }
    </>
  );
};

export default Novel;
