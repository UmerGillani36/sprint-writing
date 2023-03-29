import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Label,
  Drawer,
} from "@mui/material";
import React from "react";
import { Row } from "react-grid-system";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext } from "react";
import { AuthContext } from "./auth";
// import ProgressBar from 'react-bootstrap/ProgressBar';

const Progress = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  const {user} = useContext(AuthContext);
  return (
    <>
    {user ?
      <div className="page">
        <Navbar />
        <div className="container-fluid nav_bg">
          <div className="row">
            <div className="col-10 mx-auto">
              <Grid>
                <div id="progress-bars">
                  <h6>
                    On this page user can monitor their daily WPM or weekly WPM
                    and as well as additional tasks if added any.
                  </h6>
                  <Row>
                    {/* First row, first column */}
                    <div className="prog">
                      <CircularProgressbar
                        value={75}
                        text="Task 1"
                        stroke="#FF6347"
                      />
                    </div>
                    {/* First row, second column */}
                    <div className="prog">
                      <CircularProgressbar value={50} text="Task 2" />
                    </div>
                  </Row>
                  <Row>
                    {/* Second row, first column */}
                    <div className="prog">
                      <CircularProgressbar value={25} text="Task 3" />
                    </div>
                    {/* Second row, second column */}
                    <div className="prog">
                      <CircularProgressbar value={100} text="Task 4" />
                    </div>
                  </Row>
                </div>
              </Grid>
              <Outlet />
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

export default Progress;
